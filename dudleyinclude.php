<?php

error_reporting(E_ALL);
ini_set('display_errors','On');

include_once "utils.php";
require_once "config.php";

$dudley_comic_title = "Dudley's <span style='font-size:small'>(New, Improved)</span> Dungeon";

$dudley_root_url = 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['PHP_SELF']).'/';

$dudley_login_str = 'Dudley\'s Dungeon comic strip';

$rating_names = array('poor', 'mediocre', 'fair', 'good', 'excellent');

$allowed_html_tags = '<b><i><u><em><code><hr><pre><del><tt><br><p>';
$allowed_html_tags_regex = '('.substr(preg_replace('/></', '|', $allowed_html_tags), 1, -1).')';

$dudley_css_files = array($dudley_root_url.'panels.css',
			  $dudley_root_url.'dudley.css');


$nethack_questions = array(
                           array('char'=>'+','text'=>'a spellbook'),
                           array('char'=>'*','text'=>'a gem or a rock'),
                           array('char'=>'?','text'=>'a scroll'),
                           array('char'=>'!','text'=>'a potion'),
                           array('char'=>'%','text'=>'something edible'),
                           array('char'=>'=','text'=>'a ring'),
                           array('char'=>'|','text'=>'a grave'),
                           array('char'=>'#','text'=>'a kitchen sink'),
                           array('char'=>'^','text'=>'a trap'),
                           /*array('char'=>')','text'=>'a weapon'),*/
                           /*array('char'=>'[','text'=>'a piece of armor'),*/
                           array('char'=>'/','text'=>'a wand'),
                           array('char'=>'_','text'=>'an altar'),
                           array('char'=>'{','text'=>'a fountain'),
                           array('char'=>'o','text'=>'a goblin'),
                           array('char'=>'h','text'=>'a dwarf'),
                           array('char'=>'e','text'=>'a floating eye'),
                           array('char'=>':','text'=>'a lizard'),
                           array('char'=>'f','text'=>'a kitten'),
			   );


function is_admin()
{
    global $DUDLEY_secret_salt;
    if (!isset($_SESSION['loggedin'])) return FALSE;
    if (!isset($_COOKIE['uid'])) return FALSE;
    if (!isset($_COOKIE['username'])) return FALSE;
    if (!isset($_COOKIE['passwd'])) return FALSE;

    $username = $_COOKIE['username'];
    $uid = $_COOKIE['uid'];
    $passwd = $_COOKIE['passwd'];

    $sql = "select * from duduser where lower(username)='".db_escape_string(strtolower($username))."'".
           " and userid='".db_escape_string($uid)."'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows == 1) {
	    $dat = db_get_rowdata($res, 0);
	    $pw = $dat['password'];
	    $pw = md5($pw.$DUDLEY_secret_salt);

	    if (($pw == $passwd) && ($dat['userlevel'] == 1)) {
		return TRUE;
	    }
    }
    return FALSE;
}


function mk_cookie($name, $data = null)
{
    if ($data) {
	setcookie($name, $data, time()+3600*24*365, '/');
	$_COOKIE[$name] = $data;
    } else {
	setcookie($name, '', time()-3600, '/');
	unset($_COOKIE[$name]);
    }
}

function is_autologin()
{
    global $DUDLEY_secret_salt;
    if (isset($_SESSION['loggedin'])) return true;
    if (isset($_COOKIE['username']) &&
	isset($_COOKIE['passwd']) &&
	isset($_COOKIE['uid'])) {

	$username = $_COOKIE['username'];
	$passwd = $_COOKIE['passwd'];
	$uid = $_COOKIE['uid'];

	$sql = "select *,extract(epoch from lastlogin) as lastloginepoch from duduser where lower(username)='".db_escape_string(strtolower($username))."'".
	    " and userid='".db_escape_string($uid)."'";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows == 1) {
	    $dat = db_get_rowdata($res, 0);
	    $pw = $dat['password'];
	    $pw = md5($pw.$DUDLEY_secret_salt);

	    if ($pw == $passwd) {
		$_SESSION['username'] = $dat['username'];
		$_SESSION['passwd'] = $dat['password'];
		$_SESSION['loggedin'] = 1;
		$_SESSION['userid'] = $dat['userid'];
		$_SESSION['lastlogin'] = $dat['lastloginepoch'];
		$_SESSION['s_keybnav'] = $dat['s_keybnav'];
		$_SESSION['userlevel'] = $dat['userlevel'];

		$sql = "update duduser set lastlogin='NOW' where userid=".$dat['userid'];
		$res = db_exec($sql);
		return true;
	    }
	}
    }
    return false;
}

function url_noindex($url)
{
    $ret = $_SERVER['PHP_SELF'];
    $ret = preg_replace('/\/index.php$/', '/', $ret);
    $ret .= $url;
    return $ret;
}

