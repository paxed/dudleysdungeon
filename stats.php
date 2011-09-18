<?php

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title).' -- Statistics'));


$logged_userid = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);

print '<div id="statspage">';

print '<center>'."\n";
print '<h1>'.$dudley_comic_title.'</h1>'."\n";
$dudmenu = get_dudmenu();

print $dudmenu;

print '<h2>Statistics</h2>';
print '<p>';


if (isset($_GET['t']) && preg_match('/[0-9]+/', trim($_GET['t']))) {
    $showtable = trim($_GET['t']);
    if (($showtable < 1) || ($showtable > 5)) unset($showtable);
    $limit = 100;
} else {
    $limit = 10;
}


function show_table($num)
{
    global $showtable;
    return ((isset($showtable) && ($showtable == $num)) || !isset($showtable));
}

function pluscaption($limit, $text, $tablenum)
{
    global $showtable, $dudley_root_url;
    $str = '<caption>'.$limit.' '.$text;
    if (!isset($showtable)) $str .= '&nbsp;'.mk_url($dudley_root_url.'stats.php?t='.$tablenum,'[+]');
    else  $str .= '&nbsp;'.mk_url($dudley_root_url.'stats.php','[-]');
    $str .= '</caption>';
    return $str;
}

function dudthead($heads)
{
    $str = '<thead>';
    $str .= '<tr>';
    foreach ($heads as $h) {
	switch ($h) {
	default:
	case 0: $s = ''; break;
	case 1: $s = '#'; break;
	case 2: $s = 'Posted'; break;
	case 8:
	case 3: $s = 'Author'; break;
	case 4: $s = 'Comments'; break;
	case 5: $s = 'Views'; break;
	case 6: $s = 'Strip'; break;
	case 7: $s = 'Rating'; break;
	}
	$str .= '<th>'.$s.'</th>';
    }
    $str .= '</tr></thead>';
    return $str;
}

function dudtrow($rownum, $dat, $cols)
{
    global $dudley_root_url;
    $str = '<tr class="'.odd_even($rownum).'">';
    foreach ($cols as $c) {
	$s = '';
	switch ($c) {
	default:
	case 0: $s = ''; break;
	case 1: $s = ($rownum+1); break;
	case 2: $s = mk_url($dudley_root_url.'?'.$dat['stripid'].'#comment_'.$dat['commentid'], $dat['commenttime2']); break;
	case 3: $s = 'by ';
        case 8:
	    if (isset($dat['userid']))
		$s .= mk_url($dudley_root_url.'duduser.php?'.$dat['userid'],$dat['username']);
	    else $s .= $dat['username'];
	    break;
	case 4: $s = $dat['num_comments']; break;
	case 5: $s = $dat['viewed']; break;
	case 6: $s = mk_url($dudley_root_url.'?'.$dat['stripid'], $dat['stitle']); break;
	case 7: $s = sprintf("%.2f", $dat['avgrating']); break;
	}
	$str .= '<td>'.$s.'</td>';
    }
    $str .= '</tr>';
    return $str;
}

function dudstatstable($tablenum, $sql, $title, $columns)
{
    global $limit;
    if (show_table($tablenum)) {
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows > 0) {
	    print '<table>';
	    print pluscaption($limit, $title, $tablenum);
	    print dudthead($columns);

	    print '<tbody>';

	    $has_strip = in_array(6, $columns);

	    for ($i = 0; $i < $numrows; $i++) {
		$dat = db_get_rowdata($res, $i);

		if ($has_strip) {
		    $lines = preg_split("/\n/", $dat['stripdata']);
		    $stripd = parse_comic_strip($lines);
		    $stitle = date("M jS, Y", $dat['epoch']);
		    if (isset($stripd['footnote'])) {
			$stitle .= ' - '.strip_tags($stripd['footnote']);
		    }
		    $dat['stitle'] = $stitle;
		}

		print dudtrow($i, $dat, $columns);
	    }
	    print '</table>';
	}
    }
}

$sql = "select a.*,date_trunc('second',a.commenttime) as commenttime2,b.username from comment as a, duduser as b where a.userid=b.userid order by a.commenttime desc limit ".$limit;

if (!isset($showtable))
     print '<div style="float:left; width:50%;">';
else
     print '<div>';
dudstatstable(1, $sql, 'Latest comments', array(1,2,3));
print '</div>';



$sql = "select b.*,r.userid,r.num_comments from (select userid,count(*) as num_comments from comment group by userid) as r, duduser as b where (b.userid=r.userid) order by r.num_comments desc limit ".$limit;

dudstatstable(2, $sql, 'Most prolific commenters', array(1,8,4));



$sql = "select a.*,extract(epoch from a.striptime) as epoch,b.username from strip as a, duduser as b where a.authorid=b.userid and a.viewed > 0 order by a.viewed desc limit ".$limit;

dudstatstable(3, $sql, 'Most viewed strips', array(1,5,6,3));



$sql = "select a.*,b.username,extract(epoch from a.striptime) as epoch,r.avgrating,r.nvotes from (select stripid,avg(value) as avgrating,count(*) as nvotes from vote group by stripid) as r, strip as a, duduser as b where (r.stripid=a.stripid) and (a.authorid=b.userid) order by r.avgrating desc limit ".$limit;

dudstatstable(4, $sql, 'Highest rated strips', array(1,7,6,3));



$sql = "select a.*,b.username,extract(epoch from a.striptime) as epoch,c.* from (select stripid,count(*) as num_comments from comment group by stripid) as c, strip as a, duduser as b where (a.stripid=c.stripid) and (b.userid=a.authorid) order by c.num_comments desc limit ".$limit;

dudstatstable(5, $sql, 'Most commented strips', array(1,4,6,3));



print '</center>'."\n";

print '</div>';

dud_html_bottom();
