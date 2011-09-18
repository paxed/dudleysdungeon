<?php

include_once "dudleyinclude.php";

session_start();

unset($_SESSION['username']);
unset($_SESSION['passwd']);
unset($_SESSION['loggedin']);
unset($_SESSION['userid']);
unset($_SESSION['lastlogin']);
unset($_SESSION['s_keybnav']);
unset($_SESSION['userlevel']);

mk_cookie('username');
mk_cookie('passwd');
mk_cookie('uid');

header('Location: '.$dudley_root_url);
exit;
