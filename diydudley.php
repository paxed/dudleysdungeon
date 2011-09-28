<?php
/*
error_reporting(E_ALL);
ini_set('display_errors','On');
*/

ini_set('session.bug_compat_42',0);
ini_set('session.bug_compat_warn',0);

include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

$strip_in_queue = 0;

$usr_is_logged_in = (isset($_SESSION['loggedin']) ? 1 : 0);
if ($usr_is_logged_in) {
    $username = $_SESSION['username'];
}

parse_str($_SERVER['QUERY_STRING'], $querystr);
$querystr = remove_null_keys($querystr);


if (isset($querystr['edit']) && preg_match('/^[0-9]+$/', $querystr['edit'])) {

    if ($usr_is_logged_in) {

	$strip_id = $querystr['edit'];
	$user_id = $_SESSION['userid'];
	//$user_id = logged_in_userid(1);

	if (is_admin()) {
	    $sqlwhere = " where stripid='".db_escape_string($strip_id)."'";
	} else {
	    $sqlwhere = " where stripid='".db_escape_string($strip_id)."' and authorid=".$user_id." and approved=false";
	}

	$sql = "select stripdata from strip".$sqlwhere; // where stripid=".$strip_id." and authorid=".$user_id." and approved=false";
	$res = db_exec($sql);
	$numrows = db_numrows($res);
	if ($numrows == 1) {
	    $dat = db_get_rowdata($res, 0);
	    $strip = $dat['stripdata'];
	    /*
	    $strip = preg_replace('/\\\\/', '\\\\\\', $strip);
	    $strip = preg_replace('/"/', '\\\"', $strip);
	    */
	    $action = 1;
	    $strip_in_queue = 1;
	} else {
	    $errorstr = "No such strip.";
	    unset($strip_id);
	}
    } else $errorstr = "You're not logged in.";
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if ($_POST['action'] == 'update strip') {

	$strip = $_POST['comicstrip'];
	$strip_id = $_POST['strip_id'];

	if ($usr_is_logged_in) {
	    $usernam = (isset($_SESSION['username']) ? $_SESSION['username'] : NULL);
	    $passwd = (isset($_SESSION['password']) ? $_SESSION['password'] : NULL);
	    $author_id = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);
	    $username = $usernam;
	} else {
	    $usernam = (isset($_POST['username']) ? $_POST['username'] : NULL);
	    $passwd =  (isset($_POST['password']) ? $_POST['password'] : NULL);
	    log_in_user($usernam, $passwd);
	}

	if (isset($author_id)) {
	    /* updating a strip in the queue */
	    if (is_admin()) {
		$sqlwhere = " where stripid='".db_escape_string($strip_id)."'";
	    } else {
		$sqlwhere = " where stripid='".db_escape_string($strip_id)."' and authorid=".$author_id." and approved=false";
	    }
	    $sql = "select stripdata from strip".$sqlwhere;
	    $res = db_exec($sql);
	    $numrows = db_numrows($res);
	    if ($numrows == 1) {
	        /* used to have stripslashes($strip) */
		$sql = "update strip set stripdata='".db_escape_string($strip)."', edittime='NOW'".$sqlwhere;
		$res = db_exec($sql);
		$successstr = "Strip updated.";
	    } else $errorstr = "Something went wrong when trying to update the strip. Maybe it was deleted, or already accepted?";
	} else $errorstr = "Login error. Wrong username / password?";
	$action = 1;
	$strip_in_queue = 1;

    } else if ($_POST['action'] == 'submit strip') {

	$strip = $_POST['comicstrip'];

	if ($usr_is_logged_in) {
	    $usernam = $_SESSION['username'];
	    $passwd = (isset($_SESSION['password']) ? $_SESSION['password'] : NULL);
	    $author_id = $_SESSION['userid'];
	    $username = $_SESSION['username'];
	} else {
	    $usernam = (isset($_POST['username']) ? $_POST['username'] : NULL);
	    $passwd =  (isset($_POST['password']) ? $_POST['password'] : NULL);
	    log_in_user($usernam, $passwd);
	    $author_id = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL);
	}

	if (isset($author_id)) {
	    /* adding a new strip to the queue */
	    $usrnam = $usernam;
	    /* used to have stripslashes($strip) */
	    $sqlstr = "insert into strip (submittime,stripdata,author,authorid,approved) values ('NOW', '".
		db_escape_string($strip)."', '".
		db_escape_string($usrnam)."', ".$author_id.", false); select * from strip where stripid=(select currval('strip_stripid_seq'));";

	    /* FIXME: replace from 2nd select onward in the above with "RETURNING stripid;" when postgres >= 8.3 */

	    $result = db_exec($sqlstr);

	    if ($result) {

		$dat = db_get_rowdata($result, 0);

		$strip_id = $dat['stripid'];
		$strip_in_queue = 1;

		$successstr = "Strip submitted.";
	    } else {
		$errorstr = "Something went wrong when inserting the strip into the database.";
	    }
	} else $errorstr = "Login error. Wrong username / password?";
	$action = 1;

    } else $errorstr = "You wanted to do what?";

}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" media="screen" href="diydudley.css">
<title>Dudley D-I-Y</title>

