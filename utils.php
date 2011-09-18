<?php

/*
 * print out the html page header
 * data['foo'] can be:
 *  charset = "utf-8" or whatever. "ISO-8859-1" by default.
 *  title   = "Dudley's Dungeon" by default
 *  rss     = "rss_file_url"
 *  css     = array of css files to use. none by default.
 *  notop   = don't print the top banner
 */
function html_top($data=NULL)
{
  global $dudley_root_url;
  $chrset = isset($data['charset']) ? $data['charset'] : 'ISO-8859-1';

  header('Content-type: text/html; charset='.$chrset);

  print '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"';
  print ' "http://www.w3.org/TR/html4/loose.dtd">'."\n";

  print '<HTML>'."\n";
  print '<HEAD>'."\n";
  print '<TITLE>'.(isset($data['title']) ? $data['title'] : "Dudley's Dungeon").'</TITLE>'."\n";

  print '<META http-equiv="Content-Type" content="text/html;charset='.$chrset.'">'."\n";

  print '<link rel="icon" href="'.$dudley_root_url.'favicon.ico">'."\n";
  print '<link rel="shortcut icon" href="'.$dudley_root_url.'favicon.png">'."\n";

  if (isset($data['css'])) {
    if (!is_array($data['css'])) $data['css'] = array($data['css']);
    foreach ($data['css'] as $css)
      print '<link rel="stylesheet" type="text/css" href="'.$css.'">'."\n";
  }

  if (isset($data['rss'])) {
      print '<link href="'.$data['rss'].'" type="application/rss+xml" rel="alternate" title="Sitewide RSS Feed">'."\n";
  }

  print "</HEAD>\n";
  print "<BODY>\n";

  if (!isset($data['notop'])) {
      print '<DIV class="headerbar">'."\n";
      print "</DIV>\n";
  }
  print '<DIV class="body">'."\n";
}


function html_bottom($data = null) {
    print "</DIV>\n";
    if (!isset($data['notop'])) {
        print '<DIV class="footerbar"></DIV>'."\n";
    }
    print "</BODY>\n</HTML>";
}


function mk_url($url,$name=NULL)
{
    if (!isset($name)) { $name = $url; }
    return '<A href="'.$url.'">'.$name.'</A>';
}

function odd_even($odd)
{
        return ($odd % 2) ? 'odd' : 'even';
}

function remove_null_keys($arr)
{
    foreach (array_keys($arr) as $k)
        if ($arr[$k] == null) unset($arr[$k]);
    return $arr;
}


function query_str($params)
{
  $str = '';
  foreach ($params as $key => $value) {
    $str .= (strlen($str) < 1) ? '' : '&';
    $str .= $key . '=' . rawurlencode($value);
  }
  return ($str);
}

function phpself_querystr($querystr = null)
{
  $ret = $_SERVER['PHP_SELF'];
  $ret = preg_replace('/\/index.php$/', '/', $ret);
  if (!isset($querystr)) parse_str($_SERVER['QUERY_STRING'], $querystr);
  if (count($querystr)) $ret .= '?'.htmlentities(query_str($querystr));

  return $ret;
}
