<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

if(!empty($_GET['crn']) && !empty($_GET['location']) && !empty($_GET['startTime']) && !empty($_GET['endTime']) && !empty($_GET['date']) && !empty($_GET['notes']) && !empty($_GET['cuid'])) {
    $crn = mysqli_real_escape_string($connection, $_GET['crn']);
    $location = mysqli_real_escape_string($connection, $_GET['location']);
    $startTime = mysqli_real_escape_string($connection, $_GET['startTime']);
    $endTime = mysqli_real_escape_string($connection, $_GET['endTime']);
    $date = mysqli_real_escape_string($connection, $_GET['date']);
    $notes = mysqli_real_escape_string($connection, $_GET['notes']);
    $cuid = mysqli_real_escape_string($connection, $_GET['cuid']);
    $eventID = NULL;
    if(!empty($_GET['eventID'])){
        $eventID = $_GET['eventID'];
    }

    if($eventID != null){
        $sql = "INSERT INTO requests (crn,location,start_time,end_time,date,notes,requestor,eventID) VALUES ('$crn','$location','$startTime','$endTime','$date','$notes','$cuid','$eventID')";
    } else {
        $sql = "INSERT INTO requests (crn,location,start_time,end_time,date,notes,requestor) VALUES ('$crn','$location','$startTime','$endTime','$date','$notes','$cuid')";
    }
    $result = mysqli_query($connection, $sql);
    $id = mysqli_insert_id($connection);

    if ($result) {
        creationResponse(200,'Successfully Created Request',$id);
    } else {
        response(500, 'Something went wrong', mysqli_error($connection));
    }
} else {
    response(400,'Invalid request',null);
}
?>