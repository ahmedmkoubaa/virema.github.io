<?php
   require_once "vendor/autoload.php";
   // require_once "php/database.php";

   $loader = new \Twig\Loader\FilesystemLoader('templates');
   $twig = new \Twig\Environment($loader);

   echo $twig->render('portada.html', [
      // 'eventos' => $eventos,
      // 'tipo' => $tipo,
      // 'foto_perfil' => $foto_perfil
   ]);
?>
