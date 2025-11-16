<?php
header("Content-Type: application/json");

echo json_encode([
    ["id" => 1, "title" => "First post"],
    ["id" => 2, "title" => "Second post"],
]);