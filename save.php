<?php

$myData = $_GET["data"];

$myFile = "links.json";
$fileHandle = fopen($myFile, "w");

fwrite($fileHandle, $myData);
fclose($fileHandle);

?>