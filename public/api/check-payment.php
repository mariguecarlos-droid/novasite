<?php
// public/api/check-payment.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$transactionId = $_GET['id'] ?? null;

if (!$transactionId) {
    http_response_code(400);
    echo json_encode(['message' => 'ID da transação é obrigatório.']);
    exit;
}

$PRIVATE_KEY = getenv('GESTAO_PAY_PRIVATE_KEY') ?: "sk_la9mlWiOxzUbCqzEaEWIzShbV8UMoVjr71bosbfkGvhdI9k6";
$GESTAO_PAY_ENDPOINT = "https://api.gestaopay.com.br/v1/transactions/$transactionId";

$ch = curl_init($GESTAO_PAY_ENDPOINT);
$auth = base64_encode("$PRIVATE_KEY:");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Basic $auth",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['message' => 'Erro interno na verificação']);
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo json_encode(['message' => 'Erro ao consultar transação']);
    exit;
}

// Retorna o payload completo da Gestão Pay
http_response_code(200);
echo json_encode($data);
?>
