<?php

/*include_once "../nhinclude.php";*/
include_once "dudleyinclude.php";

session_start();

is_autologin();


function doexit()
{
    global $dudley_root_url;
    header('Location: ' . $dudley_root_url);
    exit;
}


$userid = $_SESSION['userid']; /*logged_in_userid(0);*/

$strip_id = $_GET['id'];

if (!isset($userid)) doexit();

if (!isset($strip_id) || (!preg_match('/^[0-9]+$/', $strip_id))) doexit();



$sql = "select stripdata from strip where stripid='".$strip_id."' and authorid=".$userid;
$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows != 1) doexit();

$strip_data = db_get_rowdata($res, 0);

$str = $strip_data['stripdata'];

$fname = "dudley_strip_".date("YmdHis").".txt";

header('Content-Type: binary/octet-stream');
header('Content-Length: '.strlen($str));
header('Content-Disposition: attachment; filename="'.$fname.'"');

print $str;

exit;