function get_dudmenu()
{
    global $dudley_root_url;
    $str = '<div class="menu">';
    $str .= '<ul>';
    $loggedin = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);
    $str .= '<li>'.mk_url($dudley_root_url.'?today','Home');
    if (!isset($loggedin)) {
	$str .= '<li>'.mk_url('login.php','Login');
	$str .= '<li>'.mk_url('register.php','New user');
    } else {
	if (preg_match('/[sS]$/', $_SESSION['username'])) $d = "' info";
	else $d = "'s info";
	$str .= '<li>'.mk_url('duduser.php',$_SESSION['username'].$d);
	$str .= '<li>'.mk_url('logout.php','Logout');
    }
    $str .= '<li>'.mk_url('diydudley.php', 'DIY Dudley');
    $str .= '<li>'.mk_url('submit.php', 'Submit a new comic');
    if (is_admin()) {
	$str .= '<li>'.mk_url('queued.php', 'Queued comics');
    }
    $str .= '<li>'.mk_url('search.php', 'Search');
    $str .= '<li>'.mk_url('stats.php', 'Statistics');
    $str .= '<li>'.mk_url('about.php', 'About this comic');
    $str .= '</ul>';
    $str .= '</div>';
    return $str;
}


function nhquestion_inputbar()
{
    global $nethack_questions;
    $qn = rand(0,count($nethack_questions)-1);
    $ret = '<span class="nhquestion">';
    $ret .= 'You will need to answer the following question correctly:<br>';
    $ret .= 'What symbol represents '.$nethack_questions[$qn]['text'].'? ';
    $ret .= '<input type="text" name="nhquestionanswer" size="1" maxlength="1">';
    $ret .= '<input name="nhquestionid" type="hidden" value="'.$qn.'">';
    $ret .= '</span>';
    return $ret;
}

function nhquestion_validate($data)
{
    global $nethack_questions;

    $qid = $data['nhquestionid'];
    $qanswer = $data['nhquestionanswer'];

    if (strlen($qanswer) == 1) {
	if (!preg_match('/^[0-9]+$/',$qid) || ($qid > count($nethack_questions)-1))
	    $errstr = 'Wrong question id.<br>';
	if ($qanswer != $nethack_questions[$qid]['char'])
	    $errstr = 'Wrong answer to the question.<br>';
    } else $errstr = 'Wrong answer to the question.<br>';
    return $errstr;
}

function get_keybhandler($timestamp)
{
    $prev = db_get_strip_prev($timestamp);
    $next = db_get_strip_next($timestamp);

    $str = '<script type="text/javascript"><!--';
    $str .= "\nfunction handler(e) {
  var key;
  if (document.all) {
    key = event.keyCode;
  } else {
    key = e.which;
  }\n";

    if ($prev['stripid']) { $str .= "  if (key==37) window.location='".url_noindex('?'.$prev['stripid'])."';\n"; }
    if ($next['stripid']) { $str .= "  if (key==39) window.location='".url_noindex('?'.$next['stripid'])."';\n"; }

    $str .= '
}
document.onkeydown=handler;
//-->
</script>
';
    return $str;
}


function get_pagecontrols($timestamp)
{
    $prev = db_get_strip_prev($timestamp);
    $next = db_get_strip_next($timestamp);
    $first = db_get_strip_first($timestamp);
    $latest = db_get_strip_latest($timestamp);
    $rnd = db_get_strip_random($timestamp);

    $str = '<div class="pagecontrol">'."\n";
    $str .= '<ul>'."\n";
    $str .= '<li class="first">';
    if ($first['stripid']) $str .= mk_url(url_noindex('?'.$first['stripid']),'First');
    else $str .= 'First';
    $str .= "\n";

    $str .= '<li class="prev">';
    if ($prev['stripid']) $str .= mk_url(url_noindex('?'.$prev['stripid']),'Previous');
    else $str .= 'Previous';
    $str .= "\n";

    $str .= '<li class="random">';
    if ($rnd) $str .= mk_url(url_noindex('?'.$rnd['stripid']),'Random');
    else $str .= 'Random';
    $str .= "\n";

    $str .= '<li class="next">';
    if ($next) $str .= mk_url(url_noindex('?'.$next['stripid']),'Next');
    else $str .= 'Next';
    $str .= "\n";

    $str .= '<li class="newest">';
    if ($latest['stripid']) $str .= mk_url(url_noindex('?'.$latest['stripid']),'Newest');
    else $str .= 'Newest';
    $str .= "\n";

    $str .= '</ul>'."\n";
    $str .= '</div>'."\n";
    return $str;
}

