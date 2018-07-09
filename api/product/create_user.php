<?php
    header("Content-type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
    require_once("../config/database.php");
    require_once ("../config/global_functions.php");

    if(!empty($_GET['username']) && !empty($_GET['password']) && !empty($_GET['email'])){
        $username = mysqli_real_escape_string($connection,$_GET['username']);
        $password = mysqli_real_escape_string($connection,$_GET['password']);
        $email = mysqli_real_escape_string($connection,$_GET['email']);

        //check to see if a user with these credentials exists
        $testSql = "SELECT * FROM users WHERE username = '$username' or email = '$email'";
        $testResult = mysqli_query($connection,$testSql);
        //if the user exists, do not create user
        if(mysqli_num_rows($testResult)!=0){
            response(200,"A user with this username or email already exists",null);

            response(400,"A user with this username or email already exists",null);

            response(400,"A user with this username or email already exists",null);

        }
        //if user does not exist, create new
        else {
            $sql = "INSERT INTO users (username,password,email) VALUES ('$username','$password','$email')";
            $result = mysqli_query($connection, $sql);

            //if the user is created, send success
            if ($result) {
                response(200, "Successfully Created User", null);
            } else {
                response(500, "Something went wrong.", null);
            }
        }
    }else{
        response(400,"Invalid Request",null);
    }
?>
