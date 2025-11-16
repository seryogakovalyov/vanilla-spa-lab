<?php
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Laravel-style: {"_method": "PUT"}
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['_method']) || $input['_method'] !== "PUT") {
    http_response_code(400);
    echo json_encode(["error" => "Use _method: PUT"]);
    exit;
}

if (empty($input['id']) || empty($input['name'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID and name required"]);
    exit;
}

echo json_encode([
    "status" => "updated",
    "user" => [
        "id" => $input['id'],
        "name" => $input['name']
    ]
]);
