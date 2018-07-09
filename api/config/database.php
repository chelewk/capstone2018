<?php
ob_start();
session_start();

$DB_HOST = "104.196.55.103";
$DB_USER = "josh";
$DB_PASS = "capstone2018";
$DB_NAME = "capstone";

$connection = mysqli_connect($DB_HOST,$DB_USER,$DB_PASS,$DB_NAME);

$BANNER_HOST = "dummyBanner";
$bannerConnection = mysqli_connect($DB_HOST,$DB_USER,$DB_PASS,$BANNER_HOST);

$LDAP_HOST = "dummyLDAP";
$LDAPConnection = mysqli_connect($DB_HOST,$DB_USER,$DB_PASS,$LDAP_HOST);

?>