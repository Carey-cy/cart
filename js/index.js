$(function(){
    //全屏切换效果的初始化
    $('.container').fullpage({
        //配置参数，实现需要的效果
        //1.各个屏幕背景颜色的设置
        sectionsColor:['#fadd67','#84a2d4','#ef674d','#ffeedd','#d04759','#84d9ed','#8ac060'],
        //2.内容不要垂直居中(默认true，是垂直居中) 
        verticalCentered:false,
        //3.点状的页码导航 navigation 默认false是不显示的
        navigation:true,
        //7.让沙发下落与页面滚动速度一致 沙发动画1s 所以页面滚动时间调整1s
        scrollingSpeed:1000,
        //4.进入页面后执行动画 监听进入某一页面 回调函数
        afterLoad:function(link,index){
            $('.section').eq(index-1).addClass('now');
            
        },
        //6.离开某一屏时触发  
        //fullpage插件的回调函数 onLeave:function 
        //三个参数index(当前页面序号),nextindex(下一页面序号),direction(方向,向上滚动，向下滚动)
        onLeave:function(index,nextindex,direction){
            var currentSection = $('.section').eq(index-1)
            //当前是从第二屏到第三屏去
            if(index == 2 && nextindex == 3){
                //用css3做动画，我们还是用添加类的方法
                currentSection.addClass('leaved')
                //离开第三屏去往第四屏去
            }else if(index == 3 && nextindex==4){
                currentSection.addClass('leaved')
                //离开第5屏，去往第6屏
            }else if(index == 5 && nextindex == 6){
                currentSection.addClass('leaved');
                //同时在这个过程中还有一个第六屏的动画
                $('.section .box').addClass('show')
                 //离开第6屏，去往第7屏
            }else if(index == 6 && nextindex == 7){
                $('.section .star img').each(function(i,item){
                    //$(this)==$(item)
                    $('.section .text').addClass('show');
                    $(this).delay(i*0.5*1000).fadeIn()
                })
            }
        },
        //5.点击more 向下滑动到下一屏 fullpage插件中的moveSectionDown()
        //最好在组件初始化完毕或者插件内容渲染完毕
        afterRender:function(){
            //通过console.log(this),this中没有相应的api
            //通过$.fn自己封装方法 $.fn.fullpage.moveSectionDown()
            //注册点击事件
            $('.more').on('click',function(){
                $.fn.fullpage.moveSectionDown()
            })
            //8.第四屏过渡动画，购物车动画完成后执行的收货地址动画
            //监听动画是否完成 transitionend
            $('.screen04 .cart').on('transitionend',function(){
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            })
            //第八屏效果
            //1.手跟着鼠标动
            $('.screen08').on('mousemove',function(e){
                $('.screen08 .hand').css({
                    left:e.clientX - 190,
                    top:e.clientY - 20
                })
                 //2.点击再来一次，重置动画并且返回第一页
            }).find('.again').on('click',function(){
                //关于重置动画，先思考我们的动画如何形成的
                //1.添加了show,leaved,now之类的类
                //2.添加了css属性，这样做的实质是给元素添加了style属性
                //3.调用jQuery方法，show(),fadeIn()，实质也是添加了style属性。
                //3.1 show()====>display:block; fadeIn()====>display:inline
                //综上所述，只要一一清除这些就可以重置了
                $('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show');
                $('.content[style]').removeAttr('style');
                //跳回第一页 fullpage插件方法moveTo
                $.fn.fullpage.moveTo(1)
            })
           
        }

    })
})