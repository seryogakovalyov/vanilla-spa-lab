<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['_method']) || $input['_method'] !== "DELETE") {
    http_response_code(400);
    echo json_encode(["error" => "Use _method: DELETE"]);
    exit;
}

if (empty($input['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID required"]);
    exit;
}

echo json_encode([
    "status" => "deleted",
    "id" => $input['id']
]);
