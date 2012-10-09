<?php

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();

$search_limit = 100;
$searchstr = '';
$show_results = 0;
$ignorecase = 0;

$errorstr = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $searchstr = trim($_POST['searchstr']);
    $ignorecase = $_POST['ignorecase'];

    if (strlen($searchstr) < 2) $errorstr .= '<p>Search string too short.';

    if (!isset($errorstr) || (strlen($errorstr) < 1)) {

	if ($ignorecase) {
	    $str = db_escape_string('%'.strtolower($searchstr).'%');
	    $sql = "select stripid from strip where lower(stripdata) like '".$str."'";
	} else {
	    $str = db_escape_string('%'.$searchstr.'%');
	    $sql = "select stripid from strip where stripdata like '".$str."'";
	}

	$sql .= " and approved=true and striptime<now() order by stripid";

	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows < 1) $errorstr .= '<p>No results.';
	else {
	    $n_search_results = $numrows;

	    $result_stripids = array();

	    for ($i = 0; $i < min($numrows,$search_limit); $i++) {
		$dat = db_get_rowdata($res, $i);
		$result_stripids[] = $dat['stripid'];
	    }

	    $show_results = 1;

	}
    }

}

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title)));

print '<center>'."\n";
print '<h1>'.$dudley_comic_title.'</h1>'."\n";


print get_dudmenu();

print '<h1>Search Dudley strips</h1>'."\n";


print '<form method="POST" action="' . $_SERVER['PHP_SELF'] . '" enctype="multipart/form-data">'."\n";

if (isset($errorstr) && strlen($errorstr)) print '<div class="errorstr">'.$errorstr.'</div>';


if ($show_results) {
    print '<p>Number of hits: '.$n_search_results;

    if ($n_search_results > $search_limit) print '<p>Only the first '.$search_limit.' hits are shown.';

    $odd=0;
    print '<table style="width:50%;border:1px solid black;text-align:center;">';

    print '<thead>';
    print '<tr>';
    print '<td>&nbsp;</td>';
    print '<td>Strip ID</td>';
    print '<td>Submitted</td>';
    print '<td>Author</td>';
    print '<td>Published</td>';
    print '</tr>';
    print '</thead>';


    foreach ($result_stripids as $strip_id) {

	$sql = "select *,date_trunc('second',submittime) as dtime,date_trunc('second',striptime) as stime,date_trunc('second',age(striptime,now())) as pubdate,date_trunc('second',edittime) as etime from strip where stripid=".$strip_id;

	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows > 0) {

	    for ($i = 0; $i < $numrows; $i++) {
		$dat = db_get_rowdata($res, $i);

		print '<tr class="'.odd_even($odd++).'">';

		print '<td>'.$odd.'.&nbsp;</td>';

		print '<td>'.mk_url($dudley_root_url.'?'.$dat['stripid'], $dat['stripid']).'</td>';
		print '<td>'.$dat['dtime'].'</td>';

		print '<td>';
		if (isset($dat['authorid'])) print mk_url('duduser.php?'.$dat['authorid'],$dat['author']);
		else print $dat['author'];
		print '</td>';

		print '<td>'.(($dat['approved'] == 't') ? $dat['stime'] : "not scheduled").'</td>';

		print '</tr>'."\n";

	    }

	}
    }

    print '</table>';

    print '<p>';
}


print '<table style="text-align:center;">';
print '<tr><td><input name="searchstr" type="text" size="40" value="'.$searchstr.'"></td></tr>'."\n";
print '<tr><td><label><input name="ignorecase" type="checkbox"'.($ignorecase=="on"?" checked":"").
          '> case insensitive</label></td></tr>'."\n";
print '<tr><td colspan="2"><input type="Submit" value="Search"></td></tr>'."\n";
print '</table>';
print '</form>'."\n";


print '</center>'."\n";

dud_html_bottom();
