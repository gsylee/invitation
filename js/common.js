// 常用函数：

// 1 addLoadEvent函数
function addLoadEvent(func){
    // func 页面加载完，要立即执行的函数
    var old_onload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func();
        // 如果还没绑定要执行的函数，就绑定func函数
    }else{
        window.onload = function(){
            old_onload();
            func();
        }
    }
}

//ajax函数
var xmlhttp
function loadXMLDoc(method,url,cfunc,data,id){
    if(window.XMLHttpRequest){
        // 大于ie7和其他浏览器
        xmlhttp = new XMLHttpRequest();
    }else{
        // ie5 6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = cfunc;
    if(method == 'GET'){
        // console.log(url + "?invitationId=" + id);
        xmlhttp.open("GET", url + "?id=" + id , true);
        xmlhttp.send();
    }else{
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=utf-8'); 
        xmlhttp.send(data);
    }
}

/* 
 * 使用id获取元素的方法,并且填充值
 * eid   : 某个元素的id值
 * emObj : 用于存储获取到的元素
 * add: 表示一个状态，如果没有这个参数，就表明只是要获取元素
 */
function getObj(eid,add=1){
    if(!document.getElementById){
        return false;
    }
    var emObj = document.getElementById(eid);
    if(!emObj){
        return false;
    }
    if(emObj && add === 1)
    {
        return emObj.firstChild;
    }else{
        return emObj;
    }
    // return emObj
}

/* 
 * 获取select 数据
 * eid: 某个元素的id值
 * selectObj : select对象
 * optionsObj； option对象
 */
function getSelectData(eid){
    // 调用 获取上面的函数
    var selectObj = getObj(eid,0);
    var optionsObj = selectObj.getElementsByTagName("option");
    for(var i=0;i<optionsObj.length;i++){
        if(optionsObj[i].selected ){
            // alert(optionsObj[i].value);
            return optionsObj[i].value;
        }
    }
}



/* 
 * 由时间戳，获取到对应的阳历
 * stamp : 时间戳
 * currentDate : 新历年月日
 * weekDay  : 星期几
 * hours    : 几点几分
 */
 var currentDate,weekDay,hours;
function getCurrentDateTime(stamp){
    var dateObj = new Date(stamp);
    // console.log(dateObj);
    // dateObj.setTime(stamp);
     var year = dateObj.getFullYear();
     var month = dateObj.getMonth() + 1;
     var day = dateObj.getDate();
     var week = dateObj.getDay(); // 0 -6  星期天，到星期6
     var hour = dateObj.getHours();
     var mini = dateObj.getMinutes();

      currentDate = year;
    if(month>9){
        currentDate += "年" + month + "月";
    }else{
        currentDate += "年0" + month + "月" ;
    }
    if(day>9){
        currentDate += day + "日";
    }else{
        currentDate += "0" + day + "日";
    }

   switch(week){
       case 0:
            weekDay = "星期日";
            break;
       case 1:
           weekDay = "星期一";
            break;
       case 2:
           weekDay = "星期二";
            break;
      case 3:
           weekDay = "星期三";
            break;
      case 4:
           weekDay = "星期四";
        break;
      case 5:
           weekDay = "星期五";
        break;
      case 6:
           weekDay   = "星期六";
           break;
   }
//    当分钟小于10的时候，加上0
   if(mini<10){
       mini = "0" + mini;
   }

   if(hour>=0 && hour<5){
    //    0-4
       hours = "凌晨"+hour+"时"+mini+"分";
   }else if(hour>=5 && hour<9){
    //    5-8
       hours = "早上"+hour+"时"+mini+"分";
   }else if(hour>=9 && hour<12){
    //    9-11
       hours = "上午"+hour+"时"+mini+"分";
   }else if(hour>=12 && hour<13){
    //    12
     hours = "中午"+hour+"时"+mini+"分";
   }else if(hour>=13 && hour<18){
    //    13-16
       hours = "下午"+hour+"时"+mini+"分";
   }else{
       hours = "晚上"+hour+"时"+mini+"分";
   }
   
}