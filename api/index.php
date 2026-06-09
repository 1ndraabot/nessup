<?php

echo json_encode([
    'php_version' => PHP_VERSION,
    'cwd' => getcwd(),
    'vendor_exists' => file_exists(__DIR__ . '/../vendor/autoload.php'),
    'bootstrap_exists' => file_exists(__DIR__ . '/../bootstrap/app.php'),
    'public_exists' => file_exists(__DIR__ . '/../public/index.php'),
]);

try {

    $app = require_once __DIR__.'/../bootstrap/app.php';

} catch (\Throwable $e) {

    echo json_encode([
        'bootstrap_error' => true,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
    ]);

    exit;
}