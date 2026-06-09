<?php

echo json_encode([
    'php_version' => PHP_VERSION,
    'cwd' => getcwd(),
    'vendor_exists' => file_exists(__DIR__ . '/../vendor/autoload.php'),
    'bootstrap_exists' => file_exists(__DIR__ . '/../bootstrap/app.php'),
    'public_exists' => file_exists(__DIR__ . '/../public/index.php'),
]);