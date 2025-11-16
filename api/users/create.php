<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Получаем JSON
$input = json_decode(file_get_contents("php://input"), true);

if (!$input || empty($input['name'])) {
    http_response_code(400);
    echo json_encode(["error" => "Name is required"]);
    exit;
}

echo json_encode([
    "status" => "created",
    "user" => [
        "id" => rand(100, 999),
        "name" => $input['name']
    ]
]);
