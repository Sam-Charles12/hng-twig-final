<?php
require_once 'vendor/autoload.php';

// Initialize Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false, // Disable cache for development
    'debug' => true,
]);

// Detect base path dynamically
$scriptName = $_SERVER['SCRIPT_NAME'];
$basePath = dirname($scriptName);
// If in root, basePath will be '/', otherwise it will be like '/hng-twig'
if ($basePath === '/' || $basePath === '\\') {
    $basePath = '';
}

// Add base_path as a global variable for all templates
$twig->addGlobal('base_path', $basePath);

// Simple Router
$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Remove base path if present
if (!empty($basePath) && strpos($requestPath, $basePath) === 0) {
    $requestPath = substr($requestPath, strlen($basePath));
}

// Ensure path starts with /
if (empty($requestPath) || $requestPath === '') {
    $requestPath = '/';
}

// Route definitions
switch ($requestPath) {
    case '/':
        // Landing page
        echo $twig->render('pages/landing.twig', [
            'currentYear' => date('Y')
        ]);
        break;
    
    case '/login':
        // Login page
        echo $twig->render('pages/login.twig', [
            'currentYear' => date('Y')
        ]);
        break;
    
    case '/auth/login':
        // Alias for Login page
        echo $twig->render('pages/login.twig', [
            'currentYear' => date('Y')
        ]);
        break;
    
    case '/register':
        // Register page
        echo $twig->render('pages/register.twig', [
            'currentYear' => date('Y')
        ]);
        break;
    
    case '/auth/register':
        // Alias for Register page
        echo $twig->render('pages/register.twig', [
            'currentYear' => date('Y')
        ]);
        break;

    case '/dashboard':
        // Demo dashboard page
        echo $twig->render('pages/dashboard.twig', [
            'currentYear' => date('Y')
        ]);
        break;
    
    case '/tickets':
        // Tickets management page
        echo $twig->render('pages/tickets.twig', [
            'currentYear' => date('Y')
        ]);
        break;

    case '/ticket-form':
        // Ticket form page (create/edit)
        echo $twig->render('pages/ticket-form.twig', [
            'currentYear' => date('Y')
        ]);
        break;

    case '/ticket-detail':
        // Ticket detail page
        echo $twig->render('pages/ticket-detail.twig', [
            'currentYear' => date('Y')
        ]);
        break;
    
    default:
        // 404 Not Found
        http_response_code(404);
        echo '<h1>404 - Page Not Found</h1>';
        break;
}
