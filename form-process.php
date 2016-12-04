<?php

$from = $_POST['from'];
$email = $_POST['email'];
$message = $_POST['message'];
$to = 'ansuarez9@gmail.com';
$subject = 'New Message';

mail ($to, $subject . ' from ' . $email, $message, 'From: ' . $from);
echo 'Your message has been sent!';

?>