<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/event_log.php");

    if(!empty($_GET['eventID'])){
        $id = mysqli_real_escape_string($connection,$_GET['eventID']);

        $sql = "select * from event_log WHERE eventID = '$id'";
        $result = mysqli_query($connection,$sql);


        if($result){
            $array = array();
            while($row = $result->fetch_assoc()){
                $eventLog = new event_log();
                $eventLog->logID = $row['logID'];
                $eventLog->eventID = $row['eventID'];
                $eventLog->changeInfo = $row['changeInfo'];
                $eventLog->cuid = $row['username'];
                $nameSql = "select dummyLDAP.users.first_name,dummyLDAP.users.last_name from dummyLDAP.users where id = '$eventLog->cuid'";
                $nameResult = mysqli_query($LDAPConnection,$nameSql);
                if($nameResult){
                    while($row2 = $nameResult->fetch_assoc()){
                        $eventLog->name = $row2['first_name'] . ' ' . $row2['last_name'];
                    }
                }
                $eventLog->date = $row['date'];
                array_push($array,$eventLog);
            }
            response(200,"Successfully pulled change log",$array);
        }else{
            response(500,"Something went wrong",mysqli_error($bannerConnection));
        }

    } else {
        response(400,"Invalid Request",null);
    }

?>