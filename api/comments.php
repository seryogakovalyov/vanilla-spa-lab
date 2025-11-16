<?php
header("Content-Type: application/json");

echo json_encode([
    ["id" => 1, "post_id" => 1, "text" => "Nice!"],
    ["id" => 2, "post_id" => 1, "text" => "Great work!"],
]);