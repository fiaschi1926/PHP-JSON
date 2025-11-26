<?php

// se è stato passato un payload aggiunge al file dischi.json e restituisce lo stesso aggiornato

$dischi = file_get_contents('dischi.json');


if(isset($_POST['id'])){

    $id = $_POST['id'];

    $dischi_array = json_decode($dischi, true);

    foreach($dischi_array as $index => $disco){
        if($disco['id'] == $id){
            if($dischi_array[$index]['ascoltato']=='true'){
                $dischi_array[$index]['ascoltato']='false';
            }else{
                $dischi_array[$index]['ascoltato']='true';
            }

            break;
        }
    }

    $new_dischi = json_encode(array_values($dischi_array));

    file_put_contents('dischi.json', $new_dischi);

    $dischi = $new_dischi;

}

header('Content-Type: application/json');


echo $dischi;
