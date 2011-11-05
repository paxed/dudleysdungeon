<?php

error_reporting(E_ALL);
ini_set('display_errors','On');

if (!file_exists('config.php')) {
    header("Location: install.php");
    exit;
}

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();

is_autologin();

$commenttext = "";

//$userid = logged_in_userid(1);

$mode = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    /* Adding or editing a comment */

    $errorstr = NULL;

    $commenttext = trim($_POST['commenttext']);

    $sanitized = sanitize_comment($commenttext);

    if (strlen($sanitized) < 1) $errorstr .= "<p>Not adding an empty comment.";

    $stripid = $_POST['stripid'];
    if (!isset($stripid) || (!preg_match('/^[0-9]+$/', $stripid))) $errorstr .= "<p>Strip ID is weird.";

    $commentid = (isset($_POST['commentid']) ? $_POST['commentid'] : NULL);
    if (isset($commentid) && (!preg_match('/^[0-9]+$/', $commentid))) $errorstr .= "<p>Comment ID is weird.";

    $sql = "select approved from strip where stripid='".$stripid."' and approved=true";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows != 1) $errorstr .= "<p>That strip is not available.";

    if (!isset($_SESSION['userid'])) {
	$tmpstr = nhquestion_validate($_POST);
	if ($tmpstr) $errorstr .= $tmpstr;
	if (isset($commentid)) $errorstr .= "<p>Anon cannot edit comments.";
    }

    if (!isset($errorstr)) {

	if (isset($commentid)) {
	    if (!is_admin()) $extrasql = " and userid=".$_SESSION['userid'];
	    else $extrasql = "";
	    $sql = "update comment set commenttext='".db_escape_string($commenttext)."',edittime='NOW' where stripid=".$stripid." and commentid=".$commentid.$extrasql;
	} else
	    if (isset($_SESSION['userid'])) {
		$sql = "insert into comment (stripid,commenttime,userid,commenttext) values ('".$stripid."','NOW','".$_SESSION['userid']."','".db_escape_string($commenttext)."')";
	    } else {
		$sql = "insert into comment (stripid,commenttime,userid,commenttext,anon) values ('".$stripid."','NOW',NULL,'".db_escape_string($commenttext)."','true')";
	    }
	$res = db_exec($sql);
	$commenttext = "";
    } else $commenttext = stripslashes($_POST['commenttext']);

    $show_strip_id = $stripid;
}


$do_login = NULL;
$anythat = "any";

$qact = $_SERVER['QUERY_STRING'];
if (strpos($qact, '&')) $qact = substr($qact, 0, strpos($qact, '&'));

if (strlen($qact) > 1 && preg_match('/=$/', $qact)) $qact = substr($qact, 0, -1);

if (preg_match('/login/i', $qact)) {
    header('Location: '.$dudley_root_url.'login.php');
    exit;
} else if (preg_match('/^[0-9]+$/', $qact)) {
    $show_strip_id = $qact;
} else if (preg_match('/^today$/', $qact)) {
    $find_strip_tstamp = time();
} else if (isset($_GET['editcomment'])) {
    $commentid = trim($_GET['editcomment']);
    if (preg_match('/^[0-9]+$/', $commentid)) {
	if (!isset($_SESSION['userid'])) $errorstr .= "<p>Strange username / password combo or you are not logged in.";
	else {
	    $sql = "select stripid,userid,commenttext from comment where commentid=".$commentid;
	    $res = db_exec($sql);
	    $numrows = db_numrows($res);

	    if ($numrows == 1) {
		$dat = db_get_rowdata($res, 0);
		if (($dat['userid'] == $_SESSION['userid']) || is_admin()) {
		    $commenttext = $dat['commenttext'];
		    $commenttext = preg_replace('/\\\\\'/', '\'', $commenttext);
		    $commenttext = preg_replace('/\\\\"/', '"', $commenttext);
		    $show_strip_id = $dat['stripid'];
		    $mode = 'editcomment';
		} else $errorstr .= "<p>Not your comment. Not yours.";
	    } else $errorstr .= "<p>No such comment.";
	}
    }
} else if (isset($_GET['delcomment'])) {
    $commentid = trim($_GET['delcomment']);
    if (preg_match('/^[0-9]+$/', $commentid)) {
	if (!isset($_SESSION['userid'])) $errorstr .= "<p>Strange username / password combo or you are not logged in.";
	else if (!is_admin()) $errorstr .= "<p>Only admin can delete comments.";
	else {
	    $sql = "select stripid from comment where commentid=".$commentid;
	    $res = db_exec($sql);
	    $numrows = db_numrows($res);
	    if ($numrows == 1) {
		$dat = db_get_rowdata($res, 0);
		$show_strip_id = $dat['stripid'];
		$sql = "delete from comment where commentid=".$commentid;
		$res = db_exec($sql);
		$numrows = db_numrows($res);
	    } else $errorstr .= "<p>No such strip to delete?";
	}
    }
}

if (isset($_GET['f'])) {
    if (preg_match('/^([0-9][0-9][0-9][0-9])[-.]([0-9]?[0-9])[-.]([0-9]?[0-9])$/', $_GET['f'], $match)) {
	$find_strip_tstamp = mktime(0,0,0, $match[2], $match[3], $match[1]);
	$anythat = 'that';
	if ($find_strip_tstamp > time()) {
	    $find_strip_tstamp = time();
	    $errorstr .= "<p>You expect to see in to the future?";
	}
    }
}


