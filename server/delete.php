<?php

$dischi = file_get_contents('dischi.json');

if(isset($_POST['id_elimina'])){

    $id = $_POST['id_elimina'];

    $dischi_array = json_decode($dischi, true);

    foreach($dischi_array as $index => $disco){
        if($disco['id'] == $id){
            unset($dischi_array[$index]);
            break;
        }
    }

    $new_dischi = json_encode(array_values($dischi_array));

    file_put_contents('dischi.json', $new_dischi);

    $dischi = $new_dischi;

}

header('Content-Type: application/json');


echo $dischi;
