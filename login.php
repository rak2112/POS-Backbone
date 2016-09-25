<?php
$name = $password;
if($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = $_POST["name"];
	$password = $_POST["password"];
	if($name === 'admin' && $password === 'admin') {
		echo "Hello there";
	}
}
?>
