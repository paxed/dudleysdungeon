<?php

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

$odd = 0;

parse_str($_SERVER['QUERY_STRING'], $querystr);
$querystr = remove_null_keys($querystr);

$logged_userid = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);

$qact = $_SERVER['QUERY_STRING'];
if (strpos($qact, '&')) $qact = substr($qact, 0, strpos($qact, '&'));

if (strlen($qact) > 1 && preg_match('/=$/', $qact)) $qact = substr($qact, 0, -1);

if (preg_match('/^[0-9]+$/', $qact)) $show_userid = $qact;

if (!isset($show_userid) && $logged_userid) $show_userid = $logged_userid;

if (!isset($show_userid)) {
    header('Location: '.$dudley_root_url);
    exit;
}

$sql = "select *,date_trunc('second',registertime) as registertime,date_trunc('second',lastlogin) as lastlogin from duduser where userid=".$show_userid;
$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows == 1) $dat = db_get_rowdata($res, 0);


if (isset($dat['username'])) {
    if (preg_match('/[sS]$/', $dat['username'])) $d = $dat['username']."' info";
    else $d = $dat['username']."'s info";
} else $d = "User info";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if ($logged_userid != $show_userid) {
	header('Location: '.$dudley_root_url);
	exit;
    }

    if ($_POST['action'] == 'Change') {
	/* changing settings */

	$sql = "";
	$sql .= 'update duduser set s_keybnav='.(($_POST['s_keybnav'] == 'on') ? 'true' : 'false').' where userid='.$logged_userid.';';

	$res = db_exec($sql);

	if ($_POST['s_keybnav'] == 'on') $_SESSION['s_keybnav'] = 'true'; else unset($_SESSION['s_keybnav']);
    }
}

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title).' -- '.$d));


function strip_author_loggedin($did)
{
    $logged_userid = $_SESSION['userid'];
    $sql = "select authorid from strip where stripid='".$did."' and approved=false";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	if ($dat['authorid'] == $logged_userid) return 1;
    }
    return 0;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($_POST['action'] == 'Delete selected strips') {
	$delstrips = $_POST['delstripid'];
	if (count($delstrips) > 0) {
	    foreach ($delstrips as $delid) {
		$did = db_escape_string($delid);

		if (strip_author_loggedin($did) != 1) continue;

		$sql = "delete from news where stripid=".$did.";";
		$sql .= " delete from strip where stripid=".$did.";";
		$sql .= " delete from comment where stripid=".$did.";";
		$sql .= " delete from vote where stripid=".$did.";";

		$res = db_exec($sql);
		$nrs = db_numrows($res);
		if ($stripid == $delid) unset($stripid);
	    }
	}
    }
}

print '<center>'."\n";
print '<h1>'.$dudley_comic_title.'</h1>'."\n";
$dudmenu = get_dudmenu();

print $dudmenu;

print '<h2>View user info</h2>';