function sanitize_comment($str)
{
    global $allowed_html_tags, $allowed_html_tags_regex;

    $str = preg_replace('/\r/', '', $str);

    $str = preg_replace('/\n\n/', '<p>', $str);
    $str = preg_replace('/\n/', '<br>', $str);
    $str = preg_replace('/\\\\\'/', '\'', $str);
    $str = preg_replace('/\\\\"/', '"', $str);

    /* [code]...[/code] */
    $str = preg_replace('/\[CODE\](.+)?\[\/CODE\]/i', '<pre>\1</pre>', $str);

    /* handle <pre> ... </pre> -blocks */
	$newstr = "";
	do {

	    $ok = 1;

	    $start_pos = strpos($str, '<pre>');
	    $end_pos = strpos($str, '</pre>');

	    if ($start_pos !== false && $end_pos !== false && ($start_pos+5 < $end_pos)) {
		$newstr .= substr($str, 0, $start_pos+5);

		$tmpstr = substr($str, $start_pos+5, ($end_pos-$start_pos-5));

		$str = substr($str, $end_pos+6);

		$tmpstr = preg_replace('/<p>/m', "\n\n", $tmpstr);
		$tmpstr = preg_replace('/<br>/m', "\n", $tmpstr);
		$tmpstr = preg_replace('/&/m', '&amp;', $tmpstr);
		$tmpstr = preg_replace('/>/m', '&gt;', $tmpstr);
		$tmpstr = preg_replace('/</m', '&lt;', $tmpstr);

		$newstr .= $tmpstr.'</pre>';

		$ok = 0;
	    }

	} while (!$ok);
	$str = $newstr.$str;


    $str = strip_tags($str, $allowed_html_tags);
    $str = preg_replace('/<'.$allowed_html_tags_regex.'\s.*?>/i', '<\1>', $str);

    $str = preg_replace('/((http|ftp):\/\/([\w\d\-]+)(\.[\w\d\-]+){1,})([\/\?\w\d\.=&+%~_\-#;:@]+)?/','<A href="\\1\\5">\\1\\5</A>',$str);

    /* bold */
    $str = preg_replace('/\[B\](.+)?\[\/B\]/i', '<b>\1</b>', $str);
    $str = preg_replace('/\*([^\s]+)?\*/', '<b>\1</b>', $str);
    /* italics */
    $str = preg_replace('/\[I\](.+)?\[\/I\]/i', '<i>\1</i>', $str);
    /* underline */
    $str = preg_replace('/\[U\](.+)?\[\/U\]/i', '<u>\1</u>', $str);
    /*$str = preg_replace('/_([^\s]+)?_/', '<u>\1</u>', $str);*/ /* This messes up URLs with underscores */
    /* emphasis */
    $str = preg_replace('/\[EM\](.+)?\[\/EM\]/i', '<em>\1</em>', $str);

    $str .= add_ending_tags($str, '<b>', '</b>');
    $str .= add_ending_tags($str, '<i>', '</i>');
    $str .= add_ending_tags($str, '<u>', '</u>');
    $str .= add_ending_tags($str, '<em>', '</em>');

    return $str;
}



function add_ending_tags($str, $begin_tag, $end_tag)
{
    $tmp = substr_count($str, $begin_tag) - substr_count($str, $end_tag);
    $s = "";
    while ($tmp-- > 0) { $s .= $end_tag; }
    return $s;
}


function get_monthtable($timestamp=null)
{
    global $dudley_root_url;
    if (!isset($timestamp)) $timestamp = time();
    $year = date("Y", $timestamp);
    $month = date("n", $timestamp);
    $currday = date("j", $timestamp);

    if ($year == date("Y") && $month == date("n"))
	$today = date("j");

    $date = mktime(12, 0, 0, $month, 1, $year);
    $daysInMonth = date("t", $date);
    $offset = date("w", $date);
    $rows = 1;
    $sunday_first = 0; // or 1
    $daynames = array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');


    $daydata = array();

    $sql = "select stripid,date_part('day', striptime) as stripday from strip where date_trunc('month',striptime)='".date("Y-m-1 00:00:00.0",$timestamp)."' and approved=true and striptime < 'NOW' order by striptime asc";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    for ($i = 0; $i < $numrows; $i++) {
	$dat = db_get_rowdata($res, $i);
	$daydata[$dat['stripday']] = $dat;
    }

    $prevstamp = mktime(0,0,0, $month, 1, $year);
    $prev_strip = db_get_strip_prev($prevstamp);
    $prev_strip = db_get_strip_by_id($prev_strip['stripid']);
    if (isset($prev_strip['epoch'])) {
	$prev_strip_str = mk_url('?f='.date("Y.m.d", $prev_strip['epoch']),'&lt;');
    } else $prev_strip_str = '';


    $nextstamp = mktime(0,0,0, $month, $daysInMonth, $year);
    $next_strip = db_get_strip_next($nextstamp);
    $next_strip = db_get_strip_by_id($next_strip['stripid']);
    if (isset($next_strip['epoch'])) {
	$next_strip_str = mk_url('?f='.date("Y.m.d", $next_strip['epoch']),'&gt;');
    } else $next_strip_str = '';


    $str = '<div class="monthtable">'."\n";
    $str .= '<table>'."\n";
    $str .= '<tr class="year">';
    $str .= '<td class="prevmstrip">'.$prev_strip_str.'</td>';
    $str .= '<td colspan="5"><span class="month">'.date("F", $timestamp).'</span> <span class="year">'.$year.'</span></td>';
    $str .= '<td class="nextmstrip">'.$next_strip_str.'</td>';
    $str .= '</tr>'."\n";

    $offset = ($offset + ($sunday_first ? 0 : 6)) % 7;

    $str .= '<tr class="daynames">';
    for ($i = 0; $i < count($daynames); $i++)
	$str .= '<th>'.$daynames[($i + ($sunday_first ? 0 : 1)) % 7].'</th>';
    $str .= "</tr>\n";

    $str .= "<tr>";
    for ($i = 1; $i <= $offset; $i++) $str .= "<td class='noday'>&nbsp;</td>";
    for ($day = 1; $day <= $daysInMonth; $day++) {
	if (($day + $offset - 1) % 7 == 0 && $day != 1) {
	    $str .= "</tr>\n<tr>";
	    $rows++;
	}
	$epoch = mktime(0,0,0, $month, $day, $year);
	$dayclass = "";
	if ($day == $currday) $dayclass .= ' current';
	else if (isset($today) && $day == $today) $dayclass .= ' today';
	else $dayclass .= ' day';
	if (isset($_SESSION['lastlogin']) && ($epoch > $_SESSION['lastlogin'])) $dayclass .= ' newday';
	$str .= '<td class="'.ltrim($dayclass).'">';
	if (isset($daydata[$day])) $str .= mk_url($dudley_root_url.'?f='.$year.'.'.$month.'.'.$day, $day);
	else $str .= $day;
	$str .= '</td>';
    }
    while (($day + $offset) <= $rows * 7) {
	$str .= "<td class='noday'>&nbsp;</td>";
	$day++;
    }
    $str .= "</tr>\n";
    $str .= "</table>\n</div>\n";
    return $str;
}


