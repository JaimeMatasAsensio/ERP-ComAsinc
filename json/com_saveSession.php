<?php
        function guardar($archivo, $cont){
            fwrite($archivo, $cont);
            fclose($archivo);
        }
        if (isset($_POST['compact'])) {
            $_SESSION['compact']=$_POST['compact'];
        }
        
        if (isset($_POST['user'])) {
            $_SESSION['user']=$_POST['user'];
        }

        if (isset($_SESSION['compact'])) {
            $archivo=fopen("../json/".$_SESSION['user']."_compact.json", "w");
            guardar($archivo, $_SESSION['compact']);
        }

        
    ?>
