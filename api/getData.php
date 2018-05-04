<?php
header('Content-Type:application/json;charset=utf-8');
$jsonData = '{
    "code" : 200,
    "data" : {
        "invitationCardId" : 2,
        "guest" : "张三",
        "code" : "ABC12345",
        "DateTime" : "1525250110000",
        "bridegroom" : "陈谋福",
        "bride" : "陈某琪",
        "address" : "厦门市万达广场",
        "longitude" : 118.221457,
        "latitude" : 24.654707
    }
}';

if($_GET['id']) {
    if ($_GET['id'] == 2) {
        echo $jsonData;
    }
} else {
    echo '发生错误';
}