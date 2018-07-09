<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/user.php");

    $sql = "SELECT * FROM dummyLDAP.users WHERE role='instructor'";
    if(!empty($_GET['instructorID'])){
        $id = mysqli_real_escape_string($connection,$_GET['instructorID']);
        $sql = "SELECT * FROM dummyLDAP.users WHERE id = '$id'";
    }
    $result = mysqli_query($connection,$sql);

    $array = array();
    if($result){
        while($row = $result->fetch_assoc()){
            $user = new User();
            $user->canSchedule = false;
            $user->role = "instructor";
            $user->firstName = $row['first_name'];
            $user->lastName = $row['last_name'];
            $user->cwid = $row['id'];
            $leadSql = "SELECT cuid FROM leads WHERE cuid = '$user->cwid'";
            $leadResult = mysqli_query($connection,$leadSql);

            $leadSql = "SELECT teaches FROM leads WHERE cuid = '$user->cwid'";
            $leadResult = mysqli_query($connection,$leadSql);

            if($user->role == "admin"){
                $user->canSchedule = true;
            } else if( mysqli_num_rows($leadResult) != 0){
                while($row2 = mysqli_fetch_array($leadResult)){
                    $user->canSchedule = explode(',',$row2['teaches']);
                }
            }
            else{
                $user->canSchedule = false;
            }
            array_push($array,$user);
        }
        response(200,"successfully pulled instructors",$array);
    } else{
        response(500,"something went wrong",mysqli_error($connection));
    }

?>