<?php
include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();


dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title).' -- Submit a new strip'));


print '<center>'."\n";
print '<h1>'.$dudley_comic_title.'</h1>'."\n";
print '<div class="dudley_strip">'."\n";
print '<p>'."\n";

$dudmenu = get_dudmenu();
print $dudmenu;

print '<h2>Submit a new Dudley strip</h2>'."\n";
print '<p>First <a href="diydudley.php">create your comic strip</a>';
print ', then submit the datafile here or in the editor itself, and once the admins have approved it,';
print ' it will appear on the Dudley\'s Dungeon comic strip.'."\n";


$user_id = (isset($_SESSION['userid']) ? $_SESSION['userid'] : NULL); //logged_in_userid();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($user_id === NULL) {
	print '<p>Sorry, you need to be <a href="login.php">logged in</a> before you can submit strips.'."\n";
    } else {

	$filedata = $_FILES['comicfile'];
	if (isset($filedata) && (isset($filedata['tmp_name'])) &&
	    ($filedata['error'] == 0) && is_uploaded_file($filedata['tmp_name'])) {
	    $comicdata = file_get_contents($filedata['tmp_name']);

	    $lines = preg_split("/\n/", $comicdata);

	    $sqlstr = "insert into strip (submittime,stripdata,author,authorid,approved) values ('NOW', '".
		db_escape_string($comicdata)."', '".
		db_escape_string($_SESSION['username'])."', ".$user_id.", false);";

	    $result = db_exec($sqlstr);

	    print '<P>You submitted the following comic strip:'."\n";

	    $strip = parse_comic_strip($lines);
	    print render_comic_strip($strip, date("M jS, Y"));

	} else {
	    print '<P>Sorry, something went wrong when getting the file.'."\n";
	}
    }
} else {
    if ((isset($_SESSION['username']) && isset($_SESSION['passwd'])) && !isset($user_id)) {
	print '<P>Your browser has already authenticated, but not with the right username and password...'."\n";
	print '<P><a href="login.php">Try again</a>.'."\n";
    } else {
	print '<form method="POST" action="' . $_SERVER['PHP_SELF'] . '" enctype="multipart/form-data">'."\n";
	print '<input name="comicfile" type="file" size="50">'."\n";
	print '<input type="Submit" value="Submit">'."\n";
	print '</form>'."\n";
    }
}

print '</div>'."\n";
print '</center>'."\n";

dud_html_bottom();
