<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// -------- STATIC FILES (JS, CSS, IMAGES, ETC) --------

$publicFile = __DIR__ . '/public' . $path;

if (file_exists($publicFile) && !is_dir($publicFile)) {
    return false;
}

// -------- API HANDLING --------

if (strpos($path, '/api/') === 0) {
    $apiFile = __DIR__ . '/server' . $path;

    if (file_exists($apiFile)) {
        require $apiFile;
        return;
    }

    http_response_code(404);
    echo json_encode(['error' => 'API endpoint not found']);
    return;
}

require __DIR__ . '/public/index.html';
