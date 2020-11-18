<?php

require("class.phpmailer.php");


$mail = new PHPMailer;

$body = "";
$subject = "Заявка. Сайт " . $_SERVER['SERVER_NAME'];
$body = "Поступила заявка :<br/>";
if (isset($_POST["name"])) $body .= "<b>Имя:</b> " . $_POST["name"] . "<br/>";
if (isset($_POST["phone"])) $body .= "<b>Телефон:</b> " . $_POST["phone"] . "<br/>";


$mail->IsSendmail();
$mail->IsHTML(true);
$mail->From = 'tech@height-line.ru';
$mail->FromName = 'HL Sender';
$mail->AddAddress('smart.index@gmail.com');

$mail->CharSet = 'utf-8';
$mail->Subject = $subject;
$mail->Body = $body;

if (!$mail->Send()) {

}


?>