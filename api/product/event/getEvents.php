<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");
    require_once ("../../objects/event.php");

    if(!empty($_GET['userID']) && !empty($_GET['role'])){
        //Determine the current semester
        $month = date("m");
        $semester;
        if($month <=12 && $month >= 8){
            $semester = 'Fall';
        } else if ($month <=5 && $month >= 1){
            $semester = 'Spring';
        }
        $year = date("Y");

        $sql;
        $userID = mysqli_real_escape_string($bannerConnection,$_GET['userID']);
        $role = mysqli_real_escape_string($bannerConnection,$_GET['role']);

        switch ($role){
            case 'student':
                    $sql = "SELECT capstone.event.id,dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.locations.id as locID,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                    FROM capstone.event
                    INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                    INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                    INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                    LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                    WHERE sfrstcr.sfrstcr_pidm = '$userID' and ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                break;
            case 'instructor':
                if(!empty($_GET['master'])){
                    $sql = "SELECT capstone.event.id,dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.locations.id as locID,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                                FROM capstone.event
                                INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                                INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                                INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                                LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                                WHERE ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                } else{
                    $sql = "SELECT capstone.event.id,dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.locations.id as locID,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                    FROM capstone.event
                    INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                    INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                    INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                    LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                    WHERE dummyBanner.ssbsect.instructor_id = '$userID' and ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                }
                break;
            case 'admin':
                $sql = "SELECT DISTINCT capstone.event.id,dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.locations.id as locID,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                                FROM capstone.event
                                INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                                INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                                INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                                LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                                WHERE ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                    if(!empty($_GET['studentID'])){
                        $studentID = mysqli_real_escape_string($connection,$_GET['studentID']);
                        $sql = "SELECT capstone.event.id,dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.locations.id as locID,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                                FROM capstone.event
                                INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                                INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                                INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                                LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                                WHERE sfrstcr.sfrstcr_pidm = '$studentID' and ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                    }
                    if(!empty($_GET['instructorID'])){
                        $instructorID = mysqli_real_escape_string($connection,$_GET['instructorID']);
                        $sql = "SELECT capstone.event.id,dummyBanner.ssbsect.ssbsect_crn,dummyBanner.ssbsect.ssbsect_crse_name,capstone.locations.building,capstone.locations.room_num,capstone.locations.id as locID,capstone.event.start_time,capstone.event.end_time,capstone.event.date,capstone.event.notes,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                                FROM capstone.event
                                INNER JOIN dummyBanner.ssbsect ON event.crn = dummyBanner.ssbsect.ssbsect_crn
                                INNER JOIN dummyBanner.sfrstcr ON event.crn = dummyBanner.sfrstcr.sfrstcr_crn
                                INNER JOIN capstone.locations ON capstone.event.location = capstone.locations.id
                                LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                                WHERE dummyBanner.ssbsect.instructor_id = '$instructorID' and ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                    }
                break;
        }
        $result = mysqli_query($connection,$sql);

        if($result){
            $array = array();
            while($row = $result->fetch_assoc()){
                $event = new Event();
                $event->id = $row['id'];
                $event->crn = $row['ssbsect_crn'];
                $event->courseName = $row['ssbsect_crse_name'];
                $event->building = $row['building'];
                $event->roomNumber = $row['room_num'];
                $event->startTime = $row['start_time'];
                $event->endTime = $row['end_time'];
                $event->date = $row['date'];
                $event->notes = $row['notes'];
                $event->locationID = $row['locID'];
                $event->insFirstName=$row['first_name'];
                $event->insLastName=$row['last_name'];
                array_push($array,$event);
            }
            response(200,"Successfully pulled events",$array);
        }else{
            response(500,"Something went wrong",mysqli_error($bannerConnection));
        }
    }
    else{
        response(400,"Invalid Request",null);
    }
?>