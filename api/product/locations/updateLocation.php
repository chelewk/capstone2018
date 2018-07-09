<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    if(!empty($_GET['id']) && !empty($_GET['roomNum']) && !empty($_GET['equipment']) && !empty($_GET['capacity']) && !empty($_GET['offsite']) && !empty($_GET['roomType']) && !empty($_GET['building']))
    {
        $id = mysqli_real_escape_string($connection,$_GET['id']);
        $roomNum = mysqli_real_escape_string($connection,$_GET['roomNum']);
        $equipment = mysqli_real_escape_string($connection,$_GET['equipment']);
        $capacity = mysqli_real_escape_string($connection,$_GET['capacity']);
        $offsite;
        if(strtolower(mysqli_real_escape_string($connection,$_GET['offsite'])) == "Yes"){
            $offsite = true;
        } else{$offsite = false;}
        $roomType = mysqli_real_escape_string($connection,$_GET['roomType']);
        $building = mysqli_real_escape_string($connection,$_GET['building']);

        $sql = "UPDATE locations SET room_num='$roomNum',equipment='$equipment',capacity='$capacity',offsite=b'$offsite',room_type='$roomType',building='$building' WHERE id = '$id'";
        $result = mysqli_query($connection,$sql);

        if($result){
            response(200,"Successfully updated location",null);
        } else{
            response(500,"Something went wrong",mysqli_error($connection));
        }
    }else{
        response(400,"Invalid Request",null);
    }
?>