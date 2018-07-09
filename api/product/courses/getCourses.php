<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");
    require_once ("../../objects/course.php");

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
                $sql = "SELECT ssbsect.id,ssbsect_crn,ssbsect_crse_numb,ssbsect_term_code,ssbsect_crse_name,ssbsect_ptrm_code,dummyLDAP.users.first_name,dummyLDAP.users.last_name FROM ssbsect 
                        INNER JOIN sfrstcr on sfrstcr_crn = ssbsect_crn
                        LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                        WHERE sfrstcr_pidm = '$userID' AND ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                break;
            case 'instructor':
                //If they want to override the year/semester
                if(!empty($_GET['year'])){
                    $year = mysqli_real_escape_string($bannerConnection,$_GET['year']);
                }
                if(!empty($_GET['semester'])){
                    $semester = mysqli_real_escape_string($bannerConnection,$_GET['semester']);
                }

                $sql = "SELECT ssbsect.id,ssbsect_crn,ssbsect_crse_numb,ssbsect_term_code,ssbsect_crse_name,ssbsect_ptrm_code,dummyLDAP.users.first_name,dummyLDAP.users.last_name FROM ssbsect 
                        LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                        WHERE instructor_id = '$userID' AND ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                break;
            case 'admin':
                //If they want to override the year/semester
                if(!empty($_GET['year'])){
                    $year = mysqli_real_escape_string($bannerConnection,$_GET['year']);
                }
                if(!empty($_GET['semester'])){
                    $semester = mysqli_real_escape_string($bannerConnection,$_GET['semester']);
                }

                $sql = "SELECT ssbsect.id,ssbsect_crn,ssbsect_crse_numb,ssbsect_term_code,ssbsect_crse_name,ssbsect_ptrm_code,dummyLDAP.users.first_name,dummyLDAP.users.last_name FROM ssbsect LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id";
                //If they have selected to view a certain instructor's courses
                if(!empty($_GET['instructorID'])){
                    $instructorID = mysqli_real_escape_string($bannerConnection,$_GET['instructorID']);
                    $sql = "SELECT ssbsect.id,ssbsect_crn,ssbsect_crse_numb,ssbsect_term_code,ssbsect_crse_name,ssbsect_ptrm_code,dummyLDAP.users.first_name,dummyLDAP.users.last_name FROM ssbsect 
                            INNER JOIN sfrstcr on sfrstcr_crn = ssbsect_crn
                            LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                            WHERE instructor_id = '$instructorID' AND ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                } //If they have selected to view a certain student's courses
                else if(!empty($_GET['studentID'])){
                    $studentID = mysqli_real_escape_string($bannerConnection,$_GET['studentID']);
                    $sql = "SELECT ssbsect.id,ssbsect_crn,ssbsect_crse_numb,ssbsect_term_code,ssbsect_crse_name,ssbsect_ptrm_code,dummyLDAP.users.first_name,dummyLDAP.users.last_name FROM ssbsect 
                            INNER JOIN sfrstcr on sfrstcr_crn = ssbsect_crn
                            LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                            WHERE sfrstcr_pidm = '$studentID' AND ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
                }
                break;
        }
        $result = mysqli_query($bannerConnection,$sql);

        if($result){
            $array = array();
            while($row =$result->fetch_assoc()){
                $course = new Course();
                $course->id = $row['id'];
                $course->crn = $row['ssbsect_crn'];
                $course->courseName = $row['ssbsect_crse_name'];
                $course->year = $row['ssbsect_term_code'];
                $course->semester = $row['ssbsect_ptrm_code'];
                $course->insLastName = $row['last_name'];
                $course->insFirstName = $row['first_name'];
                array_push($array,$course);
            }
            response(200,"Successfully pulled courses",$array);
        }else{
            response(500,"Something went wrong",mysqli_error($bannerConnection));
        }
    } else{
        reponse(400,"Invalid Request",null);
    }
?>