<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    if(!empty($_GET['id']) ){
        $id = mysqli_real_escape_string($connection,$_GET['id']);

        $sql = "DELETE FROM event WHERE id='$id'";
        $result = mysqli_query($connection,$sql);

        $sql2 = "DELETE FROM event_log WHERE eventID = '$id'";
        $result2 = mysqli_query($connection,$sql2);

        if($result){
            response(200,"Event successfully deleted",null);
        } else{
            response(500,"Something went wrong",mysqli_error($connection));
        }

    }else{
        response(400,"Invalid Request",null);
    }
?>