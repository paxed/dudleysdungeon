<?php
include_once "utils.php";
include_once "dudleyinclude.php";

session_start();
is_autologin();

dud_html_top(array('css'=>$dudley_css_files,
	       'title'=>strip_tags($dudley_comic_title).' -- About'));


print '<center>';
print '<h1>'.$dudley_comic_title.'</h1>';
print '</center>';

print get_dudmenu();

?>

<h2>What is Dudley's Dungeon?</h2>
<em><a href="http://nicolaas.net/dudley/">Dudley's Dungeon</a></em> was a comic strip
about <a href="http://nethack.org/">NetHack</a>, run by Dion Nicolaas.
NewtKiller is running a <em><a href="http://sadowl.com/dudley/">Dudley's Dungeon</a></em> comic strip on Dion's code.
<em><?php print $dudley_comic_title ?></em> is an improved version.
The codebase of this version was written from scratch by paxed.


<h2>Where do I get the username and password to rate comics?</h2>
<a href="register.php">Register your nickname</a>. If you already have a
an account on nethack.alt.org for playing NetHack, and you use the same
username and password, the NAO account will be linked to Dudley account.


<h2>What text formatting is allowed in the comments?</h2>
Following HTML tags are allowed: <?php echo htmlentities(preg_replace('/></', '>, <', $allowed_html_tags)); ?>,
and you can also use [b]foo[/b] or *foo* for bold text, [i]foo[/i] for italics,
[u]foo[/u] for underlined and [em]foo[/em] for emphasized text.
<p>URLs should be automagically converted to clickable links.
<p>Two consecutive newlines will be converted to paragraph (&lt;p&gt;),
one newline will be converted to linebreak (&lt;br&gt;).

<h2>How do I report bugs or contact the admin?</h2>
EMail paxed on this server.

<h2>Can I run my own Dudley's Dungeon?</h2>
Sure, the sources for this are available on github: <a href="https://github.com/paxed/dudleysdungeon">https://github.com/paxed/dudleysdungeon</a>


<?php
dud_html_bottom();
