import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get('id');

  if (!transactionId) {
    return NextResponse.json({ message: "ID da transação é obrigatório." }, { status: 400 });
  }

  const PRIVATE_KEY = process.env.GESTAO_PAY_PRIVATE_KEY;
  const GESTAO_PAY_ENDPOINT = `https://api.gestaopay.com.br/v1/transactions/${transactionId}`;

  try {
    const basicAuth = Buffer.from(`${PRIVATE_KEY}:`).toString('base64');
    
    const response = await fetch(GESTAO_PAY_ENDPOINT, {
        method: "GET",
        headers: {
            "Authorization": `Basic ${basicAuth}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error(`Erro ao consultar transação ${transactionId}: ${response.status}`);
        return NextResponse.json({ message: "Erro ao consultar transação." }, { status: response.status });
    }

    const data = await response.json();
    
    // Log para debug
    console.log(`Status da transação ${transactionId}:`, data.status);

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Erro interno ao verificar pagamento:", error);
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
