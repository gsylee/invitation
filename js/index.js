addLoadEvent(getData);
// 把经度和纬度和请柬id为全局变量，后面会用到
var longitude,latitude,id,invitationCardId;
function getData() {
    var old_url = location.href;
    // 获取到id值，然后通过id值向服务器发起请求，获取数据
     id = old_url.substr(old_url.lastIndexOf("/") + 1);
    var target_url = "/wedding/invitation/detail" ;
    // 调用ajax方法，向服务器发起请求，获取数据
    loadXMLDoc("GET",target_url,function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           // console.log((JSON.parse(xmlhttp.responseText)));
            var jsonData = JSON.parse(xmlhttp.responseText);
            if(jsonData && jsonData.code == 200){
                // 填充数据
                var data = jsonData.data;
                invitationCardId = data.invitationCardId;
                // 来宾
                getObj("name").nodeValue = data.guest;
                
                // var video_obj = getObj("video-tag",0);
                // video_obj.setAttribute("src",data.videoUrl);
                // // 视频第一帧
                // video_obj.setAttribute("poster",data.frame);

                // getObj("code").innerHTML = jsonData.data.code;
                getObj("code").nodeValue = data.code;
                // 日期： 要对时间戳进行处理
                var t_stamp = Number(data.DateTime);
                // 新历函数
                getCurrentDateTime(t_stamp);
                getObj("new-date").nodeValue = "新历 "+currentDate;
                getObj("what-day").nodeValue = "("+weekDay+")";
                getObj("time").nodeValue = hours;
                // 农历
                 var date = new Date(t_stamp) ;
                var calendar = showCal(date);
                //  console.log("农历:" + calendar);
                getObj("old-date").nodeValue = "农历 " + calendar;
                // 新郎和新娘
                getObj("groom").nodeValue = data.bridegroom;
                getObj("bride").nodeValue = data.bride;
                // 地点
                getObj("adress").nodeValue = data.address;
                // 获取经度和纬度
                longitude = data.longitude;
                latitude  = data.latitude;
                 // 动态设置样式表
                 useTheme(invitationCardId);
            }else{
                console.log("数据请求失败");
                return false;
            }
        }
    },"",id);
}

 // 根据invitationCardId 动态设置文件的背景颜色
function useTheme(CardId){
    if(CardId){
        getObj("theme", 0).setAttribute("href", "/styles/theme/theme"+CardId+".css");
    }
}

 
addLoadEvent(pageTurn);
// 实现翻书效果
function pageTurn(){
    // 1 对象检查
    if(!document.getElementById){
        return false;
    }
    // 2 判断目标对象是否存在，不存在就返回false；
    var imgObj = document.getElementById("page-turn");
    if(!imgObj){
        return false;
    }
    // 动态给img标签添加一个类名
    imgObj.onclick = function(){
        this.setAttribute("class","add-img cover");
        setTimeout("showNav()",1000);
        setTimeout("delayCode()",2000);
        // showNav();
        //隐藏滚动条，直到用户点击封面后，才让滚动条重新出现
        document.getElementsByTagName("body")[0].style.position="static";
    }
}

// 让导航栏在翻书效果结束后才出现
function showNav(){
    // 判断目标元素是否存在
    var navObj = document.getElementById("nav");
    if(!navObj){
        return false;
    }
    navObj.style.display = "block";
}


// 动态加载video内容和地图内容
function delayCode() {
    showMap();
    showVideo();
}

// 显示小地图
function showMap() {
    // 接受从服务器返回的坐标点
     address = [longitude,latitude];
    var map = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 12,
        center: address
    });
    var marker = new AMap.Marker({
        position: address,//marker所在的位置
        map: map//创建时直接赋予map属性
    });
    // 执行函数
    inCenter();
}

// 显示播放视频
function showVideo() {
    var videoObj = document.getElementById("video-tag");
    if (!videoObj) {
        return;
    }
    videoObj.style.display = "block";
}

// 在地图中查看
addLoadEvent(showInMap);
function showInMap(){
    var btnObj = document.getElementById("showInMap");
    if(!btnObj){
        return false;
    }
    btnObj.onclick = function(){
        var ption = longitude+","+latitude;
        var url = "//uri.amap.com/marker?position=" + ption +"&src=mypage&coordinate=gcj02";
        location.assign(url);
        // window.open(url,"_blank");
        // window.open("//uri.amap.com/poidetail?poiid=B025003Q5M&src=mypage&callnative=1");
        // window.location.assign(url); 有历史记录
        // window.location.replace(url);  替换当前页面，使用这个，没有历史记录，不能后退
    }
}

