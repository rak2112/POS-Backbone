<?php
$name = $password;
if($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = $_POST["name"];
	$password = $_POST["password"];
	echo $name;
}

?>