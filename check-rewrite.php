<?php
// Check if mod_rewrite is enabled
$modules = apache_get_modules();
$rewriteEnabled = in_array('mod_rewrite', $modules);

header('Content-Type: application/json');
echo json_encode([
    'mod_rewrite_enabled' => $rewriteEnabled,
    'loaded_modules' => $modules,
    'server_software' => $_SERVER['SERVER_SOFTWARE'],
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'script_name' => $_SERVER['SCRIPT_NAME'],
    'request_uri' => $_SERVER['REQUEST_URI']
]);
