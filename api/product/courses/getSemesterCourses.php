<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once("../../config/global_functions.php");

    $month = date("m");
    $semester;
    if($month <=12 && $month >= 8){
        $semester = 'Fall';
    } else if ($month <=5 && $month >= 1){
        $semester = 'Spring';
    }

    //test

    $sql = "SELECT * FROM courses WHERE semester = '$semester'";
    $result = mysqli_query($connection,$sql);

    if($result){
        $array = array();
        while($row =mysqli_fetch_array($result)){
            array_push($array,$row);
        }
        response(200,"Successfully pulled courses",$array);
    }else{
        response(500,"Something went wrong",mysqli_error($connection));
    }
?>