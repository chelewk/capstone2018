<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

if(!empty($_GET['year'])){
    $year = mysqli_real_escape_string($connection,$_GET['year']);
    $fallStart = null;
    $fallEnd = null;
    $springStart = null;
    $springEnd = null;

    //Checks to see which values the user wants to set/update
    if(!empty($_GET['fallStart'])){
        $fallStart = mysqli_real_escape_string($connection,$_GET['fallStart']);
    }
    if(!empty($_GET['fallEnd'])){
        $fallEnd = mysqli_real_escape_string($connection,$_GET['fallEnd']);
    }
    if(!empty($_GET['springStart'])){
        $springStart = mysqli_real_escape_string($connection,$_GET['springStart']);
    }
    if(!empty($_GET['springEnd'])){
        $springEnd = mysqli_real_escape_string($connection,$_GET['springEnd']);
    }

    //Checks to see if the selected year already exists in the database
    $tstSql = "SELECT * FROM deadlines WHERE year = '$year'";
    $tstResult = mysqli_query($connection,$tstSql);

    $sqlResult;
    //If the year does exist in the database, update it
    if($tstResult->num_rows){
        while ($row = mysqli_fetch_array($tstResult)){
            if($row[1] != null && $fallStart === null){
                $fallStart = $row[1];
            }
            if($row[2] != null && $fallEnd === null){
                $fallEnd = $row[2];
            }
            if($row[3] != null && $springStart === null){
                $springStart = $row[3];
            }
            if($row[4] != null && $springEnd === null){
                $springEnd = $row[4];
            }
        }
        $sql = "UPDATE deadlines SET fallStart = '$fallStart',fallEnd = '$fallEnd',springStart='$springStart',springEnd='$springEnd' WHERE year='$year'";
        $sqlResult = mysqli_query($connection,$sql);

        if($sqlResult){
            response(200,'Successfully updated Deadline',null);
        } else{
            response(500,'Something Went Wrong',mysqli_error($connection));
        }
    //If the year does not exist in the database, create and initialize it with given values;
    }else {
        $sql = "INSERT INTO deadlines (year,fallStart,fallEnd,springStart,springEnd) VALUES ('$year','$fallStart','$fallEnd','$springStart','$springEnd')";
        $sqlResult = mysqli_query($connection,$sql);

        if ($sqlResult) {
            $id = mysqli_insert_id($connection);
            creationResponse(200,'Successfully Created Deadline',$id);
        } else {
            response(500, 'Something went wrong', mysqli_error($connection));
        }
    }
} else{
    response(400,'Invalid request',null);
}
?>
