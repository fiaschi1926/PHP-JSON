<?php

// se è stato passato un payload aggiunge al file dischi.json e restituisce lo stesso aggiornato

$dischi = file_get_contents('dischi.json');


$token = file_get_contents('token.txt');

if( isset($_POST['token']) && $_POST['token']!==$token){
    return;
}

if(isset($_POST['token']) && isset($_POST['payload'])){
    
	$newData = $_POST["payload"];

    $dischi_array = json_decode($dischi, true);

    $dischi_array[] = $newData;

    $new_dischi = json_encode($dischi_array);

    file_put_contents('dischi.json', $new_dischi);

    $dischi = $new_dischi;
}

header('Content-Type: application/json');


echo $dischi;
