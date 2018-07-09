<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");
    require_once ("../../objects/conflict.php");
    require_once ("../../objects/event.php");

    if(!empty($_GET['crn']) && !empty($_GET['location']) && !empty($_GET['startTime']) && !empty($_GET['endTime']) && !empty($_GET['date']) && !empty($_GET['notes']) && !empty($_GET['cuid'])){
        $crn = mysqli_real_escape_string($connection,$_GET['crn']);
        $location = mysqli_real_escape_string($connection,$_GET['location']);
        $startTime = mysqli_real_escape_string($connection,$_GET['startTime']);
        $endTime = mysqli_real_escape_string($connection,$_GET['endTime']);
        $date = mysqli_real_escape_string($connection,$_GET['date']);
        $notes = mysqli_real_escape_string($connection,$_GET['notes']);
        $cuid = mysqli_real_escape_string($connection,$_GET['cuid']);
        $changeNotes = " created event: ";
        $override = false;
        if(!empty($_GET['override'])){
            $override = true;
        }

        $currentYear = date("Y");
        $currentDate = date("m-d-Y");
        $deadlineSql = "SELECT * FROM deadlines WHERE year like '$currentYear'";
        $deadlineResult = mysqli_query($connection,$deadlineSql);
        $createRequest = false;
        while($deadlineRow = $deadlineResult->fetch_assoc()){
            if(($deadlineRow['fallStart'] < $currentDate && $currentDate < $deadlineRow['fallEnd']) || ($deadlineRow['springStart'] < $currentDate && $currentDate < $deadlineRow['springEnd'])){
                $createRequest = true;
                $request = new Event();
                $request->crn = $crn;
                $request->locationID = $location;
                $request->startTime = $startTime;
                $request->endTime = $endTime;
                $request->date = $endTime;
                $request->notes = $notes;
            }
        }

        //Checks to see if this event conflicts with an already existing created
        $genCon = false;
        $conSql = "SELECT event.crn,event.id,event.start_time,event.end_time,dummyLDAP.users.first_name,dummyLDAP.users.last_name,dummyBanner.ssbsect.ssbsect_crse_name,locations.room_num,locations.building
                   FROM event 
                   INNER JOIN dummyBanner.ssbsect ON dummyBanner.ssbsect.ssbsect_crn = capstone.event.crn
                   INNER JOIN dummyLDAP.users ON dummyLDAP.users.id = dummyBanner.ssbsect.instructor_id
                   INNER JOIN capstone.locations ON capstone.locations.id = capstone.event.location
                   WHERE location='$location' AND date='$date'";
        $conResult = mysqli_query($connection,$conSql);
        while($row = $conResult->fetch_assoc()){
            if(($startTime >= $row['start_time'] && $startTime <= $row['end_time']) || ($endTime >= $row['start_time'] && $endTime <= $row['end_time'])){
                //create conflict
                $genCon = true;
                $conflict = new Conflict();
                $newCrn = $row['crn'];
                $infoSql = "SELECT dummyBanner.ssbsect.ssbsect_crse_name,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                            FROM dummyBanner.ssbsect
                            INNER JOIN dummyLDAP.users on dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                            WHERE dummyBanner.ssbsect.ssbsect_crn = '$newCrn'";
                $infoResult = mysqli_query($bannerConnection,$infoSql);
                while($row2 = $infoResult->fetch_assoc()){
                    $conflict->conInstructor = $row2['last_name'] . ", " . $row2['first_name'];
                    $conflict->conStartTime = $startTime;
                    $conflict->conEndTime = $endTime;
                    $conflict->conCourseName = $row2['ssbsect_crse_name'];
                    $conflict->conCrn = $crn;
                }
                $conflict->originEventID = $row['id'];
                $conflict->originInstructor = $row['last_name'] . ', ' . $row['first_name'];
                $conflict->originStartTime = $row['start_time'];
                $conflict->originEndTime = $row['end_time'];
                $conflict->originCourseName = $row['ssbsect_crse_name'];
                $conflict->originCrn = $row['crn'];
                $conflict->date = $date;
                $conflict->roomNum = $row['room_num'];
                $conflict->building = $row['building'];
            }
        }

        if(!$override && $createRequest){
            $reqSql = "INSERT INTO requests (crn,location,start_time,end_time,date,notes,requestor) VALUES ('$crn','$location','$startTime','$endTime','$date','$notes','$cuid')";
            $reqResult = mysqli_query($connection,$reqSql);
            $id = mysqli_insert_id($connection);

            creationResponse(200,'Successfully Created Request',$id);
        } else if($genCon){
            response(409,'This will create a conflict',$conflict);
        }else {
            $sql = "INSERT INTO event (crn,location,start_time,end_time,date,notes) VALUES ('$crn','$location','$startTime','$endTime','$date','$notes')";
            $result = mysqli_query($connection, $sql);
            $id = mysqli_insert_id($connection);

            $changeNotes .= $id;
            $curDate=new DateTime();
            $dateString = $curDate->format('Y-m-d');
            $logSql = "INSERT INTO event_log (eventID,changeInfo,username,date) VALUES ('$id','$changeNotes','$cuid','$dateString')";
            $logResult = mysqli_query($connection,$logSql);

            if ($result) {
                creationResponse(200,'Successfully Created Event',$id);
            } else {
                response(500, 'Something went wrong', mysqli_error($connection));
            }
        }
    } else{
        response(400,'Invalid request',null);
    }
?>