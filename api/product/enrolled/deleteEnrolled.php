<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../../config/database.php");
    require_once ("../../config/global_functions.php");

    if(!empty($_GET['class']) && !empty($_GET['user']) && !empty($_GET['courseNum'])){
        $class = mysqli_real_escape_string($connection,$_GET['class']);
        $user = mysqli_real_escape_string($connection,$_GET['user']);
        $courseNum = mysqli_real_escape_string($connection,$_GET['courseNum']);

        $sql = "DELETE FROM enrolled WHERE class = '$class' AND user = '$user' AND courseNum = '$courseNum'";
        $result = mysqli_query($connection,$sql);

        if($result){
            response(200,"Enrolled successfully deleted",null);
        } else{
            response(500,"Something went wrong",mysqli_error($connection));
        }

    }else{
        response(400,"Invalid Request",null);
    }
?>