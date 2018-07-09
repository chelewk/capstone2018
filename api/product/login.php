<?php
    header("Content-type:application/json");
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../config/database.php");
    require_once("../objects/user.php");
    require_once ("../config/global_functions.php");
    
    //Error display
    //ini_set('display_errors', 1);

    if(!empty($_GET['username']) && !empty($_GET['password'])){
        $username = mysqli_real_escape_string($LDAPConnection, $_GET['username']);
        $password = mysqli_real_escape_string($LDAPConnection, $_GET['password']);

        $sql = "SELECT * FROM users WHERE id = '$username' AND password = '$password'";
        $result = mysqli_query($LDAPConnection,$sql);

        $leadSql = "SELECT cuid,teaches FROM leads WHERE cuid = '$username'";
        $leadResult = mysqli_query($connection,$leadSql);

        if(mysqli_num_rows($result)!=0){
            $user = new User();
            while($row = $result->fetch_assoc()){
                $user->cwid = $username;
                $user->role = $row['role'];
                $user->firstName = $row['first_name'];
                $user->lastName = $row['last_name'];
                if($user->role == "admin"){
                    $user->canSchedule = true;
                    $user->canScheduleCrns = array();
                } else if( mysqli_num_rows($leadResult) != 0){
                    while($row = mysqli_fetch_array($leadResult)){
                        $user->canSchedule = explode(',',$row['teaches']);
                    }
                    $user->canScheduleCrns = array();
                    foreach($user->canSchedule as $courseName){
                        $crnSql = "SELECT ssbsect_crn FROM ssbsect WHERE ssbsect_crse_name = '$courseName'";
                        $crnResult = mysqli_query($bannerConnection,$crnSql);

                        if($crnResult){
                            while($crnRow = $crnResult->fetch_assoc()){
                                array_push($user->canScheduleCrns,$crnRow['ssbsect_crn']);
                            }
                        }
                    }
                }
                else{
                    $user->canSchedule = false;
                    $user->canScheduleCrns = false;
                }
            }

            response(200,"Login Successful.",$user);
        } else{
            response(400,"Incorrect username or password.",null);
        }
    } else{
        response(400,"Invalid Request",null);
    }
?>
