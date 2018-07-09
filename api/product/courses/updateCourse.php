<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    if(!empty($_GET['id']) && !empty($_GET['newCourseName']) && !empty($_GET['newCourse']) && !empty($_GET['newInstructor'])
        && !empty($_GET['newSemester']) && !empty($_GET['newYear'])
    ){
        $id = mysqli_real_escape_string($connection,$_GET['id']);
        $newCourse = mysqli_real_escape_string($connection,$_GET['newCourse']);
        $newCourseName =  mysqli_real_escape_string($connection,$_GET['newCourseName']);
        $newInstructor = mysqli_real_escape_string($connection,$_GET['newInstructor']);
        $newSemester = mysqli_real_escape_string($connection,$_GET['newSemester']);
        $newYear = mysqli_real_escape_string($connection,$_GET['newYear']);

        $sql = "UPDATE courses SET course='$newCourse',course_name='$newCourseName',instructor='$newInstructor',semester='$newSemester',year='$newYear' WHERE id='$id'";
        $result = mysqli_query($connection,$sql);

        if($result){
            response(200,"Successfully updated course",null);
        } else{
            response(500,"Something went wrong",mysqli_error($connection));
        }
    }
    else{
        response(400,"Invalid Request",null);
    }
?>