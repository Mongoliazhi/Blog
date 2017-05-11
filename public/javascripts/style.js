$(function(){
    $(window).bind("scroll", function () {
        var top = $(this).scrollTop(); // 当前窗口的滚动距离
    });

//   header中右导航栏
    $(".header_img2").click(function(event){
        event.stopPropagation();
        $(".header_right").animate({
            right:'0'
        })
    })
    $("body").click(function(){
        $(".header_right").animate({
            right:'-10rem'
        })
    })
    $(".header_right").click(function(event){
        event.stopPropagation();
    })


    //屏幕伸缩改变content_right的位置
    //function resize(){
    //    if($(window).width()<640){
    //        //console.log("1");
    //        $(".content_right").css("left","0");
    //    }
    //    else if($(window).width()>1200){
    //        var a=$(".content_left").offset().left+900;
    //        $(".content_right").css("left",a);
    //    }else {
    //        $(".content_right").css("left","75%");
    //    }
    //}
    //resize();

    window.onresize = function(){
        //console.log($('body').width());
        //resize();
        content_right();//屏幕伸缩时调用从新调用 content_right_close关闭右侧导航栏 函数
        win_height()
    };

    //点击.content_right_close关闭右侧导航栏
    function content_right(){
        $(".content_right_close").click(function(){
            var this_width=$(window).width();
            //$(".content_right").animate({
            //    left:this_width
            //},500)
            $(".content_right").slideUp("slow");
            $(".content_left").animate({
                width:"98%"
            },500)
            $(".content_right_open").show();
        })
        $(".content_right_open").click(function(){
            var a=$(".content_left").offset().left+900;
            $(".content_right").slideDown("slow");
            $(".content_left").animate({
                width:"75%"
            },500)
            $(".content_right_open").hide();
        })
    }
    content_right();

    //获取屏幕的宽度
    function win_height(){
        var win_height=$(window).height();
        //console.log(window.location.pathname)
        if(window.location.pathname=="/home"){
            $(".content").css("marginTop",win_height);
        }
    }
    win_height()


    function makeDate(date) {
        try {
            var newDate = new Date(date);
            //在小于10的月份前补0
            var month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
            //在小于10的日期前补0
            var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
            //在小于10的小时前补0
            var hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
            //在小于10的分钟前补0
            var minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
            //在小于10的秒数前补0
            var seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds();
            //拼接时间
            var stringDate = newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
        }catch(e){
            var stringDate = "0000-00-00 00:00:00";
        }finally{
            return stringDate;
        }

    };


})
