<?php

$path = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Se il file richiesto esiste, lascialo servire normalmente
if (is_file($path)) {
    return false;
}

// Se è una directory, genera un semplice index
if (is_dir($path)) {

    $style = "<style>*{box-sizing:border-box;padding:0;margin:0;}body{background:#222;color:white;padding:1rem;font-family:sans-serif;}ul{list-style-position:inside;}a{color:aqua;text-decoration:none;}a:hover{text-decoration:underline;}</style>";

    echo "$style<h1>Index of " . htmlspecialchars($_SERVER['REQUEST_URI']) . "</h1><ul>";

    foreach (scandir($path) as $item) {
        if ($item === '.') continue;
        $href = rtrim($_SERVER['REQUEST_URI'], '/') . '/' . $item;
        echo "<li><a href=\"$href\">$item</a></li>";
    }

    echo "</ul>";
    exit;
}

// Altrimenti 404
http_response_code(404);
echo "Not Found";