function show_comments($strip_id)
{

    //        $sql = "select b.username,b.userid,a.*,extract(epoch from a.commenttime) as epoch,extract(epoch from a.edittime) as editepoch from comment as a,duduser as b where a.stripid='".$strip_id."' and a.userid=b.userid order by a.commenttime asc";

        $sql = "select b.username,b.userid,a.*,extract(epoch from a.commenttime) as epoch,extract(epoch from a.edittime) as editepoch from (select * from comment where stripid='".$strip_id."') as a left join duduser as b on a.userid=b.userid order by a.commenttime asc";

    $res = db_exec($sql);
    $numrows = db_numrows($res);
    print '<center>'."\n";
    print '<div class="comments" id="comments">'."\n";
    if ($numrows > 0) {
	print '<h3>'.$numrows.' Comment'.(($numrows > 1) ? 's' : '').'</h3>'."\n";
	print '<table>'."\n";
	for ($r = 0; $r < $numrows; $r++) {
	    $dat = db_get_rowdata($res, $r);
	    if (isset($_SESSION['lastlogin']) && ($dat['epoch'] > $_SESSION['lastlogin'])) {
		print '<tr class="new_commenthead" id="comment_'.$dat['commentid'].'">'."\n";
	    } else {
		print '<tr class="commenthead" id="comment_'.$dat['commentid'].'">'."\n";
	    }
	    $username = $dat['username'];
	    print '<th class="commentnum">#'.($r+1).'</th>'."\n";
	    if ($dat['userid']) {
		print '<th class="username">'.mk_url('duduser.php?'.$dat['userid'],$username).'</th>'."\n";
	    } else {
		print '<th class="username">Anonymous</th>'."\n";
	    }
	    print '<th class="posteddate">'.date("D, j M Y H:i:s", $dat['epoch']).'</th>'."\n";
	    print '</tr>'."\n";
	    if (($dat['userid'] && (isset($_SESSION['userid']) && ($dat['userid'] == $_SESSION['userid']))) || is_admin()) {
		print '<tr class="tools">'."\n";
		parse_str($_SERVER['QUERY_STRING'], $querystr);
		$querystr = remove_null_keys($querystr);
		$querystr['editcomment'] = $dat['commentid'];
		unset($querystr['delcomment']);
		print '<td class="editcomment" colspan="3">';
		print mk_url(phpself_querystr($querystr).'#comment','Edit comment');
		if (is_admin()) {
		    $querystr['delcomment'] = $dat['commentid'];
		    unset($querystr['editcomment']);
		    print ' <A href="'.phpself_querystr($querystr).'#comment" onclick="return confirm(\'Delete comment by '.$username.'?\')">Delete</A>';
		}
		print '</td>'."\n";
		print '</tr>'."\n";
	    }
	    print '<tr class="commentbody">'."\n";
	    print '<td colspan="3" class="commenttext">'.sanitize_comment($dat['commenttext']);
	    if (isset($dat['edittime'])) {
		print "\n".'<div class="lastedittime">Last edited: '.date("D, j M Y H:i:s", $dat['editepoch']).'</div>'."\n";
	    }
	    print '<p></td>'."\n";
	    print '</tr>'."\n";
	}
	print '</table>'."\n";
    } else print '<h3>No comments</h3>'."\n";
    print '</div>'."\n";
    print '</center>'."\n";
}


