<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

if(!empty($_GET['year']) && !empty($_GET['semester'])){
    $year = mysqli_real_escape_string($connection,$_GET['year']);
    $semester = mysqli_real_escape_string($connection,$_GET['semester']);

    if($semester = "fall"){
        $sql = "UPDATE deadlines SET fallStart = '',fallEnd='' WHERE year='$year'";
    } else if ($semester = "spring"){
        $sql = "UPDATE deadlines SET springStart = '',springEnd='' WHERE year='$year'";
    } else if ($semester = "both"){
        $sql = "UPDATE deadlines SET fallStart = '',fallEnd='',springStart = '',springEnd='' WHERE year='$year'";
    }

    $sql = "";
    $result = mysqli_query($connection,$sql);

    if($result){
        response(200,"Deadline successfully deleted",null);
    } else{
        response(500,"Something went wrong",null);
    }
}else{
    response(400,"Invalid Request",null);
}
?>