<script type="text/javascript">
<?php
if ((isset($action) && ($action == 1)) || isset($errorstr)) {
    if ($action == 1) {
        $strip = preg_replace('/\\\\/', '\\\\\\', $strip);
        $strip = preg_replace('/"/', '\\\"', $strip);
	$strip = preg_replace("/\r/", '', $strip);
        $tmpstrip = explode("\n", $strip);
        $strip = implode("\\n\"+\n\"", $tmpstrip);
	print 'var POST_comicstrip = "'.$strip.'";'."\n";
    }
    if (isset($errorstr)) print 'var POST_errorstr = "'.$errorstr.'";'."\n";
    else print 'var POST_errorstr;';
} else print 'var POST_errorstr;';
if (isset($successstr)) print 'var POST_success = "'.$successstr.'";'."\n";
print 'var USR_login='.(($usr_is_logged_in) ? 1 : 0).";\n";
print 'var USR_name="'.(($usr_is_logged_in) ? $username : '')."\";\n";
print 'var USR_strip_in_queue='.($strip_in_queue ? 1 : 0).";\n";
if (isset($strip_id)) {
    print 'var USR_strip_id='.$strip_id.";\n";
}
print 'var USR_dudley_root_url="'.$dudley_root_url."\";\n";
?>
</script>

<script src="dragndrop.js" type="text/javascript"></script>
<script src="diydudley-vars.js" type="text/javascript"></script>
<script src="diydudley-tools.js" type="text/javascript"></script>
<script src="Panel.js" type="text/javascript"></script>
<script src="diydudley.js" type="text/javascript"></script>
</head>
<body onload="pageload_init();">

<a id="help" class="button" onclick="return buttonfunc_act(74);" href="#">HELP</a>
<a id="configbtn" class="button" onclick="return buttonfunc_act(79);" href="#">Config</a>
<h1><a href="<?php echo $dudley_root_url; ?>">Dudley</a> D-I-Y</h1>

<div id="poststatusdiv"></div>

<div class="editpanel_border">
<div>Edit Panel #<span id="panel_number"></span>: <span id="panel_selection_buttons"></span></div>
<div id="editdiv"></div>
<div id="editpanel_textarea_div"></div>
<span id="writer_mode_inputdiv"></span>
<span id="editpanel_text_div"></span>
</div>

<div id="all_toolbars">

<div>

<div id="toolbardiv">
<span id="current_pen"></span> - Mode:<span id="editmode_span"></span>
</div>

<span id="buttondiv"></span>
</div>

<div>
<div id="saved_pens"></div>
<div id="colorselection"></div>
<div id="charselection"></div>
</div>

<label>Strip data:<input type="checkbox" checked id="stripinfo_cbox" onchange="toggle_preview('stripinfo_cbox', 'strip_data_edit');output_strip_data_edit();return false;"></label>
<div id="strip_data_edit"></div>

</div>

<label>Preview:<input type="checkbox" checked id="preview_cbox" onchange="toggle_preview('preview_cbox', 'preview_strip');strip_preview_panels();return false;"></label>
 <label>Popup preview:<input type="checkbox" id="preview_popup_cbox" onchange="strip_preview_panels();return false;"></label>
<div id="preview_strip"></div>
<br>
<label>Code:<input type="checkbox" checked id="code_cbox" onchange="toggle_preview('code_cbox', 'strip_code_div');panel_showcode();return false;"></label>
 <label>Code edit:<input type="checkbox" id="code_edit_cbox" onchange="panel_showcode();return false;"></label>
<div id="strip_code_div"></div>

<div id="download_save"></div>


<script type="text/javascript"></script>
<noscript><p><b>Sorry, this page requires javascript.</b></p></noscript>

<div id="hidden_div"></div>
</body>
</html>