if (!isset($find_strip_tstamp)) $find_strip_tstamp = time();

if (isset($show_strip_id)) {
    $strip_data = db_get_strip_by_id($show_strip_id);
    $anythat = "that";
} else {
    $strip_data = db_get_strip($find_strip_tstamp);
    if (!isset($strip_data['stripid'])) $strip_data = db_get_strip_prev($find_strip_tstamp);
    if (isset($strip_data['stripid'])) $anythat = "that";
}

$title = strip_tags($dudley_comic_title);
if (isset($strip_data['epoch'])) $title .= " -- ".date("l, j F, Y", $strip_data['epoch']);

dud_html_top(array('css'=>$dudley_css_files,
	       'rss'=>'dudley.rss',
	       'title'=>$title));

print '<center>'."\n";
print '<h1>'.$dudley_comic_title.'</h1>'."\n";
print '<div class="dudley_strip">'."\n";

print '<div class="controls">';

$dudmenu = get_dudmenu();

print '<p>'.$dudmenu;

if (!isset($strip_data['stripid'])) {
    print '</div>';

    if (isset($errorstr)) {
	print '<div class="errorstr">'.$errorstr.'</div>'."\n";
    }

    print '<p><b>Weird, I can\'t find '.$anythat.' Dudley strip'.($anythat == 'any' ? 's' : '').' in the database.</b>'."\n";
    print '<p>Perhaps you should <a href="diydudley.php">create and submit some</a>?'."\n";
} else {

    if (!isset($str_data['stripdata'])) $strip_data = db_get_strip_by_id($strip_data['stripid']);

    $lines = preg_split("/\n/", $strip_data['stripdata']);

    $pagecontrols = get_pagecontrols($strip_data['epoch']);

    //print $pagecontrols;

    print '</div>';

    if (isset($errorstr)) {
	print '<div class="errorstr">'.$errorstr.'</div>'."\n";
    }

    $strip = parse_comic_strip($lines);
    $strip['epoch'] = $strip_data['epoch'];

    print render_comic_strip($strip);

    $news = get_news($strip_data['stripid']);
    if (isset($news) && strlen($news['newstext']) > 0)
	print '<div class="newstext"><h3>News</h3>'.$news['newstext'].'</div>'."\n";

    if (isset($strip_data['viewed'])) {
	$sql = "update strip set viewed=".($strip_data['viewed'] + 1)." where stripid=".$strip_data['stripid'];
    } else {
	$sql = "update strip set viewed=1 where stripid=".$strip_data['stripid'];
	$strip_data['viewed'] = 1;
    }
    $res = db_exec($sql);


    print '<div class="infotools">';
    print '<ul>';
    print '<li class="num_viewed">This strip has been viewed '.
	$strip_data['viewed'].' time'.($strip_data['viewed'] > 1 ? 's': '').'</li>';

    if (isset($_SESSION['userid'])) {
	print '<li class="printlink"><a href="view.php?'.$strip_data['stripid'].'&amp;print=1">Print</a></li>';
    }
    print '</ul>';
    print '</div>';


    print '<hr>';


    print $pagecontrols;


    print '<div class="columnwrapper">';
    print '<div class="maincolumn">';

    print ratings_bars($strip_data['stripid']);

    print '</div>';
    print '</div>';

    print '<div class="rightcolumn">';
    print get_monthtable($strip_data['epoch']);
    print '</div>';


    if (!isset($_SESSION['userid'])) {
	print '<P>Please <a href="login.php">log in</a> or <a href="register.php">register</a> to rate this strip.';
    }

    show_comments($strip_data['stripid']);

    print '<div id="comment">';
    if ($mode == 'editcomment') print '<h3>Edit your comment</h3>';
    else print '<h3>Comment the strip</h3>';
    print '<small>See <a href="about.php">the about-page for allowed formatting</a>.</small>';
    parse_str($_SERVER['QUERY_STRING'], $querystr);
    unset ($querystr['editcomment']);
    unset ($querystr['delcomment']);
    $querystr = remove_null_keys($querystr);
    print '<form method="POST" action="' . phpself_querystr($querystr) . ($mode == 'editcomment' ? '#comment_'.$commentid : '') .'">';
    if (isset($_SESSION['userid'])) {
	print 'Logged in as <b><em>'.$_SESSION['username'].'</em></b><br>';
    } else {
	print '<b>Not logged in.</b><br>';
    }
    print '<input type="hidden" name="stripid" value="'.$strip_data['stripid'].'">';
    print '<textarea name="commenttext" onfocus="document.onkeydown=null;" onblur="document.onkeydown=handler;" cols="80" rows="10">'.htmlentities($commenttext).'</textarea>';
    print '<br>';
    if (!isset($_SESSION['userid'])) {
	print nhquestion_inputbar();
	print '<br>';
    }
    if ($mode == 'editcomment') {
	print '<input type="hidden" name="commentid" value="'.$commentid.'">';
	print '<input type="Submit" value="Update the comment">';
    } else {
	print '<input type="Submit" value="Submit the comment">';
    }
    print '</form>';
    print '</div>';
}

print '</div>';
print '</center>';

print '<div id="bottomlinks">';
print $dudmenu;
print $pagecontrols;
print '</div>';

if (isset($_SESSION['s_keybnav']) && $_SESSION['s_keybnav'] == 'true') {
    print get_keybhandler($strip_data['epoch']);
}

dud_html_bottom();
