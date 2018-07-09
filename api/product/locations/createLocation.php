<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    if(!empty($_GET['roomNum']) && !empty($_GET['equipment']) && !empty($_GET['capacity']) && !empty($_GET['offsite']) && !empty($_GET['roomType']) && !empty($_GET['building'])){

        $roomNum = mysqli_real_escape_string($connection,$_GET['roomNum']);
        $equipment = mysqli_real_escape_string($connection,$_GET['equipment']);
        $capacity = mysqli_real_escape_string($connection,$_GET['capacity']);
        $offsite;
        if(strtolower(mysqli_real_escape_string($connection,$_GET['offsite'])) == "yes"){
            $offsite = true;
        } else{$offsite = false;}
        $roomType = mysqli_real_escape_string($connection,$_GET['roomType']);
        $building = mysqli_real_escape_string($connection,$_GET['building']);

        $tstSql = "SELECT * FROM locations WHERE room_num='$roomNum' AND equipment='$equipment' AND capacity='$capacity' AND offsite='$offsite' AND room_type='$roomType' AND building='$building'";
        $tstResult = mysqli_query($connection,$tstSql);
        if($tstResult->num_rows){
            response(400,'This location has already been created',$tstResult);
        }else {

            $sql = "INSERT INTO locations (room_num,equipment,capacity,offsite,room_type,building) VALUES ('$roomNum','$equipment','$capacity',b'$offsite','$roomType','$building')";
            $result = mysqli_query($connection, $sql);

            if ($result) {
                $id = mysqli_insert_id($connection);
                creationResponse(200,'Successfully Created Location',$id);
            } else {
                response(500, 'Something went wrong', mysqli_error($connection));
            }
        }
    } else{
        response(400,'Invalid request',null);
    }
?>