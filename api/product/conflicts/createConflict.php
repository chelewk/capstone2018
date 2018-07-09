<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

    if(!empty($_GET['instructor']) && !empty($_GET['location']) && !empty($_GET['date']) && !empty($_GET['startTime']) && !empty($_GET['endTime']) && !empty($_GET['crn']) && !empty($_GET['eventID'])){
        $instructor = mysqli_real_escape_string($connection,$_GET['instructor']);
        $location = mysqli_real_escape_string($connection,$_GET['location']);
        $date = mysqli_real_escape_string($connection,$_GET['date']);
        $startTime = mysqli_real_escape_string($connection,$_GET['startTime']);
        $endTime = mysqli_real_escape_string($connection,$_GET['endTime']);
        $crn = mysqli_real_escape_string($connection,$_GET['crn']);
        $eventID = mysqli_real_escape_string($connection,$_GET['eventID']);
        $notes = '';
        if(!empty($_GET['notes'])){
            $notes = $_GET['notes'];
        }

        $tstSql = "SELECT * FROM conflicts
                   WHERE instructorID = '$instructor' AND locationID = '$location' AND date = '$date' AND start_time = '$startTime' AND end_time = '$endTime' AND crn = '$crn'";
        $tstResult = mysqli_query($connection,$tstSql);
        if($tstResult->num_rows){
            response(400,'This conflict has already been created',$tstResult);
        } else{
            $sql = "INSERT INTO conflicts (instructorID,locationID,date,start_time,end_time,crn,eventID,notes) VALUES ('$instructor','$location','$date','$startTime','$endTime','$crn','$eventID','$notes')";
            $result = mysqli_query($connection,$sql);

            if($result){
                $id = mysqli_insert_id($connection);
                creationResponse(200,'Successfully Created Conflict',$id);
            } else{
                response(500,'Something went wrong',mysqli_error($connection));
            }
        }
    }else{
        response(400,'Invalid request',null);
    }

?>