<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/course.php");

    if(!empty($_GET['userID'])){
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

        $leadSql = "select teaches from leads where cuid = '$userID'";
        $leadResult = mysqli_query($connection,$leadSql);

        if($leadResult){
            $courseNames = '';
            while($row = $leadResult->fetch_assoc()){
                $courseNames = $row['teaches'];
            }
            $courseNameArray = explode(',',$courseNames);

            $sql = "SELECT ssbsect.id,ssbsect_crn,ssbsect_crse_numb,ssbsect_term_code,ssbsect_crse_name,ssbsect_ptrm_code,dummyLDAP.users.first_name,dummyLDAP.users.last_name FROM dummyBanner.ssbsect 
                    LEFT OUTER JOIN dummyLDAP.users ON  dummyBanner.ssbsect.instructor_id = dummyLDAP.users.id
                    WHERE ssbsect_term_code = '$year' AND ssbsect_ptrm_code = '$semester'";
            $result = mysqli_query($bannerConnection,$sql);

            if($result){
                $array = array();
                while($row = $result->fetch_assoc()){
                    if(in_array($row['ssbsect_crse_name'],$courseNameArray)){
                        $course = new Course();
                        $course->id = $row['id'];
                        $course->crn = $row['ssbsect_crn'];
                        $course->courseName = $row['ssbsect_crse_name'];
                        $course->year = $row['ssbsect_term_code'];
                        $course->semester = $row['ssbsect_ptrm_code'];
                        $course->insFirstName = $row['first_name'];
                        $course->insLastName = $row['last_name'];
                        array_push($array,$course);
                    }
                }
                response(200,"Successfully pulled courses",$array);
            }else{
                response(500,"Something went wrong",mysqli_error($bannerConnection));
            }
        }
    } else {
        reponse(400,"Invalid Request",null);
    }

?>