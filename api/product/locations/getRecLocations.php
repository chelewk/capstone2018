<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/room.php");

if(!empty($_GET['date']) && !empty($_GET['startTime']) && !empty($_GET['endTime'])){
    $date = mysqli_real_escape_string($connection,$_GET['date']);
    $startTime = mysqli_real_escape_string($connection,$_GET['startTime']);
    $endTime = mysqli_real_escape_string($connection,$_GET['endTime']);
    $recLocations = array();
    $notRecLocations = array();

    $initSql = "SELECT location,start_time,end_time FROM event WHERE date = '$date'";
    $initResult = mysqli_query($connection,$initSql);

    if($initResult){
        while($row = $initResult->fetch_assoc()){
            if(($startTime >= $row['start_time'] && $startTime <= $row['end_time']) || ($endTime >= $row['start_time'] && $endTime <= $row['end_time'])){
                array_push($notRecLocations,$row['location']);
            }
        }

        $locationSql = "SELECT * FROM locations";
        $locationResult = mysqli_query($connection,$locationSql);

        if($locationResult){
            while($row2 = $locationResult->fetch_assoc()){
                $add = true;

                if(!empty($_GET['equipment'])){
                    $equipment = mysqli_real_escape_string($connection,$_GET['equipment']);
                    if(strpos($row2['equipment'],$equipment) == false){
                        $add = false;
                    }
                }

                if(!empty($_GET['capacity'])){
                    $capacity = mysqli_real_escape_string($connection,$_GET['capacity']);
                    if($capacity > $row2['capacity']){
                        $add = false;
                    }
                }

                if(!empty($_GET['offsite'])){
                    $offiste = mysqli_real_escape_string($connection,$_GET['offsite']);
                    if(($offiste == "no" && $row2['offsite'] == 1)||($offiste == "yes" && $row2['offsite'] == 0)){
                        $add = false;
                    }
                } else {
                    if($row2['offsite'] == 1){
                        $add = false;
                    }
                }

                if(in_array($row2['id'],$notRecLocations)){
                    $add = false;
                }

                if($add){
                    $room = new room();
                    $room->id = $row2['id'];
                    $room->roomNum = $row2['room_num'];
                    $room->equipment = $row2['equipment'];
                    $room->capacity = $row2['capacity'];
                    $room->offsite = $row2['offsite'];
                    $room->roomType = $row2['room_type'];
                    $room->building = $row2['building'];

                    array_push($recLocations,$room);
                }
            }
            response(200,"Successfully pulled locations",$recLocations);
        } else {
            response(500,"Something went wrong",mysqli_error($connection));
        }

    } else {
        response(500,"Something went wrong",mysqli_error($connection));
    }

} else {
    response(400,"Invalid Request",null);
}