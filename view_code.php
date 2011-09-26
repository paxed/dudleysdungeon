<?php

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

if (!is_admin()) doexit();


$sql = "select *,extract(epoch from striptime) as epoch from strip where stripid=".$strip_id;
$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows != 1) doexit();

$dat = db_get_rowdata($res, 0);

$title = 'View strip code';

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title).' -- '.$title));

print '<center>';
print '<h1>'.$dudley_comic_title.'</h1>';
print get_dudmenu();
print '<div class="view_strip_code">';
print '<p>';

print '<h2>'.$title.'</h2>';

$lines = preg_split("/\n/", $dat['stripdata']);
$strip = parse_comic_strip($lines);
print render_comic_strip($strip, date("M jS, Y", $dat['epoch']));

print '<h3>Code</h3>';

print '<pre class="strip_code">'.htmlentities($dat['stripdata']).'</pre>';

print '</center>';

print '</div>';

dud_html_bottom();
