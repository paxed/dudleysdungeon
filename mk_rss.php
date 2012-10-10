<?php


include_once "utils.php";
include_once "dudleyinclude.php";


function xpn($str, $pad=0)
{
    print str_repeat('  ', $pad).$str."\n";
}

xpn('<?xml version="1.0"?>');
xpn('<?xml-stylesheet type="text/css" href="'.$dudley_root_url.'panels.css" ?>');

xpn('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');

xpn('<channel>',1);

xpn('<atom:link href="'.$dudley_root_url.'dudley.rss" rel="self" type="application/rss+xml" />',2);
xpn('<title>'.strip_tags($dudley_comic_title).'</title>',2);
xpn('<link>'.$dudley_root_url.'</link>',2);
xpn('<description>A comic strip in the world of NetHack characters</description>',2);
xpn('<pubDate>'.date("r").'</pubDate>',2);


$sql = "select *,extract(epoch from striptime) as epoch from strip where approved=true and striptime < 'NOW' order by striptime desc limit 10";

$res = db_exec($sql);
$numrows = db_numrows($res);
if ($numrows > 0) {
    for ($i = 0; $i < $numrows; $i++) {
	$strip_data = db_get_rowdata($res, $i);

	$lines = preg_split("/\n/", $strip_data['stripdata']);
	$strip = parse_comic_strip($lines);
	$strip['epoch'] = $strip_data['epoch'];

	$txt = render_comic_strip($strip,date("M jS, Y", $strip['epoch']));
	$txt = preg_replace('/&/', '&amp;', $txt);
	$txt = preg_replace('/"/', '&quot;', $txt);
	$txt = preg_replace('/</', '&lt;', $txt);
	$txt = preg_replace('/>/', '&gt;', $txt);

	$title = date("M jS, Y", $strip['epoch']);
	if (isset($strip['footnote'])) {
	    $title .= ' - '.strip_tags($strip['footnote']);
	}

	xpn('<item>',2);
	xpn('<title>'.$title.'</title>',3);
	xpn('<link>'.$dudley_root_url.'?f='.date("Y.m.d",$strip['epoch']).'</link>',3);
	xpn('<pubDate>'.date("r", $strip['epoch']).'</pubDate>',3);

	xpn('<description>'.$txt.'</description>', 3);
	xpn('<guid isPermaLink="true">'.$dudley_root_url.'?'.$strip_data['stripid'].'</guid>', 3);

	xpn('</item>',2);

    }
}

xpn('</channel>',2);
xpn('</rss>');
