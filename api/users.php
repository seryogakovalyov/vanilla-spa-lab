<?php

header("Content-Type: application/json");

echo json_encode([
    ["id" => 1, "name" => "Sergey"],
    ["id" => 2, "name" => "Olga"],
    ["id" => 3, "name" => "Ivan"]
]);