function db_get_strip_by_id($id=null)
{
    if (!isset($id)) return NULL;

    $sql = "select *,extract(epoch from striptime) as epoch from strip where stripid='".$id."' and approved=true and striptime < 'NOW'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}

function db_get_strip_random($tstamp=null)
{
    if (!isset($tstamp)) $tstamp = time();

    $date = date("Y-m-d 00:00:00", $tstamp);

    $sql = "select *,extract(epoch from striptime) as epoch from strip where date_trunc('day',striptime)<>'".$date."' and approved=true and striptime < 'NOW' order by random() limit 1";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}


function db_get_strip($tstamp=null)
{
    if (!isset($tstamp)) $tstamp = time();

    $date = date("Y-m-d 00:00:00", $tstamp);

    $sql = "select *,extract(epoch from striptime) as epoch from strip where date_trunc('day',striptime)='".$date."' and approved=true and striptime < 'NOW'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}

function db_get_strip_first($tstamp=null)
{
    if (!isset($tstamp)) $tstamp = time();
    $sql = "select stripid from strip where extract(epoch from striptime)<'".($tstamp-1)."' and approved=true and striptime < 'NOW' order by striptime asc limit 1";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}

function db_get_strip_prev($tstamp=null)
{
    if (!isset($tstamp)) $tstamp = time();

    $sqlstr = "select stripid from strip where extract(epoch from striptime)<'".($tstamp-1)."' and approved=true and striptime<'NOW' order by striptime desc limit 1";

    $res = db_exec($sqlstr);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}

function db_get_strip_latest($tstamp=null, $admin=null)
{
    if (!isset($tstamp)) $tstamp = time();
    $extrasql = "";
    if (!isset($admin)) $extrasql = " and striptime<'NOW'";
    $sql = "select stripid from strip where extract(epoch from striptime)>'".($tstamp+1)."' and approved=true ".$extrasql." order by striptime desc limit 1";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}

function db_get_strip_next($tstamp=null)
{
    if (!isset($tstamp)) $tstamp = time();

    $sqlstr = "select stripid from strip where extract(epoch from striptime)>'".($tstamp+1)."' and approved=true and striptime<'NOW' order by striptime asc limit 1";

    $res = db_exec($sqlstr);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	    $dat = db_get_rowdata($res, 0);
	    return $dat;
    }
    return NULL;
}

function db_get_strip_ratings($stripid)
{
    $sqlstr = "select value,count(*) as nvotes from vote where stripid=".$stripid." group by value order by value asc";

    $retval = array(0,0,0,0,0);

    $res = db_exec($sqlstr);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	for ($i = 0; $i < $numrows; $i++) {
	    $dat = db_get_rowdata($res, $i);
	    $retval[$dat['value']] = $dat['nvotes'];
	}
    }
    return $retval;
}

function db_get_has_user_voted($stripid, $userid = NULL)
{
    if (!isset($userid)) return NULL;

    $sqlstr = "select count(*) as nvotes from vote where stripid='".$stripid."' and userid='".$userid."'";
    $res = db_exec($sqlstr);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
    }
    if (isset($dat) && isset($dat['nvotes']))
	return $dat['nvotes'];
    else return NULL;
}


function parse_comic_strip($lines)
{
    $panels = array();
    $strip_wid = 3;
    $strip_hei = 1;
    $curr_panel = -1;
    $in_map = 0;
    $x = 0;
    $y = 0;

    $panels['author'] = "Unknown";
    $panels['strip_wid'] = $strip_wid;
    $panels['strip_hei'] = $strip_hei;

    foreach ($lines as $line) {
	if (!$in_map)
	    $line = trim($line);
	if ($in_map) {
	    if (preg_match('/^ENDMAP$/', trim($line))) {
		$in_map = 0;
		$y = 0;
	    } else {
		for ($x = 0; $x < $panels[$curr_panel]['wid']; $x++) {
		    $panels[$curr_panel]['panel'][$x][$y]['chr'] = substr($line, $x, 1);
		}
		$y++;
	    }
	} else if (preg_match('/^AUTHOR:(.+)$/', $line, $match)) {
	    $panels['author'] = $match[1];
	} else if (preg_match('/^PANELS: *([0-9]+) *, *([0-9]+)$/', $line, $match)) {
	    $panels['strip_wid'] = $match[1];
	    $panels['strip_hei'] = $match[2];
	} else if (preg_match('/^SETCOLOR: *\(([0-9]+) *, *([0-9]+)\) *, *\'(.)\' +is +"(.+)"$/', $line, $match)) {
	    $cx = $match[1];
	    $cy = $match[2];
	    $chr = $match[3];
	    $clr = $match[4];
	    $panels[$curr_panel]['panel'][$cx][$cy]['fg'] = $clr;
	} else if (preg_match('/^SETCOLOR: *\(([0-9]+) *, *([0-9]+)\) *, *\"(.+)"$/', $line, $match)) {
	    $cx = $match[1];
	    $cy = $match[2];
	    $clr = $match[3];
	    $panels[$curr_panel]['panel'][$cx][$cy]['fg'] = $clr;
	} else if (preg_match('/^SETCHAR: *\(([0-9]+) *, *([0-9]+)\) *, *([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])$/', $line, $match)) {
	    $cx = $match[1];
	    $cy = $match[2];
	    $chr = '&#'.$match[3].';';
	    $panels[$curr_panel]['panel'][$cx][$cy]['chr'] = $chr;
	} else if (preg_match('/^SETATTR: *\(([0-9]+) *, *([0-9]+)\) *, *(.+)$/', $line, $match)) {
	    $cx = $match[1];
	    $cy = $match[2];
	    $attrs = explode("&", $match[3]);
	    foreach ($attrs as $attr) {
		$attr = trim($attr);
		switch ($attr) {
		default: break;
		case 'bold': $panels[$curr_panel]['panel'][$cx][$cy]['bold'] = 1; break;
		case 'reverse': $panels[$curr_panel]['panel'][$cx][$cy]['rev'] = 1; break;
		case 'ul':
		case 'underline': $panels[$curr_panel]['panel'][$cx][$cy]['ul'] = 1; break;
		}
	    }
	} else if (preg_match('/^SETCOLORS: *All +\'(.)\' +are +"(.+)"$/', $line, $match)) {
	    $chr = $match[1];
	    $clr = $match[2];
	    for ($cy = 0; $cy < $panels[$curr_panel]['hei']; $cy++)
		for ($cx = 0; $cx < $panels[$curr_panel]['wid']; $cx++) {
		    if ($panels[$curr_panel]['panel'][$cx][$cy]['chr'] == $chr) {
			$panels[$curr_panel]['panel'][$cx][$cy]['fg'] = $clr;
		    }
		}
	} else if (preg_match('/^MAP: *([0-9]+) *, *([0-9]+)$/', $line, $match)) {
	    $curr_panel++;
	    $panels[$curr_panel]['wid'] = $match[1];
	    $panels[$curr_panel]['hei'] = $match[2];
	    $panels[$curr_panel]['cursor_x'] = -1;
	    $panels[$curr_panel]['cursor_y'] = -1;
	    $in_map = 1;
	} else if (preg_match('/^CURSOR: *([0-9]+) *, *([0-9]+)$/', $line, $match)) {
	    $panels[$curr_panel]['cursor_x'] = $match[1];
	    $panels[$curr_panel]['cursor_y'] = $match[2];
	} else if (preg_match('/^TEXT:(.+)$/', $line, $match)) {
	    $panels[$curr_panel]['text'][] = $match[1];
	} else if (preg_match('/^FOOTNOTE:(.+)$/', $line, $match)) {
	    $panels['footnote'] = $match[1];
	}
    }

    return $panels;
}


