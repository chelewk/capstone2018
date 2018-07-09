<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

    if(!empty($_GET['id']) && !empty($_GET['courseNames'])){
        $id = mysqli_real_escape_string($connection,$_GET['id']);
        $courseNames = mysqli_real_escape_string($connection,$_GET['courseNames']);
        $courseNames = str_replace('\"', '',$courseNames);

        $tstSql = "SELECT * FROM leads WHERE cuid = '$id'";
        $tstResult = mysqli_query($connection,$tstSql);

        if(mysqli_num_rows($tstResult)!=0){
            $updateSql = "UPDATE leads SET teaches = '$courseNames' WHERE cuid = '$id'";
            $updateResult = mysqli_query($connection,$updateSql);

            if($updateResult){
                response(200,"Successfully updated the courses for this instructor",null);
            } else{
                response(500,"Something went wrong",mysqli_error($connection));
            }
        } else{
            $insertSql = "INSERT INTO leads (cuid,teaches) VALUES ('$id','$courseNames')";
            $insertResult = mysqli_query($connection,$insertSql);

            if($insertResult){
                response(200,"Successfully assigned lead role to this instructor",null);
            } else{
                response(500,"Something went wrong",mysqli_error($connection));
            }
        }
    } else{
        response(400,"Invalid Request",null);
    }
?>