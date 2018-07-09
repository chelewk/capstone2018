<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/event.php");

    if(!empty($_GET['roomNum']) && !empty($_GET['date'])){
        $roomNum = mysqli_real_escape_string($connection,$_GET['roomNum']);
        $date = (string)mysqli_real_escape_string($connection,$_GET['date']);

        $sql = "SELECT DISTINCT dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes
                    FROM capstone.event
                    INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                    INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                    INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                    WHERE capstone.locations.room_num = '$roomNum' AND capstone.event.date = '$date'";
        $result = mysqli_query($connection,$sql);

        if($result){
            $array = array();
            while($row = $result->fetch_assoc()){
                $event = new Event();
                $event->crn = $row['ssbsect_crn'];
                $event->courseName = $row['ssbsect_crse_name'];
                $event->building = $row['building'];
                $event->roomNumber = $row['room_num'];
                $event->startTime = $row['start_time'];
                $event->endTime = $row['end_time'];
                $event->date = $row['date'];
                $event->notes = $row['notes'];
                array_push($array,$event);
            }
            response(200,"Successfully pulled events",$array);
        }else{
            response(500,"Something went wrong",mysqli_error($connection));
        }
    } else{
        response(400,"Invalid Request",null);
    }
?>