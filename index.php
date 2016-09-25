<?php 
ob_start();
const DS = DIRECTORY_SEPARATOR;
const ROOT = __DIR__;

include 'vendor/autoload.php';
include 'scripts/QMAutoLoader.php';
include 'scripts/Bootstrapper.php';

BootErUp();

ob_end_flush();