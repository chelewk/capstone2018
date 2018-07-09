<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/conflict.php");

if(!empty($_GET['conID']) && !empty($_GET['originID'])){
    $conID = mysqli_real_escape_string($connection,$_GET['conID']);
    $originID = mysqli_real_escape_string($connection,$_GET['originID']);

    $sql = "SELECT capstone.conflicts.conflictID,dummyLDAP.users.first_name,dummyLDAP.users.last_name,capstone.locations.building,capstone.locations.room_num,
            capstone.conflicts.date,capstone.conflicts.start_time,capstone.conflicts.end_time,dummyBanner.ssbsect.ssbsect_crse_name,capstone.conflicts.crn
            FROM conflicts
            INNER JOIN dummyLDAP.users on dummyLDAP.users.id = capstone.conflicts.instructorID
            INNER JOIN capstone.locations on capstone.locations.id = capstone.conflicts.locationID
            INNER JOIN dummyBanner.ssbsect on dummyBanner.ssbsect.ssbsect_crn = capstone.conflicts.crn
            WHERE conflicts.conflictID = '$conID'";
    $result = mysqli_query($connection,$sql);



    $sql2 = "SELECT dummyLDAP.users.first_name,dummyLDAP.users.last_name,capstone.event.start_time,capstone.event.end_time,dummyBanner.ssbsect.ssbsect_crse_name,capstone.event.crn,capstone.event.id
             FROM event
             INNER JOIN dummyBanner.ssbsect on dummyBanner.ssbsect.ssbsect_crn = capstone.event.crn
             INNER JOIN dummyLDAP.users on dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
             WHERE event.id = '$originID'";
    $result2 = mysqli_query($connection,$sql2);

    if($result && $result2){
        $array = array();
        $conflict = new Conflict();
        while($row = $result->fetch_assoc()){
            $conflict->conID = $row['conflictID'];
            $conflict->conInstructor = $row['last_name'] . ", " . $row['first_name'];
            $conflict->building = $row['building'];
            $conflict->roomNum = $row['room_num'];
            $conflict->date = $row['date'];
            $conflict->conStartTime = $row['start_time'];
            $conflict->conEndTime = $row['end_time'];
            $conflict->conCourseName = $row['ssbsect_crse_name'];
            $conflict->conCrn = $row['crn'];
        }
        while($row2 = $result2->fetch_assoc()){
            $conflict->originEventID = $row2['id'];
            $conflict->originInstructor = $row2['last_name'] . ', ' . $row2['first_name'];
            $conflict->originStartTime = $row2['start_time'];
            $conflict->originEndTime = $row2['end_time'];
            $conflict->originCourseName = $row2['ssbsect_crse_name'];
            $conflict->originCrn = $row2['crn'];
        }
        array_push($array,$conflict);
        response(200,"Successfully pulled conflicts",$array);
    } else{
        response(500,"Something went wrong",mysqli_error($connection));
    }
}
?>