<?php
// public/api/create-payment.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Método não permitido']);
    exit;
}

// Configurações
// IMPORTANTE: Em produção, idealmente use variáveis de ambiente ou arquivo de config protegido
$PRIVATE_KEY = getenv('GESTAO_PAY_PRIVATE_KEY') ?: "sk_la9mlWiOxzUbCqzEaEWIzShbV8UMoVjr71bosbfkGvhdI9k6"; 
$GESTAO_PAY_ENDPOINT = "https://api.gestaopay.com.br/v1/transactions";

$input = file_get_contents('php://input');
$body = json_decode($input, true);

if (!$body) {
    http_response_code(400);
    echo json_encode(['message' => 'Corpo da requisição inválido']);
    exit;
}

$payer = $body['payer'] ?? null;
$amount = $body['amount'] ?? 0;
$description = $body['description'] ?? '';
$amountInCents = round($amount * 100);

if (!$payer || empty($payer['cpf']) || strlen($payer['cpf']) !== 11) {
    http_response_code(400);
    echo json_encode(['message' => 'CPF inválido. Digite apenas números.']);
    exit;
}

$payload = [
    'amount' => $amountInCents,
    'paymentMethod' => 'pix',
    'customer' => [
        'name' => $payer['name'],
        'email' => $payer['email'],
        'phone' => $payer['phone'],
        'document' => [
            'number' => $payer['cpf'],
            'type' => 'cpf'
        ]
    ],
    'items' => [[
        'title' => $description,
        'quantity' => 1,
        'unitPrice' => $amountInCents,
        'tangible' => false
    ]]
];

$ch = curl_init($GESTAO_PAY_ENDPOINT);
$auth = base64_encode("$PRIVATE_KEY:");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Basic $auth"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['message' => 'Erro interno na requisição: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo json_encode(['message' => $data['message'] ?? 'Erro na operadora', 'details' => $data]);
    exit;
}

// Extrair PixCode
$pixCode = $data['pix']['qrcode'] ?? null;
$transactionId = $data['id'] ?? null;

if (!$pixCode) {
    http_response_code(500);
    echo json_encode(['message' => 'Dados PIX incompletos na resposta da Gestão Pay', 'debug' => $data]);
    exit;
}

// Gerar QR Code Image URL (usando serviço externo, igual ao Node)
$qrCodeImage = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($pixCode);

http_response_code(201);
echo json_encode([
    'pixCode' => $pixCode,
    'qrCodeImage' => $qrCodeImage,
    'transactionId' => $transactionId
]);
?>
