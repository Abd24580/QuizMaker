<?php 
ob_start();

use QM\Application\Application;

const DS = DIRECTORY_SEPARATOR;
const ROOT = __DIR__;

include 'vendor/autoload.php';
include 'scripts/QMAutoLoader.php';

$app = new Application();
$app->Run();

ob_end_flush();