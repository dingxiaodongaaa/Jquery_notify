$(function() {
    //定义第一个通知弹窗的起始top值
    var firstTop = 16;
    //下一个弹窗的其实top值，初始化为firstTop
    var nextTop = 16;
    //定义每个通知弹窗之间的上下间隔值
    var intervalTop = 16;
    //每一个弹窗的id，设置自动消失定时器的时候，会用来区分不同弹窗自己的定时器
    var notifyIndex = 1;
    //自动消失定时器容器
    var autoHideIntervalArr = [];

    $(".notifyWarnning").click(function(){
        $("body").append(`<div class="notifyContainer index_${notifyIndex}">
                <img class="closeNotify" src="./notification/images/closeNotify.png" alt="">
                <div class="notifyContent">回复靠的就是复合肥肯定是福克斯的家伙付款后都是空 粉红色的疯狂的缩进符号放得开首付款后SDK</div>
            </div>`);
        let notifyContainerLi = $('.notifyContainer');
        notifyContainerLi.eq(notifyContainerLi.length - 1).css("top",nextTop);
        notifyContainerLi.eq(notifyContainerLi.length - 1).animate({"right":10}, { duration: 2, queue: false})
        //更新下一个弹窗的起始top值
        let thisHeight = notifyContainerLi.eq(notifyContainerLi.length - 1).outerHeight();
        nextTop = nextTop + thisHeight + intervalTop;
        //给弹窗添加自己的自动消失定时器
        autoHideIntervalArr[notifyIndex] = setInterval(function(){
            let index = notifyIndex;
            notifyContainerLi.eq(notifyContainerLi.length - 1).find(".closeNotify").trigger("click");
            //关闭弹窗之后清除定时器
            clearInterval(autoHideIntervalArr[index]);
        },4500)
        //弹窗id自动递增
        notifyIndex++;
    })
    //点击按钮关闭弹窗
    $("body").on("click",".closeNotify",function(){
        let thisNotifyContainer = $(this).parent(".notifyContainer");
        //立即更新下一个窗口的top值
        let thisHeight = thisNotifyContainer.outerHeight();
        nextTop = nextTop - thisHeight - intervalTop;
        //计算元素上移的距离
        let moveDistance = thisHeight + intervalTop;
        //获取下面的弹窗元素，删除之后上移
        let nextAllNotifyContainer = thisNotifyContainer.nextAll(".notifyContainer");
        //移动下面的元素
        thisNotifyContainer.animate({opacity:0}, { duration: 2, queue: false , complete:function(){
                //删除关闭的弹窗元素
                thisNotifyContainer.remove();
            }})
        for(let i = 0; i < nextAllNotifyContainer.length; i++){
            nextAllNotifyContainer.eq(i).animate({top:`-=${moveDistance}px`}, { duration: 2, queue: false  })
        }
    })
});