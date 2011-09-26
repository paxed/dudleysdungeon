<?php
include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

if (!is_admin()) {
    header('Location: '.$dudley_root_url);
    exit;
}

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title).' -- Queued strips'));


$mode = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    //print '<pre>';print_r($_POST);print '</pre>';

    $stripid = $_POST['stripid'];
    if (!isset($stripid) || (!preg_match('/^[0-9]+$/', $stripid))) exit;

    $newstext = trim($_POST['newstext']);
    if (strlen($newstext) < 1) unset($newstext);

    if ($_POST['action'] == 'delete strip') {
	$sql = "delete from news where stripid=".$stripid.";";
	$sql .= " delete from strip where stripid=".$stripid.";";
	$sql .= " delete from comment where stripid=".$stripid.";";
	$sql .= " delete from vote where stripid=".$stripid.";";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	unset($stripid);
    } else if ($_POST['action'] == 'delete news') {
	$sql = "delete from news where stripid=".$stripid;
	$res = db_exec($sql);
	$numrows = db_numrows($res);
    } else if ((($_POST['action'] == 'edit news') || ($_POST['action'] == 'add news')) && (isset($newstext))) {
	$old_news = get_news($stripid);
	if (isset($old_news)) {
	    $sql = "update news set newstext='".db_escape_string($newstext)."' where newsid=".$old_news['newsid'];
	} else {
	    $sql = "insert into news (newstext,stripid) values ('".db_escape_string($newstext)."', ".$stripid.")";
	}
	$res = db_exec($sql);
	$numrows = db_numrows($res);
    } else if ($_POST['action'] == 'approve') {
	$sql = "select approved from strip where stripid='".$stripid."' and approved=false";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows != 1) exit;
	$delay = trim(db_escape_string($_POST['stripdelay']));
	$sql = "update strip set approved=true,striptime=date_trunc('day',now()".
	    ($delay ? "+interval '".$delay."'" : "").") where stripid=".$stripid;
	$res = db_exec($sql);
    } else if ($_POST['action'] == 'deapprove') {
	$sql = "update strip set approved=false,striptime=null where stripid=".$stripid;
	$res = db_exec($sql);
    }

    if (isset($stripid)) {
	$mode = 'view';
	$id = $stripid;
    }

} else {

    if (isset($_GET['view']) && preg_match('/^[0-9]+$/', $_GET['view'])) {
	$mode = 'view';
	$id = $_GET['view'];
    } else if (isset($_GET['approve']) && preg_match('/^[0-9]+$/', $_GET['approve'])) {
	$id = $_GET['approve'];
	$res = db_exec("update strip set approved=true,striptime='NOW' where stripid=".$id);
	print pg_result_error($res);

	$mode = 'view';
    }

}

$sorttype = isset($_GET['sort']) ? $_GET['sort'] : NULL;
$show_all_strips = isset($_GET['showall']) ? $_GET['showall'] : NULL;


print '<center>';
print '<h1>'.$dudley_comic_title.'</h1>';
print get_dudmenu();
print '<div class="dudley_strip">';
print '<p>';

print '<h2>Queued strips</h2>';


if ($mode == 'view') {

    print '<h3>Viewing strip #'.$id.'</h3>';

    $news = get_news($id);

    $latest_strip = db_get_strip_latest(null, 1);

    if ($latest_strip) {
	$res = db_exec("select date_trunc('day', age(striptime+interval '2 days', 'NOW')) as diffage from strip where stripid=".$latest_strip['stripid']);
	$dat = db_get_rowdata($res, 0);
	$diff_age = $dat['diffage'];
    }

    $res = db_exec("select *,extract(epoch from striptime) as epoch from strip where stripid=".$id);
    $numrows = db_numrows($res);
    if ($numrows > 0) {
	for ($i = 0; $i < $numrows; $i++) {
	    $dat = db_get_rowdata($res, $i);
	    $lines = preg_split("/\n/", $dat['stripdata']);
	    $strip = parse_comic_strip($lines);
	    print render_comic_strip($strip, date("M jS, Y", $dat['epoch']));
	    if (isset($news) && strlen($news['newstext']) > 0)
		print '<div class="newstext"><h3>News</h3>'.$news['newstext'].'</div>'."\n";

	    print '<p>';
	    parse_str($_SERVER['QUERY_STRING'], $querystr);
	    $querystr = remove_null_keys($querystr);

	    print '<form method="POST" action="' . phpself_querystr($querystr) . '">';
	    print '<input type="hidden" name="stripid" value="'.$dat['stripid'].'">';
	    if ($dat['approved'] == "f") {
		if (!isset($diff_age)) $diff_age = '1 day';
		print 'Publish delay:';
		print '<input type="text" name="stripdelay" value="'.$diff_age.'">';
		print ' for example: <em>10 hours</em> or <em>2 days</em>. Leave empty for immediate. Truncated to the nearest day.';
		print '<br>';
		print '<input type="Submit" value="approve" name="action">';

	    } else {
		print '<input type="Submit" value="deapprove" name="action">';
	    }

	    print ' | '.mk_url('diydudley.php?edit='.$dat['stripid'],'Edit strip');
	    print ' | '.mk_url('view_code.php?id='.$dat['stripid'],'View code');

	    print '<br>';
	    print 'News:';
	    if (isset($news) && isset($news['newsid']))
		print '<input type="hidden" name="newsid" value="'.$news['newsid'].'">';
	    print '<textarea name="newstext" cols="80" rows="10">'.$news['newstext'].'</textarea>';
	    if (isset($news)) {
		print '<input type="Submit" value="edit news" name="action">';
		print '<input type="Submit" value="delete news" name="action">';
	    } else {
		print '<input type="Submit" value="add news" name="action">';
	    }
	    print '<br>';
	    print '<input type="Submit" value="delete strip" name="action">';

	    print '</form>';

	    print '<hr>';
	}
    } else {
	print 'NO SUCH STRIP.';
    }

}



