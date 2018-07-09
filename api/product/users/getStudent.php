<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/user.php");

    $sql = "SELECT * FROM dummyLDAP.users WHERE role='student'";
    if(!empty($_GET['studentID'])){
        $id = mysqli_real_escape_string($connection,$_GET['studentID']);
        $sql = "SELECT * FROM dummyLDAP.users WHERE id = '$id'";
    }
    $result = mysqli_query($connection,$sql);

    if($result){
        while($row = $result->fetch_assoc()){
            $user = new User();
            $user->canSchedule = false;
            $user->role = "student";
            $user->firstName = $row['first_name'];
            $user->lastName = $row['last_name'];
            $user->cwid = $row['id'];
        }
        response(200,"successfully pulled student",null);
    } else{
        response(500,"something went wrong",mysqli_error($connection));
    }

?>