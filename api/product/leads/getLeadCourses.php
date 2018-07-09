<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

    if(!empty($_GET['instructorID'])){
        $id = mysqli_real_escape_string($connection,$_GET['instructorID']);

        $sql = "SELECT teaches FROM leads WHERE cuid = '$$id'";
        $result = mysqli_query($connection,$sql);

        if(mysqli_num_rows($result)!=0){
            while($row = $result->fetch_assoc()){
                response(200,"Successfully pulled courses",$row['teaches']);
            }
        } else{
            response(400, "Something went wrong",mysqli_error($connection));
        }
    } else{
        response(500,"Invalid Request",null);
    }

?>