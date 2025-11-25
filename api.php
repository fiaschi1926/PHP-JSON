<?php

header('Content-Type: application/json');

$dischi = file_get_contents('dischi.json');
$dischi_array = json_decode($dischi, true);

// prendo post con json
$raw = file_get_contents("php://input");

if (!empty($raw)) {

    $data = json_decode($raw, true);

    if (isset($data['payload'])) {

        $newData = $data['payload'];

        $dischi_array[] = $newData;

        file_put_contents('dischi.json', json_encode($dischi_array, JSON_PRETTY_PRINT));
    }
}

echo json_encode($dischi_array);