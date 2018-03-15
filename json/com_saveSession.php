<?php
  function guardar($archivo, $cont){
      fwrite($archivo, $cont);
      fclose($archivo);
      echo  "Sesion guardada con exito";
  }
  session_start();
  if(isset($_POST["user"])){
    $_SESSION["user"] = $_POST["user"];
  }

  if (isset($_POST["compact"])) {
      $_SESSION["compact"] = $_POST["compact"];
  }
  
  if (isset($_SESSION["compact"]) && isset($_SESSION["user"])) {
      $archivo=fopen($_SESSION["user"] . "_compact.json", "w+");
      guardar($archivo, $_SESSION["compact"]);

  }

?>
