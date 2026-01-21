"use client";

import { useState, useEffect } from "react";
import { X, Check, Copy, Loader2, Lock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PaymentModal({ isOpen, onClose, plan }) {
  const [step, setStep] = useState(1); // 1: Cadastro, 2: Pagamento, 3: Sucesso
  const [loading, setLoading] = useState(false);
  const [pixCode, setPixCode] = useState(""); 
  const [qrCodeImage, setQrCodeImage] = useState(""); 
  const [transactionId, setTransactionId] = useState(null);

  const activePlan = plan || { name: "Premium", price: "R$ 30,00" };


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpf: "" // CPF de volta!
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setLoading(false);
      setPixCode("");
      setQrCodeImage("");
      setTransactionId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (step === 2 && transactionId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/check-payment.php?id=${transactionId}`);
          if (res.ok) {
            const data = await res.json();
            // Adapte 'PAID' para o status real que a API retorna (ex: 'paid', 'confirmed', 'succeeded')
            // Gestão Pay geralmente retorna 'paid' ou 'approved'
            if (data.status === 'paid' || data.status === 'approved' || data.status === 'confirmed') {
              setStep(3);
              clearInterval(interval);
            }
          }
        } catch (error) {
          console.error("Erro ao verificar status:", error);
        }
      }, 5000); // Checa a cada 5 segundos
    }
    return () => clearInterval(interval);
  }, [step, transactionId]);

  const checkPaymentManual = async () => {
      setLoading(true);
      try {
          const res = await fetch(`/api/check-payment.php?id=${transactionId}`);
          const data = await res.json();
          if (res.ok && (data.status === 'paid' || data.status === 'approved' || data.status === 'confirmed')) {
             setStep(3);
          } else {
             alert("Pagamento ainda não confirmado. Aguarde alguns instantes.");
          }
      } catch (error) {
          alert("Erro ao verificar. Tente novamente.");
      } finally {
          setLoading(false);
      }
  };


  if (!isOpen) return null;

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        if (value.length > 15) value = value.substring(0, 15);
    } 
    else if (name === "cpf") {
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        if (value.length > 14) value = value.substring(0, 14);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => { 
    e.preventDefault();
    setLoading(true);

    try {
      // Remove pontuação do CPF e Telefone antes de enviar
      const cleanData = {
          ...formData,
          phone: formData.phone.replace(/\D/g, ""),
          cpf: formData.cpf.replace(/\D/g, "")
      };

      const amountValue = parseFloat(activePlan.price.replace("R$", "").replace(",", ".").trim());

      const paymentData = {
        amount: amountValue, 
        description: `Assinatura Moby Spy - Plano ${activePlan.name}`,
        payer: cleanData,
      };

      const response = await fetch('/api/create-payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao iniciar pagamento.');
      }

      if (data.pixCode && data.qrCodeImage) {
        setPixCode(data.pixCode);
        setQrCodeImage(data.qrCodeImage);
        setTransactionId(data.transactionId);
        setStep(2); 
      } else {
        throw new Error('Dados PIX incompletos da API.');
      }

    } catch (error) {
      console.error("Erro no pagamento:", error);
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode);
      alert("Código PIX copiado!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 pb-0 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === 1 && "Criar Conta"}
            {step === 2 && "Pagamento via PIX"}
            {step === 3 && "Pagamento Confirmado!"}
          </h2>
          <p className="text-slate-400 text-sm">
            {step === 1 && "Preencha seus dados para começar o monitoramento"}
            {step === 2 && "Escaneie o QR Code ou copie o código abaixo"}
            {step === 3 && "Sua conta foi ativada com sucesso"}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-6 mb-2">
          <div className={`h-1 rounded-full transition-all duration-300 ${step >= 1 ? "w-8 bg-blue-500" : "w-2 bg-slate-800"}`} />
          <div className={`h-1 rounded-full transition-all duration-300 ${step >= 2 ? "w-8 bg-blue-500" : "w-2 bg-slate-800"}`} />
          <div className={`h-1 rounded-full transition-all duration-300 ${step >= 3 ? "w-8 bg-blue-500" : "w-2 bg-slate-800"}`} />
        </div>

        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nome Completo</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Senha</label>
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Telefone</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CPF</label>
                <input
                  required
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  maxLength="14"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  value={formData.cpf}
                  onChange={handleInputChange}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 shadow-lg shadow-blue-500/25 mt-4"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Continuar para Pagamento <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white p-4 rounded-xl shadow-inner">
                <img 
                  src={qrCodeImage || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} 
                  alt="QR Code PIX" 
                  className="w-48 h-48 mix-blend-multiply"
                />
              </div>

              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-slate-400 text-center block">Ou copie o código PIX</label>
                <div className="flex gap-2">
                  <input 
                    readOnly
                    value={pixCode}
                    className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 text-sm font-mono outline-none"
                  />
                  <Button 
                    onClick={copyPixCode}
                    className="bg-slate-800 hover:bg-slate-700 text-white shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 w-full flex items-start gap-3">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-300 font-medium">Aguardando pagamento...</p>
                  <p className="text-blue-400/70">A liberação ocorrerá automaticamente após a confirmação.</p>
                </div>
              </div>

              <Button 
                onClick={checkPaymentManual}
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                Já realizei o pagamento
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tudo Pronto!</h3>
              <p className="text-slate-400 mb-8">
                Sua conta foi criada e o pagamento confirmado. Você já pode acessar o painel de monitoramento.
              </p>
              <Button 
                onClick={onClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6"
              >
                Acessar Painel
              </Button>
            </div>
          )}
        </div>

        <div className="bg-slate-950/50 p-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lock className="w-3 h-3" />
          <span>Seus dados estão protegidos com criptografia de ponta a ponta</span>
        </div>
      </Card>
    </div>
  );
}