<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");
    require_once("../../objects/deadline.php");

    $year = date("Y");

    if(!empty($_GET['year'])){
        $year = mysqli_real_escape_string($connection,$_GET['year']);
    }

    $sql = "SELECT * FROM deadlines WHERE year LIKE '%$year%'";
    $result = mysqli_query($connection,$sql);

    if($result){
        $array = array();

        while($row = $result->fetch_assoc()){
            $deadline = new Deadline();
            $deadline->year = $row['year'];
            $deadline->fallStart = $row['fallStart'];
            $deadline->fallEnd = $row['fallEnd'];
            $deadline->springStart = $row['springStart'];
            $deadline->springEnd = $row['springEnd'];
            array_push($array,$deadline);
        }
        response(200,"Successfully pulled deadlines",$array);
    }else{
        response(500,"Something went wrong",mysqli_error($connection));
    }
?>