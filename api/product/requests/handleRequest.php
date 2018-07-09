<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

    if(!empty($_GET['command'])){
        $command = mysqli_real_escape_string($connection,$_GET['command']);

        if($command == "accept" && !empty($_GET['reqID']) && !empty($_GET['crn']) && !empty($_GET['location']) && !empty($_GET['startTime']) && !empty($_GET['endTime']) && !empty($_GET['date']) && !empty($_GET['notes'])){
            $crn = mysqli_real_escape_string($connection,$_GET['crn']);
            $location = mysqli_real_escape_string($connection,$_GET['location']);
            $startTime = mysqli_real_escape_string($connection,$_GET['startTime']);
            $endTime = mysqli_real_escape_string($connection,$_GET['endTime']);
            $date = mysqli_real_escape_string($connection,$_GET['date']);
            $notes = mysqli_real_escape_string($connection,$_GET['notes']);
            $reqID = mysqli_real_escape_string($connection,$_GET['reqID']);
            if(!empty($_GET['eventID'])){
                $eventID = mysqli_real_escape_string($connection,$_GET['eventID']);
                $changeNotes = "Request was approved";

                $curDate = new DateTime();
                $dateString = $curDate->format('Y-m-d');
                $logSql = "INSERT INTO event_log (eventID,changeInfo,username,date) VALUES ('$eventID','$changeNotes','ADMIN','$dateString')";
                $logResult = mysqli_query($connection, $logSql);

                $eventID = mysqli_real_escape_string($connection,$_GET['eventID']);
                $sql = "UPDATE event SET location='$location',start_time='$startTime',end_time='$endTime',date='$date',notes='$notes' WHERE id='$eventID'";
                $result = mysqli_query($connection,$sql);
            } else {
                $changeNotes = " created event: ";
                $sql = "INSERT INTO event (crn,location,start_time,end_time,date,notes) VALUES ('$crn','$location','$startTime','$endTime','$date','$notes')";
                $result = mysqli_query($connection,$sql);
                $id = mysqli_insert_id($connection);

                $changeNotes .= $id;
                $curDate=new DateTime();
                $dateString = $curDate->format('Y-m-d');
                $logSql = "INSERT INTO event_log (eventID,changeInfo,username,date) VALUES ('$id','$changeNotes','ADMIN','$dateString')";
                $logResult = mysqli_query($connection,$logSql);
            }

            $clearSql = "DELETE FROM requests WHERE reqID = '$reqID'";
            $clearResult = mysqli_query($connection,$clearSql);

            if ($result) {
                response(200,'Successfully Approved Request',null);
            } else {
                response(500, 'Something went wrong', mysqli_error($connection));
            }

        } else if ($command == "deny" && !empty($_GET['reqID'])){
            $reqID = mysqli_real_escape_string($connection,$_GET['reqID']);
            $sql = "DELETE FROM requests WHERE reqID = '$reqID'";
            $result = mysqli_query($connection,$sql);

            if($result){
                response(200,"Successfully Denied Request", null);
            } else {
                response(500, 'Something went wrong', mysqli_error($connection));
            }
        }

    } else {
        response(400,"Invalid Request", null);
    }

?>