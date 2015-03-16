define('common',['page-translate'],function(require, exports, module){
    console.log("common");
    return {
        pageTrans:function(){
            $('#transPage').pageTranslate({
                page: '.m-page',    //切换场景的元素
                callback: function (index) {    //切换完执行的回调
                    console.log(index);
                }
            });
        }
    }
});