function render_comic_strip($strip, $title=NULL)
{
    global $dudley_root_url;
  $txt = '<table cellspacing="0" cellpadding="0" align="center">';
  $txt .= '<tbody>';
  $txt .= '<tr>';

  if (!isset($title)) {
      $prev = db_get_strip_prev($strip['epoch']-1);
      $next = db_get_strip_next($strip['epoch']+1);

      $title = "<span class='prevstrip'>";
      if ($prev['stripid']) $title .= mk_url(url_noindex('?'.$prev['stripid']),'&lt;');
      else $title .= '&nbsp;';
      $title .= "</span>";
      $title .= '&nbsp;'.date("M jS, Y", $strip['epoch']).'&nbsp;';
      $title .= "<span class='nextstrip'>";
      if ($next['stripid']) $title .= mk_url(url_noindex('?'.$next['stripid']),'&gt;');
      else $title .= '&nbsp;';
      $title .= "</span>";
  }

  $txt .= '<td class="conttl">' . $title . '</td>';
  $txt .= '<td class="conttr" align="right"><b>' . $strip['author'] . '</b></td>';
  $txt .= '</tr>';

  $txt .= '<tr>';
  $txt .= '<td class="contpic" colspan="2">';
  $txt .= '<table class="comic" width="100px">';
  $txt .= '<tbody>';

  for ($y = 0; $y < $strip['strip_hei']; $y++) {
    $txt .= '<tr>';
    for ($x = 0; $x < $strip['strip_wid']; $x++) {
      $i = $y * $strip['strip_wid'] + $x;
      if (!isset($strip[$i])) {
        continue;
      }
      $txt .= '<td class="comic" valign="top">';

      $txt .= '<div class="panelcontainer">';
      $txt .= '<pre id="comicpanel' . $i . '">';
      for ($dy = 0; $dy < $strip[$i]['hei']; $dy++) {
          for ($dx = 0; $dx < $strip[$i]['wid']; $dx++) {
	      if (isset($strip[$i]['panel'][$dx][$dy])) {
		  $chr = $strip[$i]['panel'][$dx][$dy]['chr'];
		  $bold = (isset($strip[$i]['panel'][$dx][$dy]['bold']) ? $strip[$i]['panel'][$dx][$dy]['bold'] : 0);
		  $rev = (isset($strip[$i]['panel'][$dx][$dy]['rev']) ? $strip[$i]['panel'][$dx][$dy]['rev'] : 0);
		  $ul = (isset($strip[$i]['panel'][$dx][$dy]['ul']) ? $strip[$i]['panel'][$dx][$dy]['ul'] : 0);
		  $fg  = (isset($strip[$i]['panel'][$dx][$dy]['fg']) ? $strip[$i]['panel'][$dx][$dy]['fg'] : "gray");
		  if (!isset($chr)) $chr = '.';
		  else if ($chr == '<') $chr = '&lt;';
		  else if ($chr == '>') $chr = '&gt;';
		  else if ($chr == '&') $chr = '&amp;';
		  $spann = null;
		  if ($rev == 1) {
		      if ($fg && ($fg != "gray")) $spann .= 'f_black b_'.$fg;
		  } else {
		      if ($fg && ($fg != "gray")) $spann .= 'f_'.$fg;
		  }
		  if ($dx == $strip[$i]['cursor_x'] && $dy == $strip[$i]['cursor_y']) $spann .= ' f_cur';
		  if ($bold == 1) $spann .= ' f_bold';
		  if ($ul == 1) $spann .= ' f_ul';

		  if ($spann) {
		      $txt .= '<span class="'.$spann.'">'.$chr.'</span>';
		  } else {
		      $txt .= $chr;
		  }
	      } else $txt .= '#';
          }
          $txt .= "\n";
      }
      $txt .= '</pre>';
      if (isset($strip[$i]['text'])) {
          $txt .= '<div class="txt">';
	  foreach ($strip[$i]['text'] as $tl) {
	      $txt .= '<p>' . $tl;
          }
          $txt .= '</div>';
      }
      $txt .= '</div>';
      $txt .= '</td>';
    }
    $txt .= '</tr>';
  }
  $txt .= '<tr>';
  $txt .= '<td class="copyright" colspan="' . $strip['strip_wid'] . '">'.$dudley_root_url.'</td>';
  $txt .= '</tr>';
  $txt .= '</tbody>';
  $txt .= '</table>';
  $txt .= '</td>';
  $txt .= '</tr>';

  $txt .= '<tr>';
  $txt .= '<td class="footnote" colspan="3">';
  if (isset($strip['footnote'])) { $txt .= $strip['footnote']; }
  $txt .= '</td>';
  $txt .= '</tr>';

  $txt .= '</tbody>';
  $txt .= '</table>';

  return $txt;
}


