"use client";

import { Shield, Eye, Lock, Smartphone, CheckCircle, AlertTriangle, Clock, Users, Zap, TrendingUp, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { PaymentModal } from "@/components/PaymentModal";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Eye,
      title: "Monitoramento Discreto",
      description: "Acompanhe atividades sem ser detectado",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "100% Seguro",
      description: "Dados criptografados de ponta a ponta",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Acesso Remoto",
      description: "Monitore de qualquer lugar, a qualquer hora",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "Tempo Real",
      description: "Informações atualizadas instantaneamente",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const benefits = [
    "Compatível com Android e iOS",
    "Suporte técnico 24/7 em português",
    "Garantia de 30 dias ou seu dinheiro de volta",
    "Mais de 50.000 usuários satisfeitos",
    "Atualizações automáticas e gratuitas",
    "Interface intuitiva e fácil de usar"
  ];

  const stats = [
    { value: "50K+", label: "Usuários Ativos" },
    { value: "99.9%", label: "Confiabilidade" },
    { value: "24/7", label: "Suporte" },
    { value: "4.8★", label: "Avaliação" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/20 relative overflow-hidden font-sans text-slate-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
      
      {/* Floating Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Moby Spy</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
              Recursos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#whatsapp" className="text-sm font-medium text-slate-300 hover:text-green-400 transition-colors flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="#precos" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
              Preços
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 rounded-full px-6"
            >
              Começar Agora
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-visible">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-scale">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium tracking-wide">Tecnologia de Monitoramento #1</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
              Descubra a <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-600 bg-clip-text text-transparent animate-pulse">Verdade</span>
              <br />Proteja Seu Relacionamento
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
              Monitoramento profissional e discreto para quem busca transparência. 
              Tecnologia de ponta com total segurança e privacidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 rounded-full"
              >
                <Zap className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 rounded-full transition-all duration-300"
              >
                Ver Demonstração
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span>100% Sigiloso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span>+50.000 Instalações</span>
              </div>
            </div>
          </div>

          {/* Stats Cards with Hover Effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative bg-slate-900/40 border border-slate-800/50 backdrop-blur-md p-6 text-center rounded-2xl hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${800 + (index * 100)}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-slate-500 group-hover:text-blue-400 transition-colors text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Tracking Section (NEW) */}
      <section id="whatsapp" className="py-24 px-4 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="lg:w-1/2 z-10">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-bold uppercase tracking-wider">Recurso Exclusivo</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Espione o <span className="text-green-500">WhatsApp</span> <br/>
                Em Tempo Real
              </h2>
              
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Tenha acesso total às conversas, áudios, fotos e vídeos compartilhados. 
                Veja mensagens apagadas e saiba com quem a pessoa está conversando agora mesmo.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Leitura de mensagens enviadas e recebidas",
                  "Acesso a fotos e vídeos da galeria",
                  "Escuta de áudios e notas de voz",
                  "Visualização de mensagens apagadas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 group">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 group-hover:text-white transition-colors" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 px-8 py-6 rounded-full text-lg w-full sm:w-auto"
              >
                Monitorar WhatsApp Agora
              </Button>
            </div>

            {/* Visual/Phone Mockup */}
            <div className="lg:w-1/2 relative">
              <div className="relative mx-auto w-[280px] md:w-[320px] h-[580px] bg-slate-900 border-8 border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden animate-float">
                {/* Screen Content */}
                <div className="w-full h-full bg-[#0b141a] flex flex-col">
                  {/* Whatsapp Header */}
                  <div className="bg-[#202c33] p-4 flex items-center gap-3 border-b border-slate-700/50">
                    <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                    <div className="flex-1">
                      <div className="h-2.5 w-20 bg-slate-600 rounded mb-1"></div>
                      <div className="h-2 w-12 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-hidden">
                     {/* Msg 1 */}
                     <div className="flex justify-start animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[80%]">
                          <div className="h-2 w-32 bg-slate-600 rounded mb-2"></div>
                          <div className="h-2 w-24 bg-slate-600 rounded"></div>
                        </div>
                     </div>
                     {/* Msg 2 */}
                     <div className="flex justify-end animate-slide-up" style={{ animationDelay: '1000ms' }}>
                        <div className="bg-[#005c4b] p-3 rounded-lg rounded-tr-none max-w-[80%]">
                          <div className="h-2 w-40 bg-green-800/50 rounded mb-2"></div>
                          <div className="h-2 w-16 bg-green-800/50 rounded"></div>
                        </div>
                     </div>
                     {/* Msg 3 (Audio) */}
                     <div className="flex justify-start animate-slide-up" style={{ animationDelay: '1800ms' }}>
                        <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none flex items-center gap-3 w-[70%]">
                          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                             <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-slate-400 border-b-4 border-b-transparent ml-0.5"></div>
                          </div>
                          <div className="flex-1 h-1 bg-slate-600 rounded"></div>
                        </div>
                     </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-3 bg-[#202c33] flex gap-2">
                    <div className="flex-1 h-10 bg-[#2a3942] rounded-full"></div>
                    <div className="w-10 h-10 bg-[#005c4b] rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/50 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements around phone */}
              <div className="absolute -right-8 top-20 bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl animate-fade-in-scale" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                   </div>
                   <div>
                      <p className="text-white font-bold text-sm">Nova Mensagem</p>
                      <p className="text-xs text-slate-400">Há 2 minutos</p>
                   </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-32 bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl animate-fade-in-scale" style={{ animationDelay: '2.2s' }}>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                   </div>
                   <div>
                      <p className="text-white font-bold text-sm">Monitoramento Ativo</p>
                      <p className="text-xs text-slate-400">Invisível</p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-24 px-4 bg-slate-900/40 backdrop-blur-sm relative border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tudo o que você precisa para ter controle total, em uma interface simples e intuitiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className={`group bg-slate-900/60 border-slate-700/50 backdrop-blur-md p-8 hover:bg-slate-800 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:border-blue-500/30 ${
                    activeFeature === index ? 'ring-1 ring-blue-500/50 shadow-blue-500/20 scale-[1.02]' : ''
                  }`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section with Steps */}
      <section id="como-funciona" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Como Funciona
            </h2>
            <p className="text-xl text-slate-400">
              Comece a monitorar em menos de 5 minutos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                step: "01",
                title: "Crie Sua Conta",
                description: "Cadastro rápido e seguro. Escolha o plano ideal para você.",
                icon: Users
              },
              {
                step: "02",
                title: "Instale o App",
                description: "Siga o guia simples para instalar no dispositivo alvo.",
                icon: Smartphone
              },
              {
                step: "03",
                title: "Veja Tudo",
                description: "Acesse o painel e comece a monitorar instantaneamente.",
                icon: TrendingUp
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative group">
                   {/* Connector Line (Desktop) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-800 z-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-full transition-all duration-1000"></div>
                    </div>
                  )}
                  
                  <div className="relative z-10 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-slate-800">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                      <span className="text-xl font-bold text-slate-400 group-hover:text-white">{item.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-24 px-4 relative bg-slate-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Planos Flexíveis
            </h2>
            <p className="text-xl text-slate-400">
              Investimento pequeno para sua paz de espírito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {[
              {
                name: "Básico",
                price: "R$ 15,80",
                period: "/mês",
                features: ["1 Dispositivo", "WhatsApp (Texto)", "Histórico de Chamadas", "Localização GPS"],
                popular: false,
                color: "slate"
              },
              {
                name: "Premium",
                price: "R$ 30,00",
                period: "/mês",
                features: ["3 Dispositivos", "WhatsApp Completo (Áudio/Foto)", "Facebook & Instagram", "Gravação de Chamadas", "Keylogger", "Suporte Prioritário"],
                popular: true,
                color: "blue"
              },
              {
                name: "Família",
                price: "R$ 45,00",
                period: "/mês",
                features: ["5 Dispositivos", "Todos recursos Premium", "Painel Administrativo", "Relatórios em PDF", "Suporte VIP 24h"],
                popular: false,
                color: "purple"
              }
            ].map((plan, index) => (
              <Card 
                key={index}
                className={`relative bg-slate-900/80 border-slate-700/50 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/20 scale-105 z-10' 
                    : 'hover:shadow-xl hover:bg-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    Mais Escolhido
                  </div>
                )}
                <h3 className={`text-2xl font-bold text-white mb-2 ${plan.popular ? 'text-blue-400' : ''}`}>{plan.name}</h3>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-blue-400' : 'text-slate-400'}`} />
                      </div>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsModalOpen(true);
                  }}
                  className={`w-full py-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  Selecionar Plano
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNiA2Ii8+PC9zdmc+')] opacity-30"></div>
            
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 animate-pulse">
              <Lock className="w-12 h-12 text-white" />
            </div>
            
            <div className="text-center md:text-left z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Segurança de Nível Bancário
              </h3>
              <p className="text-slate-400 mb-6">
                Seus dados são protegidos com criptografia AES-256 bits. 
                Garantimos total anonimato: o monitorado nunca saberá que o software está instalado.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                 <div className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <Shield className="w-4 h-4" /> 100% Seguro
                 </div>
                 <div className="flex items-center gap-2 text-sm text-blue-400 font-medium bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <CheckCircle className="w-4 h-4" /> Verificado
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Moby Spy</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                A solução mais confiável do mercado para monitoramento parental e segurança familiar.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Plataforma</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#recursos" className="hover:text-blue-400 transition-colors">Recursos</a></li>
                <li><a href="#whatsapp" className="hover:text-blue-400 transition-colors">WhatsApp Spy</a></li>
                <li><a href="#precos" className="hover:text-blue-400 transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Compatibilidade</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Suporte</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Instalação</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Política de Reembolso</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 text-center">
            <p className="text-slate-600 text-sm">© 2024 Moby Spy Inc. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        plan={selectedPlan}
      />
    </div>
  );
}