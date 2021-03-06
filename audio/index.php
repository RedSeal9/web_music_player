<?php
#ini_set('display_errors', 1);
#ini_set('display_startup_errors', 1);
#error_reporting(E_ALL);
header('Content-Type: application/json');

require "__src/Mp3Info.php";
use wapmorgan\Mp3Info\Mp3Info;
$num = 0;
$dir = scandir('./');
foreach ($dir as &$dvalue) {
if(strpos($dvalue, '.') == false) {
$dirls = scandir($dvalue);
foreach ($dirls as &$value) {
if(strpos($value, '.mp3') !== false) {
$num += 1;
$audio = new Mp3Info($dvalue.'/'.$value, true);
$song[$num] = $audio;
}}}}
echo json_encode($song);