<?php
if (isset($_POST["ticket"])) {
    $ticket = json_decode($_POST["ticket"]);
    print_r($ticket);
} else {
    echo 'ERROR';
}
?>