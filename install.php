<?php

function write_settings($fname, $data)
{
    $fp = fopen($fname,"w");
    $str = "<?php\n";
    if ($data)
        foreach ($data as $key=>$val) {
            $str .= '$'.$key.' = '.$val.";\n";
        }
    if (fwrite($fp, $str, strlen($str)) === FALSE) {
        return FALSE;
    }
    return TRUE;
}

/**
 * Return a random string
 *
 * @author       Aidan Lister <aidan@php.net>
 * @version      2.0
 * @param        int     $length  Length of the string you want generated
 * @param        string  $seeds   The seeds you want the string to be generated from
 */
function str_rand($length = 8, $seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890')
{
    $str = '';
    $seeds_count = strlen($seeds);

    // Seed
    list($usec, $sec) = explode(' ', microtime());
    $seed = (float) $sec + ((float) $usec * 100000);
    mt_srand($seed);

    // Generate
    for ($i = 0; $length > $i; $i++) {
        $str .= $seeds{mt_rand(0, $seeds_count - 1)};
    }

    return $str;
}



if (file_exists('config.php')) {
    die('config.php already exists.');
}

if (isset($_POST['submit'])) {

    $data = array('DUDLEY_db' => '"'.$_POST['DUDLEY_db'].'"',
		  'DUDLEY_db_user' => '"'.$_POST['DUDLEY_db_user'].'"',
		  'DUDLEY_db_passwd' => '"'.$_POST['DUDLEY_db_passwd'].'"',
		  'DUDLEY_secret_salt' => '"'.str_rand().'"'
		  );

    if (!write_settings('config.php', $data)) {
	die('Error writing config.php');
    } else {
	include_once "utils.php";
	include_once "dudleyinclude.php";

	if (!file_exists('dudley_db_schema.sql')) {
	    die('dudley_db_schema.sql does not exist.');
	}
	db_exec(file_get_contents('dudley_db_schema.sql'));
	$pw = crypt($_POST['admin_passwd'], substr($passwd, 0, 2));
	db_exec('insert into duduser (username, registertime, password, userlevel) values ("'.db_escape_string($_POST['admin_user']).'", "NOW", "'.db_escape_string($pw).'", 1);');

	header("Location: index.php");
	exit;
    }
}

?>
<html>
<head>
<title>Install Dudley's Dungeon</title>
</head>
<body>
<h2>Install Dudley's Dungeon</h2>

<form action="./install.php" method="post">
<table>
<tr>
  <td>Database</td>
  <td><input type="text" name="DUDLEY_db" value="dudleydb"></td>
</tr>
<tr>
  <td>DB User</td>
  <td><input type="text" name="DUDLEY_db_user" value="dudley"></td>
</tr>
<tr>
  <td>DB Password</td>
  <td><input type="password" name="DUDLEY_db_passwd" value="dudley"></td>
</tr>
    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr>
  <td>Admin User</td>
  <td><input type="text" name="admin_user" value="dudley"></td>
</tr>
<tr>
  <td>Admin Password</td>
  <td><input type="password" name="admin_passwd" value="dudley"></td>
</tr>
<tr>
  <td>&nbsp;</td>
  <td><input type="submit" value="Submit" name="submit">
</tr>
</table>
</form>

</body>
</html>