function ratings_bars($stripid)
{
    global $rating_names;
    $max = 0;

    $data = db_get_strip_ratings($stripid);

    $rate_avg = avg_rating($stripid);


    for ($r = 0; $r < count($rating_names); $r++) {
	$max = (($data[$r] > $max) ? $data[$r] : $max);
    }

    $logged_in_uid = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);
    if (isset($logged_in_uid))
	$has_voted = db_get_has_user_voted($stripid, $logged_in_uid);

    if (!isset($has_voted)) $has_voted = -1;

    $str = '<div id="ratingdiv">';

    $str .= '<h2>'.((($has_voted==0) && $logged_in_uid) ? 'VOTE!' : 'Ratings').'</h2>';

    if (($has_voted > 0)) {
	$str .= '<div class="delvoteurl">'.mk_url('vote.php?id='.$stripid.'&del=1', 'recast your vote').'</div>';
    }

    $str .= "<div class='vertgraph'>\n";
    $str .= "<ul>\n";
    for ($r = 0; $r < count($rating_names); $r++) {
	if ($max == 0 || $data[$r] == 0) $hei = 0;
	else $hei = ($data[$r] / $max) * 100;
	$str .= '<li class="'.$rating_names[$r].'" style="height:'.$hei.'px;">';
	if (($has_voted==0) && $logged_in_uid) {
	    $str .= mk_url('vote.php?id='.$stripid.'&val='.$r, $data[$r]);
	} else {
	    $str .= $data[$r];
	}
	$dspan = '<span class="desc"> '.$rating_names[$r].'</span>';
	if (($has_voted==0) && $logged_in_uid) {
	    $str .= '<span class="voteurl">'.mk_url('vote.php?id='.$stripid.'&val='.$r, $dspan).'</span>';
	} else {
	    $str .= $dspan;
	}
	$str .= "</li>\n";
    }
    $str .= "</ul>\n";
    $str .= "</div>\n";


    if ($rate_avg['nvotes'] > 0) {
	$str .= "Average rating: <b>".$rating_names[round($rate_avg['avgvote'])].'</b>';
	$str .= "<br>Number of ratings: ".$rate_avg['nvotes'];
    } else $str .= "Not rated yet.";

    $str .= '</div>';


    return $str;
}

function user_voting_histogram($userid)
{
    global $rating_names;

    $sqlstr = "select value,count(*) as nvotes from vote where userid=".$userid." group by value order by value asc";
    $retval = array(0,0,0,0,0);
    $res = db_exec($sqlstr);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	for ($i = 0; $i < $numrows; $i++) {
	    $dat = db_get_rowdata($res, $i);
	    $data[$dat['value']] = $dat['nvotes'];
	}
    }

    $sql = "select avg(value) as avgvote,count(*) as nvotes from vote where userid='".$userid."'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$rate_avg = db_get_rowdata($res, 0);
    }

    $max = 0;
    for ($r = 0; $r < count($rating_names); $r++) {
	if (isset($data[$r]))
	    $max = (($data[$r] > $max) ? $data[$r] : $max);
    }

    $str = '<div id="ratingdiv">';

    $str .= '<h2>Your votes</h2>';

    $str .= "<div class='vertgraph'>\n";
    $str .= "<ul>\n";
    for ($r = 0; $r < count($rating_names); $r++) {
	if ($max == 0 || (!isset($data[$r]) || ($data[$r] == 0))) $hei = 0;
	else $hei = ($data[$r] / $max) * 100;
	$str .= '<li class="'.$rating_names[$r].'" style="height:'.$hei.'px;">';
	$str .= (isset($data[$r]) ? $data[$r] : 0);
	$dspan = '<span class="desc"> '.$rating_names[$r].'</span>';
	$str .= $dspan;
	$str .= "</li>\n";
    }
    $str .= "</ul>\n";
    $str .= "</div>\n";

    if ($rate_avg['nvotes'] > 0) {
	$str .= "Average rating: <b>".$rating_names[round($rate_avg['avgvote'])].'</b>';
	$str .= "<br>Number of ratings: ".$rate_avg['nvotes'];
    } else $str .= "Not rated yet.";

    $str .= '</div>';
    return $str;
}


