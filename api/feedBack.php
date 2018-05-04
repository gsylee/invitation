<?php
header('Content-Type:application/json;charset=utf-8');

    $data = json_decode($_POST['data'],true);
    $arr = array(
        'code' => 200,
        'data' => array(
            'id' => $data['id'],
            'feedbackStatus' => $data['feedbackStatus'],
            'adultCount' => $data['adultCount'],
            'childrenCount' =>$dataT['childrenCount'],
            'estimateArriveTime' => $data['estimateArriveTime'],
            'message' => $data['message']
        )
     );

//    $arr  .= json_decode($_POST['data'],true);
//    var_dump(json_encode($arr,JSON_UNESCAPED_UNICODE)) ;
   echo  json_encode($arr,JSON_UNESCAPED_UNICODE);

// var_dump($_POST);