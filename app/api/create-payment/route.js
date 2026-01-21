import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("--- API: PROCESSAMENTO DE PAGAMENTO (MAPEAMENTO JSON) ---");
  
  const PRIVATE_KEY = process.env.GESTAO_PAY_PRIVATE_KEY;
  const GESTAO_PAY_ENDPOINT = "https://api.gestaopay.com.br/v1/transactions"; 

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ message: "Corpo inválido." }, { status: 400 });
  }

  const { payer, amount, description } = body;
  const amountInCents = Math.round(amount * 100);

  if (!payer.cpf || payer.cpf.length !== 11) {
      console.error("CPF inválido ou não fornecido:", payer.cpf);
      return NextResponse.json({ message: "CPF inválido. Digite apenas números." }, { status: 400 });
  }

  const payload = {
    amount: amountInCents, 
    paymentMethod: "pix",
    customer: {
      name: payer.name,
      email: payer.email,
      phone: payer.phone,
      document: { number: payer.cpf, type: "cpf" }
    },
    items: [{ 
        title: description, 
        quantity: 1, 
        unitPrice: amountInCents, 
        tangible: false 
    }]
  };

  try {
    const basicAuth = Buffer.from(`${PRIVATE_KEY}:`).toString('base64');
    
    const response = await fetch(GESTAO_PAY_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
        },
        body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("Status HTTP:", response.status);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Resposta não é JSON:", responseText);
      throw new Error(`Erro API (não JSON). Status: ${response.status}`);
    }

    if (!response.ok) {
      console.error("Erro API Gestão Pay (Detalhes):", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { message: `Erro: ${data.message || 'Erro na operadora'}`, details: data },
        { status: response.status }
      );
    }

    console.log(">>> SUCESSO! Pagamento criado.");
    console.log(">>> JSON COMPLETO DA GESTÃO PAY:", JSON.stringify(data, null, 2));


    // === CORREÇÃO CRÍTICA: Mapeamento dos campos pixCode e qrCodeImage ===
    const pixCode = data.pix && data.pix.qrcode; // Caminho correto para o código PIX
    // Gerar a URL da imagem do QR Code usando um serviço externo
    const qrCodeImage = pixCode ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}` : null;

    if (!pixCode || !qrCodeImage) {
        console.warn("Não foi possível extrair pixCode ou qrCodeImage da resposta da Gestão Pay.");
        console.log("JSON da Resposta para Debug:", JSON.stringify(data, null, 2));
        throw new Error("Dados PIX incompletos na resposta da Gestão Pay.");
    }

    return NextResponse.json({
      pixCode: pixCode,
      qrCodeImage: qrCodeImage, 
      transactionId: data.id,
    }, { status: 201 });

  } catch (error) {
    console.error("FALHA:", error.message);
    return NextResponse.json(
      { message: "Erro interno.", error: error.message },
      { status: 500 }
    );
  }
}
