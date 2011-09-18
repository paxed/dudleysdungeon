<?php

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

$logged_userid = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);
$do_print = NULL;

$qact = $_SERVER['QUERY_STRING'];
if (strpos($qact, '&')) $qact = substr($qact, 0, strpos($qact, '&'));

if (strlen($qact) > 1 && preg_match('/=$/', $qact)) $qact = substr($qact, 0, -1);

if (preg_match('/^[0-9]+$/', $qact)) $show_stripid = $qact;

if (!isset($show_stripid)) {
    header('Location: '.$dudley_root_url);
    exit;
}

if (!isset($logged_userid)) {
    header('Location: '.$dudley_root_url);
    exit;
}

parse_str($_SERVER['QUERY_STRING'], $querystr);
if (isset($querystr['print'])) $do_print = 1;

$sql = "select *,extract(epoch from striptime) as epoch from strip where stripid='".$show_stripid."'";
if (!is_admin()) {
    $sql .= " and approved=true and striptime<='NOW'";
    //$sql .= " and authorid=".$logged_userid;
}

$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows > 0) {
    $strip_data = db_get_rowdata($res, 0);
} else {
    header('Location: '.$dudley_root_url);
    exit;
}

/*
if (($strip_data['authorid'] != $logged_userid) && !is_admin()) {
    header('Location: '.$dudley_root_url);
    exit;
}
*/

dud_html_top(array('notop'=>$do_print, 'css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title)));


print '<center>'."\n";
print '<h1>'.$dudley_comic_title.'</h1>'."\n";
$dudmenu = get_dudmenu();

if (!isset($do_print)) print $dudmenu;

$lines = preg_split("/\n/", $strip_data['stripdata']);
$strip = parse_comic_strip($lines);
$strip['epoch'] = $strip_data['epoch'];

print render_comic_strip($strip,date("M jS, Y", $strip['epoch']));

print '</center>'."\n";

dud_html_bottom(array('notop'=>$do_print));
