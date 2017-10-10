<?php
// ensures anything dumped out will be caught
ob_start();
$location = 'public/index.html';

// clear out the output buffer
while (ob_get_status()) 
{
    ob_end_clean();
}

header( "Location: $location" );