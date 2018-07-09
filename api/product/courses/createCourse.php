<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    if(!empty($_GET['course']) && !empty($_GET['courseName']) && !empty($_GET['instructor']) && !empty($_GET['semester']) && !empty($_GET['year'])){
        $course = mysqli_real_escape_string($connection,$_GET['course']);
        $courseName = mysqli_real_escape_string($connection,$_GET['courseName']);
        $instructor = mysqli_real_escape_string($connection,$_GET['instructor']);
        $semester = mysqli_real_escape_string($connection,$_GET['semester']);
        $year = mysqli_real_escape_string($connection,$_GET['year']);

        $tstSql = "SELECT * FROM courses WHERE course='$course' AND course_name='$courseName' AND instructor='$instructor' AND semester='$semester' AND year='$year'";
        $tstResult = mysqli_query($connection,$tstSql);

        if($tstResult){
            response(400,'This course already exists',null);
        }else{
            $sql = "INSERT INTO courses (course,course_name,instructor,semester,year) VALUES ('$course','$courseName','$instructor','$semester','$year')";
            $result = mysqli_query($connection,$sql);

            if($result){
                $id = mysqli_insert_id($connection);
                creationResponse(200,'Successfully Created Course',$id);
            } else{
                response(500,'Something went wrong',null);
            }
        }
    } else{
        response(400,'Invalid request',null);
    }
?>