<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

    if(!empty($_GET['id'])){
        $id = mysqli_real_escape_string($connection,$_GET['id']);

        $sql = "DELETE FROM conflicts WHERE conflictID = '$id'";
        $result = mysqli_query($connection,$sql);

        if($result){
            response(200,"Conflict successfully deleted",null);
        } else{
            response(500,"Something went wrong",null);
        }

    }else{
        response(400,"Invalid Request",null);
    }

?>