parse_str($_SERVER['QUERY_STRING'], $querystr);
$querystr = remove_null_keys($querystr);

print '<div style="float:left;">';
print '<p>'.date("r");
print get_monthtable();
print '</div>';

print '<table style="width:50%;border:1px solid black;text-align:center;">';
print '<thead>';

print '<tr>';
$querystr['sort'] = 2;    print '<th>'.mk_url(phpself_querystr($querystr),'ID #').'</th>';
$querystr['sort'] = 3;    print '<th>'.mk_url(phpself_querystr($querystr),'Submitted on').'</th>';
$querystr['sort'] = 4;    print '<th>'.mk_url(phpself_querystr($querystr),'Edited on').'</th>';
$querystr['sort'] = 1;    print '<th>'.mk_url(phpself_querystr($querystr),'Author').'</th>';
unset($querystr['sort']); print '<th>'.mk_url(phpself_querystr($querystr),'Scheduled').'</th>';
print '<th>Edit</th>';
print '</tr>';

print '</thead>';

$sql = "select *,date_trunc('second',submittime) as dtime,date_trunc('second',age(striptime,now())) as pubdate,date_trunc('second',edittime) as etime from strip";
if (!isset($show_all_strips)) $sql .= " where (approved=false or striptime>now()) ";

if (!isset($sorttype)) $sorttype = 0;

switch ($sorttype) {
case 0: $sql .= " order by striptime asc, submittime asc"; break;
case 1: $sql .= " order by lower(author) asc, striptime asc, submittime asc"; break;
case 2: $sql .= " order by stripid, striptime asc, submittime asc"; break;
case 3: $sql .= " order by submittime asc, striptime asc"; break;
case 4: $sql .= " order by edittime asc, striptime asc, submittime asc"; break;
}
$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows > 0) {
    $odd = 0;
    parse_str($_SERVER['QUERY_STRING'], $querystr);
    $querystr = remove_null_keys($querystr);
    for ($i = 0; $i < $numrows; $i++) {
	$dat = db_get_rowdata($res, $i);
	print '<tr class="'.odd_even($odd++).'" style="border:1px solid black;'.(($mode == 'view' && $id==$dat['stripid']) ? "background-color:yellow;" : "").'">';
	print '<td>';
	if ($mode == 'view' && $id==$dat['stripid']) print $dat['stripid'];
	else {
	    $querystr['view'] = $dat['stripid'];
	    print mk_url(phpself_querystr($querystr),$dat['stripid']);
	}
	print '</td>';
	print '<td>'.$dat['dtime'].'</td>';
	print '<td>'.$dat['etime'].'</td>';

	print '<td>';
	if (isset($dat['authorid'])) print mk_url('duduser.php?'.$dat['authorid'],$dat['author']);
	else print $dat['author'];
	print '</td>';

	print '<td>'.(($dat['approved'] == 't') ? $dat['pubdate'] : "not scheduled").'</td>';
	print '<td>'.mk_url('diydudley.php?edit='.$dat['stripid'],'Edit').'</td>';
	print '</tr>';
    }
}

print '</table>';

parse_str($_SERVER['QUERY_STRING'], $querystr);
$querystr = remove_null_keys($querystr);

if (!isset($show_all_strips)) {
    $querystr['showall'] = 1;
    print mk_url(phpself_querystr($querystr), 'Show all strips');
} else {
    unset($querystr['showall']);
     print mk_url(phpself_querystr($querystr), 'Hide active strips');
}

print '</center>';
print '</div>';


dud_html_bottom();