// 点击按钮，恢复地图中心点显示
function inCenter(){
    getObj("inCenter",0).onclick = function(){
        // 调用showInMap函数
        showMap();
    };
};

// 实现tab效果
addLoadEvent(nav_tab);
function nav_tab(){
    //1 对象检查
    if(!document.getElementsByTagName){
        return false;
    }
    // 2判断 导航栏的ul和内容区域的ul是否存在
    var nav_ul = document.getElementById("nav-ul");
    var wrap_ul = document.getElementById("wrap-ul");
    if(!nav_ul || !wrap_ul){
        return false;
    }
    // 获取nav_ul 的所有li标签
    var nav_lis = nav_ul.getElementsByTagName("li");
    var wrap_lis = wrap_ul.getElementsByTagName("li");
    // alert(nav_lis.length);
    // alert(wrap_lis.length);
    if(nav_lis.length != wrap_lis.length){
        return false;
    }
    for(var i=0;i<nav_lis.length;i++){
        nav_lis[i].setAttribute("order",i);
        // alert(nav_lis[i].getAttribute("order"));
        nav_lis[i].onclick = function(){
            for(var j=0;j<nav_lis.length;j++){
                nav_lis[j].className = "";
                wrap_lis[j].style.display = "none";
            }
            // 设置当前为高亮显示
            this.className = "selected";
            wrap_lis[this.getAttribute("order")].style.display = "block";
        }
    }
}

// 接收用户输入的数据，然后通过ajax发送给后台
addLoadEvent(sendFormData);
function sendFormData(){
    getObj("btn",0).onclick = function(){
        // 接收用户输入的表单数据
        // getSelectData("is-locale")
        if(confirm("您真的打算提交了吗?") ){
            // 能否到场
            var feedbackStatus = getSelectData("is-locale");
            // 大人数
            var adultCount = getSelectData("adult-count");
            // 小孩数量
            var childrenCount = getSelectData("child-count");
            var arriveDate = getObj("arrive-date",0).value;
            var arriveTime = getObj("arrive-time",0).value;
            var estimateArriveTime = arriveDate + " " + arriveTime;
            // 转为时间戳
            estimateArriveTime = new Date(estimateArriveTime).getTime();
            // console.log(estimateArriveTime);
            // 获取留言
            var message = getObj("message", 0).value;
            var replyData = {
                data : {
                    id: id,
                    feedbackStatus: feedbackStatus,
                    adultCount: adultCount,
                    childrenCount: childrenCount,
                    estimateArriveTime: estimateArriveTime,
                    message: message
                }
            };
             replyData = JSON.stringify(replyData);
            //  发送表单数据
            //  
            loadXMLDoc("POST", "/wedding/feedback/update", function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    // 隐藏可填写的回应页面
                   getObj("fill-reply",0).style.display = "none";
                   var replyInfo = JSON.parse(xmlhttp.responseText);
                   if(replyInfo && replyInfo.code == 200){
                        replyInfo = replyInfo.data;
                        var isLocale = replyInfo.feedbackStatus;
                       if (isLocale == 1) {
                           isLocale = "能";
                       } else if (isLocale == 2) {
                           isLocale = "不确定";
                       } else {
                           isLocale = "不能";
                       }
                       getObj("isLocale").nodeValue = isLocale;
                       getObj("adultCount").nodeValue = replyInfo.adultCount;
                       getObj("childCount").nodeValue = replyInfo.childrenCount;
                       // 转换时间
                       getCurrentDateTime(Number(replyInfo.estimateArriveTime));
                       // console.log(currentDate);
                       // console.log(hours);
                       getObj("arriveDate").nodeValue = currentDate;
                       getObj("arriveTime").nodeValue = hours;
                       // 显示 不可填写的回应页面
                       getObj("reply-info",0).style.display = "block";
                       // 给 re-reply 按钮绑定一个单击事件

                   }else{
                       console.log("发生未知错误");
                   }
                }
            },replyData,"");
        }
    }
}

