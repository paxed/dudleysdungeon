<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  $str = $_POST['strip_code_download_textarea'];

  $fname = "dudley_strip_".date("Ymd-His").".txt";

  header('Content-Type: binary/octet-stream');
  header('Content-Length: '.strlen($str));
  header('Content-Disposition: attachment; filename="'.$fname.'"');

  print $str;

  exit;

}
