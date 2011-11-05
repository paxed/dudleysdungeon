<?php

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

$errorstr = NULL;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $passwd = $_POST['password'];

    if (strlen($username) > 50) $errorstr .= '<p>Username too long.';
    if (strlen($passwd) < 2) $errorstr .= '<p>Password too short.';

    if (!isset($errorstr)) {

	$remember = (isset($_POST['remember']) ? $_POST['remember'] : 0);

	if (!log_in_user($username, $passwd, $remember)) $errorstr .= '<p>Something went wrong when logging in. Wrong username/password?';
	else {
	    header('Location: '.$dudley_root_url);
	    exit;
	}
    }

}

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title)));


print '<center>'."\n";
print '<h1>Login to '.$dudley_comic_title.'</h1>'."\n";

print get_dudmenu();

print '<p>You might want to <a href="register.php">register a new user</a> if you haven\'t already.';


print '<form method="POST" action="' . $_SERVER['PHP_SELF'] . '" enctype="multipart/form-data">'."\n";

if (isset($errorstr)) print '<div class="errorstr">'.$errorstr.'</div>';


if (isset($_SESSION['loggedin']) && isset($_SESSION['username'])) {
    print '<div class="loggedin">Already logged in as <span class="loginname">' . $_SESSION['username'] . '</span>.</div>';
}


print '<table style="text-align:center;">';
print '<tr><td>Username</td><td><input name="username" type="text" size="20"></td></tr>'."\n";
print '<tr><td>Password</td><td><input name="password" type="password" size="20"></td></tr>'."\n";
print '<tr><td>Remember me</td><td align="left"><input name="remember" type="checkbox"></td></tr>'."\n";
print '<tr><td colspan="2"><input type="Submit" value="Submit"></td></tr>'."\n";
print '</table>';
print '</form>'."\n";


print '</center>'."\n";

dud_html_bottom();
