<?php
include_once "utils.php";
include_once "dudleyinclude.php";

session_start();


$strip_id = isset($_GET['id']) ? $_GET['id'] : NULL;
$vote_val = isset($_GET['val']) ? $_GET['val'] : NULL;
$del_vote = isset($_GET['del']) ? $_GET['del'] : NULL;

function doexit()
{
    global $dudley_root_url;
    global $strip_id;
    header('Location: '.$dudley_root_url.'?'.$strip_id);
    exit;
}

if (!isset($del_vote)) {
    if (!isset($vote_val) || (!preg_match('/^[0-9]+$/', $vote_val))) doexit();

    if (($vote_val < 0) || ($vote_val >= count($rating_names))) doexit();
}

if (!isset($strip_id) || (!preg_match('/^[0-9]+$/', $strip_id))) doexit();

$userid = isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL;

if (!isset($userid)) doexit();

$sql = "select approved from strip where stripid='".$strip_id."' and approved=true";
$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows != 1) doexit();

if (isset($del_vote)) {
    $has_voted = db_get_has_user_voted($strip_id, $userid);
    if (isset($has_voted) && ($has_voted > 0)) {
	$sql = "delete from vote where stripid='".$strip_id."' and userid='".$userid."'";
	$res = db_exec($sql);
    }
} else {
    if (db_get_has_user_voted($strip_id, $userid)) doexit();

    $sql = "insert into vote (value,stripid,votetime,userid) values (".$vote_val.",".$strip_id.",'NOW',".$userid.")";
    $res = db_exec($sql);
}

doexit();
