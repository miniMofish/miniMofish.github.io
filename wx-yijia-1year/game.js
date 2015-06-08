if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}

if (!window.cancelRequestAnimationFrame) {
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
                                        window.webkitCancelRequestAnimationFrame ||
                                        window.mozCancelRequestAnimationFrame ||
                                        window.msCancelRequestAnimationFrame ||
                                        window.oCancelRequestAnimationFrame ||
                                        window.clearTimeout);
}

var load = false, index = 0,lock = true;

function isVertical(){    //判断手机横竖屏状态,1代表竖屏状态、0代表横屏状态
    if (window.orientation == 180 || window.orientation == 0) {
        return 1;
    }
    if (window.orientation == 90 || window.orientation == -90) {
        return 0;
    }
}
/**
 * 微信分享
 * @method weixinShare
 * @return {} 无返回值
 */
function weixinShare () {
    //微信接口
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady () {

        window.shareData = {

            "imgUrl": global_url.statics+"/img/game/wechat.jpg",    //分享时显示的小图
            "timeLineLink": "http://wx.oneplus.cn/oneyear/100",//http://cxai.d3.devel.oneplus.cn/src/promotion/1year/100game.html
            "sendFriendLink": "http://wx.oneplus.cn/oneyear/100",   //发送到朋友圈的链接
            "weiboLink": "http://wx.oneplus.cn/oneyear/100",    //

            "tTitle": "你的好友给你100块，一加手机今年最任性的一次！", // 朋友圈标题
            "tContent": "给你100块，一加手机今年最任性的一次！", // 暂无用
            "fTitle": "给你100块，今年仅1次！", // 发送给朋友标题
            "fContent": "你的好友给你100块，一加手机今年最任性的一次！", // 发送给朋友正文
            "wContent": "你的好友给你100块，一加手机今年最任性的一次！", // 微博正文
            "shareType": 1
        };

        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', { 
                "img_url": window.shareData.imgUrl,
               // "img_width": "640",
               // "img_height": "640",
                "link": window.shareData.sendFriendLink,
                "desc": window.shareData.fContent,
                "title": window.shareData.fTitle
            }, function (res) {
                //  {"err_msg":"send_app_msg:ok"}
                if(res.err_msg=="send_app_msg:ok"){
                    
                }
            })
        });

        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": window.shareData.imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.timeLineLink,
                "desc": window.shareData.tContent,
                "title": window.shareData.tTitle
            }, function (res) {
                
            });
        });

        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            WeixinJSBridge.invoke('shareWeibo', {
                    "content": window.shareData.wContent,
                    "url": window.shareData.weiboLink,
                }, function (res) {
                //  {"err_msg":"share_weibo:ok"}
                if(res.err_msg=="share_weibo:ok"){ 
                }
            });
        });
    });
}


window.onorientationchange = function(){
    if(isVertical() === 1){
        //竖屏
        $('.screen-tip').fadeOut("fast");
        if($('.loading:visible')){
            $('.loading').fadeOut(function(){
                $(this).remove();
            });
        }
    }
    if(isVertical() === 0){
        //横屏
        $('.screen-tip').fadeIn("fast");
    }
}


var index = 0;
var animate = {
    firstIn: function(){

    },
    firstOut: function(){
        $('.theme-scene').addClass('hide-scene');
        //.removeClass('show-theme-scene');
        $('.onehundred').removeClass('show-onehundred');
    },
    stageIn: function(){
        setTimeout(function(){
            $('.stage-scene').addClass('show-stage-scene');
        },500);
    },
    stageOut: function(){
        $('.stage-scene').addClass('hide-stage-scene');
        //.removeClass('show-stage-scene');
    },
    playIn: function(){
        //setTimeout(function(){
            $('.play-scene').addClass('show-play-scene');
        //},500);
    }
};
//获取url上面的参数
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var cardSource;
    if(url.indexOf("cardSource") > 0){
        cardSource = url.split('=')[1];
        return cardSource;
    }else{
        return false;
    }

}
//设置loading...
window.onload = function(){ 
    load = true;

    $('.loading').fadeOut(function(){
        $(this).remove();
        
        if(!!GetRequest()){
            $('.share-scene').addClass('show-share-scene');
            return false
        }
        //首屏动画
        $('.theme-scene').addClass('show-theme-scene');
        $('.onehundred').addClass('show-onehundred');
        //自动播放动画
        setTimeout(function(){  //第二屏
            index += 1;
            animate.firstOut();
            animate.stageIn();
        },5500);
        setTimeout(function(){  //第三屏
            index += 1;
            animate.stageOut();
            animate.playIn();
        },9000);
    });
}
$(function () {
    $('body').on('swipeUp',function(){
        if(!!GetRequest()) return false;
        if(index == 2) return false;
        index += 1;
        switch (index){
            case 1:
                animate.firstOut();
                animate.stageIn();
                break;
            case 2:
                animate.stageOut();
                animate.playIn();
        }
    })
    $('body').on('touchmove', function (e){
        e.preventDefault();
    });
    
    //变脸
    var tapCount = 0;
    $('.face').on('touchstart',function(){
        tapCount += 1;
        if(tapCount == 15){
            setTimeout(function(){
                $('.play-scene').addClass('hide-scene');
                    //.removeClass('show-play-scene');
                $('.getmoney-scene').addClass('show-getmoney-scene');
            },500)
        }
        $('.play-scene').addClass('tap');
        $('.hand-left').remove();
        $('#changFace').attr('src',global_url.statics + '/img/game/face-down.png');
        $('#bloodValue').html(tapCount <= 15 ? tapCount : 15);
        $('.blood-red').width($('.blood').width()/17*tapCount);
    })
    .on('touchend',function(){
        var randomImg = parseInt(5*Math.random()+1);    //输出1~5的随机数
        var faceIndex =  parseInt(tapCount/3) <= 0 ? 'init' : parseInt(tapCount/3);    //每点击三次换个表情
        setTimeout(function(){
            $('.play-scene').removeClass('tap');
        },500);

        $('#changFace').attr('src',global_url.statics+'/img/game/face-' + faceIndex + '.png');

        $('#changeSen').attr('src',global_url.statics+'/img/game/sentence-'+ randomImg +'.png');

    });
    //血条的size
    $('.blood-red img').css({
        width: $('.blood').width()
    });
    //显示分享指引
    $('.share-btn').on('tap',function(){
        $('.share-guide').addClass('show-share-guide');
    });
    $('.share-guide').on('tap',function(){
        $(this).removeClass('show-share-guide'); 
    })
});

// 分享初始化
(function () {
    if(isVertical() === 1){
        //竖屏
        $('.screen-tip').fadeOut("fast");
    }
    if(isVertical() === 0){
        //横屏
        $('.screen-tip').fadeIn("fast");
    }
    // 微信分享初始化
    weixinShare();
})();