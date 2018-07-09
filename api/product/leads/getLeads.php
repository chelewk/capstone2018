<?php
header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
require_once("../../config/database.php");
require_once ("../../config/global_functions.php");
require_once ("../../objects/leads.php");

    $sql = "SELECT capstone.leads.cuid,capstone.leads.teaches,dummyLDAP.users.first_name,dummyLDAP.users.last_name
            FROM leads
            INNER JOIN dummyLDAP.users on capstone.leads.cuid = dummyLDAP.users.id";
    if(!empty($_GET['instructorID'])){
        $id = mysqli_real_escape_string($connection,$_GET['instructorID']);

        $sql = "SELECT capstone.leads.cuid,capstone.leads.teaches,dummyLDAP.users.first_name,dummyLDAP.users.last_name
                FROM leads
                INNER JOIN dummyLDAP.users on capstone.leads.cuid = dummyLDAP.users.id 
                WHERE capstone.leads.cuid = '$id'";
    }
    $result = mysqli_query($connection,$sql);

    if($result){
        $array = array();
        while($row = $result->fetch_assoc()){
            $lead = new Leads();
            $lead->id = $row['cuid'];
            $lead->firstName = $row['first_name'];
            $lead->lastName = $row['last_name'];
            $lead->courses = explode(";",$row['teaches']);
            $lead->crns = array();
            foreach($lead->courses as $courseName){
                $crnSql = "SELECT ssbsect_crn FROM ssbsect WHERE ssbsect_crse_name = '$courseName'";
                $crnResult = mysqli_query($bannerConnection,$crnSql);

                if($crnResult){
                    while($crnRow = $crnResult->fetch_assoc()){
                        array_push($lead->crns,$crnRow['ssbsect_crn']);
                    }
                }
            }
            array_push($array,$lead);
        }
        response(200,"successfully pulled leads",$array);
    } else{
        response(500,"something went wrong",mysqli_error($connection));
    }

?>