function avg_rating($stripid)
{
    $sql = "select avg(value) as avgvote,count(*) as nvotes from vote where stripid='".$stripid."'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}

function get_news($stripid)
{
    $sql = "select newsid,newstext from news where stripid='".$stripid."'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	$dat = db_get_rowdata($res, 0);
	return $dat;
    }
    return NULL;
}


function log_in_user($username=NULL, $password=NULL, $remember=NULL)
{
    global $DUDLEY_secret_salt;
    if (!isset($username)) return false;
    if (!isset($password)) return false;

    $passwd_crypt = crypt($password, substr($password, 0, 2));

    $sql = "select *,extract(epoch from lastlogin) as lastloginepoch from duduser where lower(username)='".db_escape_string(strtolower($username))."' and password='".$passwd_crypt."'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);

    if ($numrows == 1) {

	$dat = db_get_rowdata($res, 0);
	if (isset($remember)) {
	    mk_cookie('username', $dat['username']);
	    mk_cookie('passwd', md5($dat['password'].$DUDLEY_secret_salt));
	    mk_cookie('uid', $dat['userid']);
	}
	$_SESSION['username'] = $dat['username'];
	$_SESSION['passwd'] = $dat['password'];
	$_SESSION['loggedin'] = 1;
	$_SESSION['userid'] = $dat['userid'];
	$_SESSION['lastlogin'] = $dat['lastloginepoch'];
	$_SESSION['s_keybnav'] = $dat['s_keybnav'];
	$_SESSION['userlevel'] = $dat['userlevel'];

	$sql = "update duduser set lastlogin='NOW' where userid=".$dat['userid'];
	$res = db_exec($sql);

	return true;
    }
    return false;
}

/*
function logged_in_userid($record_login=0,$username=NULL,$passwd=NULL)
{
    if (!isset($username))
	$username = $_SESSION['username'];
    if (!isset($passwd))
	$passwd = $_SESSION['passwd'];

    if (!isset($username) || !isset($passwd) ||
	($username == "") || ($passwd == "")) return NULL;

    $passwd_crypt = crypt($passwd, substr($passwd, 0, 2));

    $username = strtolower($username);

    $sql = "select * from duduser where lower(username)='".db_escape_string($username)."' and password='".db_escape_string($passwd_crypt)."'";
    $res = db_exec($sql);
    $numrows = db_numrows($res);
    if ($numrows > 0) $dat = db_get_rowdata($res, 0);

    if ($numrows != 1) return NULL;

    $userid = $dat['userid'];

    if ($record_login == 1) {
	$sql = "update duduser set lastlogin='NOW' where userid=".$userid;
	$res = db_exec($sql);
    }

    return $userid;
}
*/

$database_connection = NULL;

function db_connect()
{
    global $database_connection;
    global $DUDLEY_db, $DUDLEY_db_user, $DUDLEY_db_passwd;
    $database_connection = pg_connect("host=127.0.0.1 dbname=".$DUDLEY_db." user=".$DUDLEY_db_user." password=".$DUDLEY_db_passwd) or die('Could not connect to the database.');
}

function db_exec($sql)
{
    global $database_connection;
    if (!isset($database_connection)) db_connect();
    return pg_exec($database_connection, $sql);
}

function db_close()
{
    global $database_connection;
    if (isset($database_connection)) {
	pg_close($database_connection);
	unset($database_connection);
    }
}

function db_escape_string($str)
{
    return pg_escape_string($str);
}

function db_result($result, $row, $field)
{
    return pg_result($result, $row, $field);
}

function db_free_result($result)
{
    pg_free_result($result);
}

function db_num_fields($result)
{
    return pg_num_fields($result);
}

function db_field_name($result, $field)
{
    return pg_field_name($result, $field);
}

function db_numrows($result)
{
    return pg_numrows($result);
}

function db_update($table, $data, $where)
{
    global $database_connection;
    if (!isset($database_connection)) db_connect();
    return pg_update($database_connection, $table, $data, $where);
}

function db_insert($table, $data)
{
    global $database_connection;
    if (!isset($database_connection)) db_connect();
    return pg_insert($database_connection, $table, $data);
}

function db_get_rowdata($results, $row)
{
    $data = null;
    for($gt = 0; $gt < db_num_fields($results); $gt++) {
	$field = db_field_name($results, $gt);
	$data[$field] = db_result($results, $row, $gt);
    }
    return $data;
}
