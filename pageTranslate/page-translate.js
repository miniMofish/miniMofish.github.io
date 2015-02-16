//页面简单转场效果
$(function () {
    $('.m-page').pageTranslate({
        callback: function (index) {
            console.log(index);
        }
    });
 
});


(function(){
    $.fn.pageTranslate = function (options) {
        var defaults = {
            looping: true,
            callback: function (index) {}
        }
        var opts = $.extend(defaults, options);
        var startY, endY, translateY, scaleV = 1, _page, _index;
        var translateH = $(window).height();
        var page = $(this);

        $(page).on('touchstart',function (e) {
            startY = e.touches[0].clientY;
        });

        $(page).on('touchmove',function (e) {
            e.preventDefault();
            endY = e.touches[0].clientY;
            translateY = (startY - endY);
            scaleV = 1 - Math.abs(startY - endY) / 2000; //缩放值
            _page = $(this);
            _index = _page.index();

            //如果是第一个场景禁止向下转场
            if(_index == 0 && translateY < 0) return false;

            _page.css({
                '-webkit-transform': 'scale(' + scaleV + ') translate3d(0px,'+ -translateY + 'px' +',0px)',
                '-webkit-transition': 'all 0s ease-in-out'
            });

            if(translateY > 0){
                //向上
                if(_index == (page.length-1)){
                    //如果是最后一个，转回第一个
                    page.eq(0).css({
                        '-webkit-transform': 'translate3d(0px,'+  (translateH-translateY) + 'px' +',0px)',
                        '-webkit-transition': 'all 0s ease-in-out'
                    }).addClass('active');
                }else{
                    _page.next().css({
                        '-webkit-transform': 'translate3d(0px,'+  (translateH-translateY) + 'px' +',0px)',
                        '-webkit-transition': 'all 0s ease-in-out'
                    }).addClass('active');
                }
            }else{ 
                //向下
                _page.prev().css({
                    '-webkit-transform': 'translate3d(0px,'+  (-translateH-translateY) + 'px' +',0px)',
                    '-webkit-transition': 'all 0s ease-in-out'
                }).addClass('active');
            }
        });

        $(page).on('touchend',function (e) {
            _page = $(this);

            //如果是第一个场景禁止向下转场
            if(_index == 0 && translateY < 0) {
                page.removeAttr('style');
                _page.next().removeClass('active')
                return false;
            }
            
            if(translateY > 0){
                _page.css({
                    '-webkit-transform': 'scale('+ scaleV +') translate3d(0px,'+ -translateH  + 'px' +',0px)',
                    '-webkit-transition': 'all .3s ease-in-out'
                });
                if(_index == (page.length-1) && opts.looping == true){
                    //如果是最后一个，转回第一个
                    page.eq(0).css({
                        '-webkit-transform': 'translate3d(0px,0px,0px)',
                        '-webkit-transition': 'all .3s ease-in-out'
                    });
                }else{
                    _page.next().css({
                        '-webkit-transform': 'translate3d(0px,0px,0px)',
                        '-webkit-transition': 'all .3s ease-in-out'
                    });
                }
            }else{
                 _page.css({
                    '-webkit-transform': 'scale('+ scaleV +') translate3d(0px,'+ translateH  + 'px' +',0px)',
                    '-webkit-transition': 'all .3s ease-in-out'
                });
            
                 _page.prev().css({
                    '-webkit-transform': 'translate3d(0px,0px,0px)',
                    '-webkit-transition': 'all .3s ease-in-out'
                })
            }
            setTimeout(function () {
                _page.removeClass('active').removeAttr('style');
                page.removeAttr('style');
                opts.callback(_index);
            },300);
        });  
    }
})();