if ($numrows < 1) {
    print '<div class="errorstr">No user with that ID</div>'."\n";
} else if ($numrows > 1) {
    print '<div class="errorstr">What??? database is wonky!</div>'."\n";
} else {

    print '<table class="userinfo">';

    print '<tr><td>User Name</td><td>'.$dat['username'].'</td></tr>';

    print '<tr><td>Registered</td><td>'.$dat['registertime'].'</td></tr>';
    print '<tr><td>Last use</td><td>'.$dat['lastlogin'].'</td></tr>';


    $sql = "select count(*) as num_comments from comment where userid=".$show_userid;
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    print '<tr><td># of comments</td><td>';
    if ($numrows == 1) {
	$dat = db_get_rowdata($res, 0);
	$num_comments = $dat['num_comments'];
	print $num_comments;
    } else print 'Not commented yet.';
    print '</td></tr>';

    if ($num_comments > 0) {

	$sql = "select commentid,stripid,date_trunc('second',commenttime) as commenttime from comment where userid=".$show_userid." order by commenttime asc limit 1 ";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	print '<tr><td>First comment</td><td>';
	if ($numrows == 1) {
	    $dat = db_get_rowdata($res, 0);
	    print mk_url($dudley_root_url.'?'.$dat['stripid'].'#comment_'.$dat['commentid'], $dat['commenttime']);
	} else print 'Not commented yet.';
	print '</td></tr>';

	$sql = "select commentid,stripid,date_trunc('second',commenttime) as commenttime from comment where userid=".$show_userid." order by commenttime desc limit 1 ";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	print '<tr><td>Latest comment</td><td>';
	if ($numrows == 1) {
	    $dat = db_get_rowdata($res, 0);
	    print mk_url($dudley_root_url.'?'.$dat['stripid'].'#comment_'.$dat['commentid'], $dat['commenttime']);
	} else print 'Not commented yet.';
	print '</td></tr>';

    }

    $sql = "select count(*) as num_votes from vote where userid=".$show_userid;
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    print '<tr><td># of votes</td><td>';
    if ($numrows == 1) {
	$dat = db_get_rowdata($res, 0);
	$num_votes = $dat['num_votes'];
	print $num_votes;
    } else print 'No votes cast yet.';
    print '</td></tr>';

    print '</table>';


    if ($logged_userid == $show_userid) {

	print '<form method="POST" action="'.phpself_querystr($querystr).'">'."\n";

	print '<table class="usersettings">'."\n";
	print '<caption>Your settings</caption>'."\n";

	print '<tr><td class="nam">Cursor navigation</td><td><input name="s_keybnav" type="checkbox"'.
	    (($_SESSION['s_keybnav'] == 'true') ? " checked" : "").'></td>';
	print '<td class="explain">If set, you can use cursor right and left to move to next and previous strip on the front page.</td></tr>'."\n";
	print '<tr><td class="submit" colspan="3"><input type="Submit" value="Change" name="action"></td></tr>'."\n";

	print '</table>'."\n";

	print '</form>'."\n";

    }


    if (($logged_userid == $show_userid) || is_admin()) {

	print '<h3>Your comic strips</h3>';

	$sql = "select stripid,approved,date_trunc('second',submittime) as dtime,author,authorid,date_trunc('second',age(striptime,now())) as pubdate, extract(epoch from striptime) as epoch from strip where authorid=".$show_userid;
	//if (!isset($show_all_strips)) $sql .= " where (approved=false or striptime>now()) ";
	$sql .= " order by striptime asc, submittime asc";
	$res = db_exec($sql);
	$numrows = db_numrows($res);

	if ($numrows > 0) {

	    $can_delete_strips = 0;

	    print '<form method="POST" action="' . phpself_querystr($querystr) . '">';

	    print '<table class="userstrips">';
	    print '<tr>';
	    print '<th></th><th>ID #</th><th>Submitted on</th><th>Scheduled</th><th>&nbsp;</th>';
	    print '</tr>';
	    for ($r = 0; $r < $numrows; $r++) {
		$dat = db_get_rowdata($res, $r);

		print '<tr class="'.odd_even($odd++).'">';
		print '<td>'.($r+1).'</td>';
		print '<td>'.mk_url($dudley_root_url.((($dat['epoch'] < time()) && ($dat['approved'] == 't')) ? '' : 'view.php').'?'.$dat['stripid'], $dat['stripid']).'</td>';
		print '<td>'.$dat['dtime'].'</td>';
		print '<td>'.(($dat['approved'] == 't') ? $dat['pubdate'] : "not scheduled").'</td>';
		print '<td>';
		print mk_url('download_strip.php?id='.$dat['stripid'],'Download');
		print '&nbsp;-&nbsp;';
		if ($dat['approved'] == 't') print 'Edit';
		else print mk_url('diydudley.php?edit='.$dat['stripid'],'Edit');
		if ($dat['approved'] == 't') { }
		else {
		    print '&nbsp;-&nbsp;';
		    print '<input type="checkbox" name="delstripid[]" value="'.$dat['stripid'].'">';
		    $can_delete_strips++;
		}
		print '</td>';

		print '</tr>'."\n";

	    }

	    print '</table>';
	    if ($can_delete_strips > 0) {
		print '<input type="Submit" value="Delete selected strips" name="action">';
	    }
	    print '</form>';

	} else print '<p>You haven\'t '.mk_url('diydudley.php', 'submitted').' any strips yet.';

	print '<p>'.user_voting_histogram($show_userid);

    } else print '<p>'.mk_url('login.php','Login').' to see comic strips you\'ve submitted.';

}


print '</center>'."\n";

dud_html_bottom();
