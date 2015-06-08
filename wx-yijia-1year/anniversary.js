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

            "imgUrl": "http://statics.oneplus.cn/promotion/1year/img/wechat.png",    //文件夹名未知
            "timeLineLink": "http://wx.oneplus.cn/1year",
            "sendFriendLink": "http://wx.oneplus.cn/1year",   //发送到朋友圈的链接
            "weiboLink": "http://wx.oneplus.cn/1year",    //

            "tTitle": "#一加这一年#没有不好的时代，只要你足够热爱。一加不将就的第一年>>", // 朋友圈标题
            "tContent": "没有不好的时代，只要你足够热爱。一加不将就的第一年>>", // 暂无用
            "fTitle": "一加这一年", // 发送给朋友标题
            "fContent": "没有不好的时代，只要你足够热爱。一加不将就的第一年>>", // 发送给朋友正文
            "wContent": "没有不好的时代，只要你足够热爱。一加不将就的第一年>>", // 微博正文
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
                //首屏动画
                $('.bg').addClass('red-bg');
                $('.first-scene').addClass('show-first-scene');
            });
        }
    }
    if(isVertical() === 0){
        //横屏
        $('.screen-tip').fadeIn("fast");
    }
}
function playMusic(){
        $('body').append('<audio id="music" src="http://statics.oneplus.cn/promotion/1year/img/music.mp3" autoplay loop="loop"></audio>');
        $('body').append('<div class="music-btn"><span class="stop-btn"></span><span class="start-btn" style="display: none"></span></div>')
        var oAudio = $('#music')[0];
        oAudio.play();  //IP6要在这里播放一下>"<
        oAudio.addEventListener('canplay',function(){
            $('.music-btn').fadeIn();
            oAudio.play();
        })
        $('.stop-btn').on('tap',function(){
            oAudio.pause();
            $(this).hide();
            $('.start-btn').show()    
        })
        $('.start-btn').on('tap',function(){
            oAudio.play();
            $(this).hide();
            $('.stop-btn').show();
        })
}
function onBridgeReady(){   //判断是否wifi，下载音乐播放
    WeixinJSBridge.invoke('getNetworkType',{},
    function(e){
        if(e.err_msg == 'network_type:wifi'){
            playMusic();
        }
    });
}
//设置loading...
window.onload = function(){ 
    load = true;

    $('.loading').fadeOut(function(){
        $(this).remove();
        //首屏动画
        $('.bg').addClass('red-bg');
        $('.first-scene').addClass('show-first-scene');
    });
    //页面资源加载完毕后再加载视频
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady();
    }
}
$(function () {
    var animateFun = {  //每个动画进入时清除上一场动画，退出时展示上一场或下一场动画
        firstIn: function(){
            $('.first-scene').addClass('change-first-scene');
        },
        firstOut: function(){
            $('.first-scene').removeClass('change-first-scene');
        },
        //创始人动画
        founderIn: function(){
            $('.bg').removeClass('red-bg');
            $('.music-btn').addClass('music-btn-red');
            $('.first-scene').removeClass('show-first-scene change-first-scene');
            $('.founder-scene').addClass('show-founder-scene');
        }, 
        founderOut: function(){
            $('.founder-scene').removeClass('show-founder-scene'); 
            $('.bg').addClass('red-bg');
            $('.music-btn').removeClass('music-btn-red');
            $('.first-scene').addClass('show-first-scene change-first-scene');
        },
        //诞生
        buildIn: function(){
            $('.founder-scene').removeClass('show-founder-scene');
            $('.build-scene').addClass('show-build-scene');
            $('.build-scene').addClass('animate-build-scene');
        },
        buildOut: function(){
            $('.build-scene').removeClass('show-build-scene animate-build-scene');
            $('.founder-scene').addClass('show-founder-scene');
        },
        //展示手机
        showPhoneIn: function(){
            $('.build-scene').removeClass('show-build-scene animate-build-scene');
            $('.five-founder .one-num').removeClass('build-one-num');

            $('.phone-scene').addClass('show-phone-scene');        
        },
        showPhoneOut: function(){
            $('.phone-scene').removeClass('show-phone-scene');
            this.buildIn();
            //$('#bookNum').html('<img src="img/000.png" />');
        },
        //首销预约人数
        saleOnlineIn: function(){
            //$('#bookNum').html('<img src="img/000.png" />');
            $('.bg').removeClass('red-bg');
            $('.music-btn').addClass('music-btn-red');
            $('.sale-online-scene').addClass('show-sale-online');
            setTimeout(function(){
                $('.phone-scene').removeClass('show-phone-scene');
            },500);
            /*setTimeout(function(){    
                $('#bookNum').html('<img src="img/14000.gif" />');
            },2100)*/
        },
        saleOnlineOut: function(){
            $('.sale-online-scene').removeClass('show-sale-online');
            this.showPhoneIn();
            //$('#bookNum').html('<img src="img/000.png" />');
        },
        //社区用户数量
        bbsUserIn: function(){
            //$('#bookNum').html('<img src="img/000.png" />');
            $('.bg').addClass('red-bg');
            $('.music-btn').removeClass('music-btn-red');
            $('.sale-online-scene').removeClass('show-sale-online');
            $('.bbsuser-scene').addClass('show-bbsuser-scene');
        },
        bbsUserOut: function(){
            $('.bg').removeClass('red-bg');
            $('.music-btn').addClass('music-btn-red');
            $('.bbsuser-scene').removeClass('show-bbsuser-scene');
            this.saleOnlineIn();
        },
        //微博粉丝数量
        weiboFansIn: function(){
            $('.bbsuser-scene').removeClass('show-bbsuser-scene');
            $('.weibo-scene').addClass('show-weibo-scene');
        },
        weiboFansOut: function(){
            $('.bbsuser-scene').addClass('show-bbsuser-scene');
            $('.weibo-scene').removeClass('show-weibo-scene');  
        },
        //竹质手机
        bambooIn: function(){
            $('.main-one').removeClass('show-main-one');
            $('.weibo-scene').removeClass('show-weibo-scene'); 
            $('.bamboo-scene').addClass('show-bamboo-scene');
            $('.bg').removeClass('red-bg');
            $('.music-btn').addClass('music-btn-red');
        },
        bambooOut: function(){
            $('.bamboo-scene').removeClass('show-bamboo-scene');
            $('.bg').addClass('red-bg');
            $('.music-btn').removeClass('music-btn-red');
            this.weiboFansIn();
        },
        //JBL手机
        jblIn: function(){
            $('.bamboo-scene').removeClass('show-bamboo-scene');
            $('.main-one').addClass('show-main-one');
            $('.jbl-scene').addClass('show-jbl-scene');
        },
        jblOut: function(){
            $('.jbl-scene').removeClass('show-jbl-scene');
            this.bambooIn();
        },
        //发射
        launchIn: function(){
            $('.bg').removeClass('red-bg');
            $('.jbl-scene').removeClass('show-jbl-scene');
            $('.ending-scene').removeClass('show-ending-scene');
            $('.main-one').addClass('show-main-one').addClass('shake-main-one ending-main-one'); 

            $('.launch-scene').addClass('show-launch-scene');
            $('.down-cloud').addClass('show-down-cloud');
            $('.ending-scene').addClass('show-ending-scene');
            //动画完了再添加向下的箭头
            $('.arrow-down').addClass('hide-arrow-down');
            setTimeout(function(){
                $('.arrow-down').removeClass('hide-arrow-down');
            },7000);
        },
        launchOut: function(){
            $('.arrow-down').removeClass('hide-arrow-down');
            $('.launch-scene').removeClass('show-launch-scene');
            $('.down-cloud').removeClass('show-down-cloud');
            $('.ending-scene').removeClass('show-ending-scene');
            $('.main-one').removeClass('shake-main-one ending-main-one'); 

            $('.jbl-scene').addClass('show-jbl-scene');

            $('.main-one').removeClass('show-main-one');
            $('.down-cloud').removeClass('show-down-cloud');
            this.jblIn();
        },
        //加油招募
        recruitIn: function(){
            $('.arrow-down').removeClass('hide-arrow-down');
            $('.launch-scene').removeClass('show-launch-scene');
            $('.down-cloud').removeClass('show-down-cloud');
            $('.ending-scene').removeClass('show-ending-scene');
            $('.main-one').removeClass('show-main-one ending-main-one shake-main-one'); 
            $('.down-cloud').removeClass('show-down-cloud');

            $('.recruit-scene').addClass('show-recruit-scene');
            $('.music-btn').removeClass('music-btn-red');

        },
        recruitOut: function(){
            $('.recruit-scene').removeClass('show-recruit-scene');
            $('.main-one').addClass('show-main-one');

            $('.launch-scene').removeClass('show-launch-scene');
            $('.down-cloud').removeClass('show-down-cloud');
            $('.ending-scene').removeClass('show-ending-scene');
            $('.main-one').addClass('show-main-one').removeClass('shake-main-one ending-main-one'); 

            $('.bg').removeClass('red-bg');
            $('.music-btn').addClass('music-btn-red');
            this.launchIn();
        },
        salePageIn: function(){
            $('.recruit-scene').removeClass('show-recruit-scene');
            $('.sale-scene').addClass('show-sale-scene');
            
        },
        salePageOut: function(){
            $('.recruit-scene').addClass('show-recruit-scene');
            $('.sale-scene').removeClass('show-sale-scene');
        },
        initIn: function(){
            $('.recruit-scene').removeClass('show-recruit-scene');

            $('.launch-scene').removeClass('show-launch-scene');
            $('.down-cloud').removeClass('show-down-cloud');
            $('.ending-scene').removeClass('show-ending-scene');
            $('.main-one').removeClass('show-main-one shake-main-one ending-main-one'); 

           
            $('.first-scene').addClass('show-first-scene');
            $('.bg').addClass('red-bg');
        }
    }
    $('body')
    .swipeUp(function(){    //进场动画
        if(isVertical() === 0) return false;
        if(!load) return false;
        index += 1;
        switch (index){
            //首屏动画
            case 1:
                animateFun.firstIn();
                break;
            //五个人
            case 2:
                animateFun.founderIn();
                break;
            case 3:
                animateFun.buildIn();
                break;
            case 4:
                animateFun.showPhoneIn();
                break;
            case 5:
                animateFun.saleOnlineIn();
                break;
            case 6:
                animateFun.bbsUserIn();
                break;
            case 7:
                animateFun.weiboFansIn();
                break;
            case 8:
                animateFun.bambooIn();
                break;
            case 9:
                animateFun.jblIn();
                break;
            case 10:
                animateFun.launchIn();
                break;
            //下掉加油招募
            /*case 11:
                animateFun.recruitIn();
                break;
            case 12:
                animateFun.salePageIn();
                break;*/
            case 11:
                animateFun.initIn();
                index = 0; //重置index，到最后一屏继续翻时回到第一屏
                break;
        }
        //console.log('上'+index);
    })
    .swipeDown(function(){  //退场动画
        if(isVertical() === 0) return false;
        if(!load) return false;
        //if(index <= 0) return false;

        index -= 1;
        switch (index){
            case 0:
                animateFun.firstOut();
                break;
            case 1:
                animateFun.founderOut();
                break;
            case 2:
                animateFun.buildOut();
                break;
            case 3:
                animateFun.showPhoneOut();
                break;
            case 4:
                animateFun.saleOnlineOut();
                break;
            case 5:
                animateFun.bbsUserOut();
                break;
            case 6:
                animateFun.weiboFansOut();
                break;
            case 7:
                animateFun.bambooOut();
                break;
            case 8:
                animateFun.jblOut();
                break;
            case 9:
                animateFun.launchOut();
                break;
            /*case 10:
                animateFun.recruitOut();
                break;
            case 11:
                animateFun.salePageOut();
            break;*/
            case -1:
                $('.first-scene').removeClass('show-first-scene');
                animateFun.launchIn();
                index = 10;
                break;
        }
        //console.log('下'+index);
    });

    $('body').on('touchmove', function (e){
        e.preventDefault();
    });
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