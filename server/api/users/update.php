<?php

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['_method']) || $input['_method'] !== 'PUT') {
    http_response_code(400);
    echo json_encode(['error' => 'Use _method: PUT']);
    exit;
}

$id   = isset($input['id']) ? (int)$input['id'] : 0;
$name = isset($input['name']) ? trim($input['name']) : '';

if ($id <= 0 || $name === '') {
    http_response_code(400);
    echo json_encode(['error' => 'ID and Name are required']);
    exit;
}

if (!preg_match("/^[\p{L}\p{N}\s'’-]+$/u", $name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name contains invalid characters']);
    exit;
}

$name = preg_replace('/\s+/', ' ', $name);

require __DIR__ . '/../db.php';

$stmt = $pdo->prepare("SELECT id FROM users WHERE id = :id");
$stmt->execute(['id' => $id]);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
}

$stmt = $pdo->prepare("UPDATE users SET name = :name WHERE id = :id");
$stmt->execute(['name' => $name, 'id' => $id]);

echo json_encode([
    'status' => 'updated',
    'user' => [
        'id' => $id,
        'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8')
    ]
]);
