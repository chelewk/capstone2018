<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    $sql;
    $message;
    if(!empty($_GET['month']) && !empty($_GET['year'])){
        $inYear = mysqli_real_escape_string($connection,$_GET['year']);
        $inMonth = mysqli_real_escape_string($connection,$_GET['month']);

        $sql = "SELECT * FROM event where year(start_time) = '$inYear' AND month(start_time) = '$inMonth'";
        $message = 'Successfully pulled requested events';
    } else{
        $sql = "SELECT * FROM event where year(start_time) = year(NOW()) AND month(start_time) = month(NOW())";
        $message = 'Successfully pulled this month\'s events';
    }

    $result = mysqli_query($connection,$sql);

    if($result){
        $array = array();
        while($row =mysqli_fetch_array($result)){
            array_push($array,$row);
        }
        response(200,$message,$array);
    }else{
        response(500,"Something went wrong",mysqli_error($connection));
    }
?>