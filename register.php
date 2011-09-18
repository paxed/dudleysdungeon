<?php

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $passwd = $_POST['password'];
    $passwd_chk = $_POST['password_check'];

    $errorstr = nhquestion_validate($_POST);

    if (strlen($username) > 50) $errorstr .= '<p>Username too long.';
    if (strlen($passwd) < 2) $errorstr .= '<p>Password too short.';
    if ($passwd != $passwd_chk) $errorstr .= '<p>Password doesn\'t match the repeated password.';

    if (!isset($username) || !isset($passwd) ||	($username == "") || ($passwd == "")) {
	$errorstr .= "<p>No username or password set.";
    } else if (!preg_match("/^[0-9a-zA-Z]+$/", $username)) {
	$errorstr .= "<p>Username contains illegal characters.";
    }

    if (!isset($errorstr)) {
	$sql = "select * from duduser where lower(username)='".db_escape_string(strtolower($username))."'";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows > 0) $errorstr .= '<p>Username is already in use.';
    }

    if (!isset($errorstr)) {

	$passwd_crypt = crypt($passwd, substr($passwd, 0, 2));

	$sql = "insert into duduser (username,password,registertime) values (".
	    "'".db_escape_string($username)."', ".
	    "'".db_escape_string($passwd_crypt)."', ".
	    "'NOW'".
	    ")";

	$res = db_exec($sql);

	log_in_user($username, $passwd);

	$added_user = 1;

    }
}


dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title)));

print '<center>'."\n";
print '<h1>Register a username at '.$dudley_comic_title.'</h1>'."\n";

print get_dudmenu();

print '<p><b>Register a new user for commenting and rating '.$dudley_comic_title.'.</b>';
print '<br>Registering here does <em>not</em> create a username for playing on nethack.alt.org.';

print '<form method="POST" action="' . $_SERVER['PHP_SELF'] . '" enctype="multipart/form-data">'."\n";

if (isset($errorstr)) print '<div class="errorstr">'.$errorstr.'</div>';

/*
$logged_in_user_id = $_SESSION['userid'];
if (isset($logged_in_user_id) && isset($_SESSION['username'])) {
    print '<div class="loggedin">Already logged in as <span class="loginname">' . $_SESSION['username'] . '</span>.</div>';
}
*/

if (isset($added_user) && ($added_user == 1)) {
    print '<div class="success">You have registered username "'.$username.'".';
    /*print ' Now, '.mk_url('login.php','Login');*/
    print '</div>';
} else {

    print '<table style="text-align:center;">';
    print '<tr><td>Username</td><td><input name="username" type="text" size="20"></td></tr>'."\n";
    print '<tr><td>Password</td><td><input name="password" type="password" size="20"></td></tr>'."\n";
    print '<tr><td>Repeat Password</td><td><input name="password_check" type="password" size="20"></td></tr>'."\n";
    print '<tr><td colspan="2">'.nhquestion_inputbar().'</td></tr>'."\n";
    print '<tr><td colspan="2"><input type="Submit" value="Submit"></td></tr>'."\n";
    print '</table>';
    print '</form>'."\n";

}

print '</center>'."\n";

dud_html_bottom();
