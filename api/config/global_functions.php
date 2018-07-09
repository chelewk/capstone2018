<?php
//send data back to front-end
function response($status,$status_message,$data){
    header("HTTP/1.1".$status);

    $response['status'] = $status;
    $response['status_message'] = $status_message;
    $response['data'] = $data;

    $json_response = json_encode($response);
    echo $json_response;
}

function creationResponse($status,$status_message,$id){
    header("HTTP/1.1".$status);

    $response['status'] = $status;
    $response['status_message'] = $status_message;
    $response['id'] = $id;

    $json_response = json_encode($response);
    echo $json_response;
}

?>