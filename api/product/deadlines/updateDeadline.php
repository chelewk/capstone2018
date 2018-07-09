<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");

if(!empty($_GET['year']) && !empty($_GET['fallStart']) && !empty($_GET['fallEnd']) && !empty($_GET['springStart']) && !empty($_GET['springEnd'])){
    $year = mysqli_real_escape_string($connection,$_GET['year']);
    $fallStart = mysqli_real_escape_string($connection,$_GET['fallStart']);
    $fallEnd = mysqli_real_escape_string($connection,$_GET['fallEnd']);
    $springStart = mysqli_real_escape_string($connection,$_GET['springStart']);
    $springEnd = mysqli_real_escape_string($connection,$_GET['springEnd']);

    $sql = "UPDATE deadlines SET fallStart='$fallStart',fallEnd='$fallEnd',springStart='$springStart',springEnd='$springEnd' WHERE year='$year'";
    $result = mysqli_query($connection,$sql);

    if($result){
        response(200,"Successfully updated deadlines",null);
    } else{
        response(500,"Something went wrong",mysqli_error($connection));
    }
}
else{
    response(400,"Invalid Request",null);
}
?>