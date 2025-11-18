<?php

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['_method']) || $input['_method'] !== 'POST') {
    http_response_code(400);
    echo json_encode(['error' => 'Use _method: POST']);
    exit;
}

$name = isset($input['name']) ? trim($input['name']) : '';

if ($name === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Name is required']);
    exit;
}

if (!preg_match("/^[\p{L}\p{N}\s'’-]+$/u", $name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name contains invalid characters']);
    exit;
}

$name = preg_replace('/\s+/', ' ', $name);

require __DIR__ . '/../db.php';

$stmt = $pdo->prepare("INSERT INTO users (name) VALUES (:name)");
$stmt->execute(['name' => $name]);

$id = (int)$pdo->lastInsertId();

echo json_encode([
    'status' => 'created',
    'user' => [
        'id' => $id,
        'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8')
    ]
]);
