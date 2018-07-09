<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    $sql = "SELECT * FROM enrolled";
    $result = mysqli_query($connection,$sql);

    if($result){
        $array = array();
        while($row =mysqli_fetch_array($result)){
            array_push($array,$row);
        }
        response(200,"Successfully pulled enrolled",$array);
    }else{
        response(500,"Something went wrong",mysqli_error($connection));
    }
?>