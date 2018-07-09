<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/request.php");


    $sql = "SELECT * FROM requests";
    $result = mysqli_query($connection,$sql);
    $array = array();

    while($row = $result->fetch_assoc()){
        $request = new Request();
        $request->reqID = $row['reqID'];
        $request->crn = $row['crn'];
        $request->locationID = $row ['location'];
        $request->date = $row['date'];
        $request->startTime = $row['start_time'];
        $request->endTime = $row['end_time'];
        $request->notes = $row['notes'];
        if($row['eventID'] != null){
            $request->originID = $row['eventID'];
            $request->reqType = "update";
        } else {
            $request->originID = 0;
            $request->reqType = "create";
        }

        $crn = $row['crn'];
        $nameSql = "SELECT * FROM dummyBanner.ssbsect WHERE ssbsect_crn='$crn'";
        $nameResult = mysqli_query($connection,$nameSql);
        while($row5 = $nameResult->fetch_assoc()){
            $request->courseName = $row5['ssbsect_crse_name'];
        }

        $locationSql = "SELECT * FROM locations WHERE id = '$request->locationID'";
        $locationResult = mysqli_query($connection,$locationSql);
        while($row2 = $locationResult->fetch_assoc()){
            $request->building = $row2['building'];
            $request->roomNumber = $row2['room_num'];
        }

        $cuid = $row['requestor'];
        $insSql = "SELECT * FROM dummyLDAP.users WHERE id = '$cuid'";
        $insResult = mysqli_query($connection,$insSql);
        while($row6 =$insResult->fetch_assoc()){
            $request->instructor = $row6['first_name'] . " " . $row6['last_name'];
        }

        if($row['eventID'] != null){
            $eventID = $row['eventID'];
            $eventSql = "SELECT * FROM event WHERE id = '$eventID'";
            $eventResult = mysqli_query($connection,$eventSql);
            while($row3 = $eventResult->fetch_assoc()){
                $request->originStartTime = $row3['start_time'];
                $request->originEndTime = $row3['end_time'];
                $request->originDate = $row3['date'];
                $request->originNotes = $row3['notes'];

                $locID = $row3['location'];
                $locSql = "SELECT * FROM locations WHERE id = '$locID'";
                $locResult = mysqli_query($connection,$locSql);
                while($row4 = $locResult->fetch_assoc()){
                    $request->originBuilding = $row4['building'];
                    $request->originRoomNumber = $row4['room_num'];
                }

                $crn = $row3['crn'];
                $instSql = "SELECT users.first_name,users.last_name,ssbsect_crn
                FROM dummyBanner.ssbsect
                INNER JOIN dummyLDAP.users on users.ID = ssbsect.instructor_id
                WHERE ssbsect_crn = '$crn'";
                $instResult = mysqli_query($connection,$instSql);
                while ($row7 = $instResult->fetch_assoc()){
                    $request->originInstructor = $row7['first_name'] . " " . $row7['last_name'];
                }
            }
        }
        array_push($array,$request);
    }

    response(200,'Successfully pulled requests',$array);


?>