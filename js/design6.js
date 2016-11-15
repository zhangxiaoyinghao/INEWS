$(function () {
    var contentCurrentId=1;  //当前海报
    var categoryCurrentId=1;    // 当前记录
    var categorySelectedId=1;  // 历史菜单选中记录
    var filterCurrentId=1;  // 当前栏目筛选项
    var totalCount=document.getElementsByClassName("item").length;           //栏目数
    //每个类别的内容数
    var totalContentCount=getid("item-area-"+categoryCurrentId).getElementsByClassName("item-content-sub").length;
    var totalFilterCount=document.getElementsByClassName("filter-sub").length;  //总的栏目筛选项
    var currentType="content";  //初始焦点呈现区左上侧第一张海报
    /*
    * currentType="content"  当前焦点在呈现区上
    * currentType="menu"   当前焦点在左侧菜单上
    * currentType="filter"  当前焦点在左侧筛选按钮上
    * currentType="filterItem"  当前焦点在筛选内容上
    * */
    document.onkeydown=jumpPage;
    function getid(id){
        return document.getElementById(id);
    }
    function jumpPage(event) {
        event = event || window.event;
        if (event.keyCode==37 || event.keyCode=="KEY_LEFT"){
            fun_left();//左
        }
        if (event.keyCode==38 || event.keyCode=="KEY_UP"){
            fun_up();//上
        }
        if (event.keyCode==39 || event.keyCode=="KEY_RIGHT" ){
            fun_right();//右
        }
        if (event.keyCode==40 || event.keyCode=="KEY_DOWN" ){
            fun_down();//下
        }
        if (event.keyCode==13 || event.keyCode=="KEY_ENTER"){
            fun_enter();//enter
        }
        if (event.keyCode==8){
            fun_back();//BackSpace
        }
        if (event.keyCode==65){
            warn_alert();//按A字母键弹框，测试用
        }
    }
    // 左键
    function fun_left(){
        // 内容区，并且不是第一个
        if( currentType=="content" && contentCurrentId!=1 ){
            removeClass("active","item-content-sub",contentCurrentId);
            contentCurrentId=contentCurrentId-1;
            addClass("item-content-sub",contentCurrentId);

            //需要移动滚动条的时候
            if(contentCurrentId < totalContentCount-4){
                moveScroll("up");
            }

        }else if(currentType=="content" && contentCurrentId==1 ){
            removeClass("active","item-content-sub",contentCurrentId);
            currentType="menu";
            categorySelectedId=categoryCurrentId;
            addClass("item-child",categorySelectedId);
        }else if(currentType=="filterItem" && filterCurrentId!=1){
            removeClass("active","filter-sub",filterCurrentId);
            filterCurrentId=filterCurrentId-1;
            addClass("filter-sub",filterCurrentId);
        }else if(currentType=="filterItem" && filterCurrentId==1){
            removeClass("active","filter-sub",filterCurrentId);
            currentType="filter";
        }
    }
    // 右键
    function fun_right(){
        if( currentType=="content" && contentCurrentId<totalContentCount ){
            removeClass("active","item-content-sub",contentCurrentId);
            contentCurrentId=contentCurrentId+1;
            addClass("item-content-sub",contentCurrentId);
            //需要移动滚动条的时候
            if(contentCurrentId > 6){
                moveScroll("down");
            }
        }else if(currentType=="menu" ){
            currentType="content";
            contentCurrentId=1;
            removeClass("active","item-content-sub",contentCurrentId);
            addClass("item-content-sub",contentCurrentId);
        }
        else if(currentType=="filterItem" && filterCurrentId<totalFilterCount){
            removeClass("active","filter-sub",filterCurrentId);
            filterCurrentId=filterCurrentId+1;
            addClass("filter-sub",filterCurrentId);
        }
    }
    // 上键
    function fun_up(){
        if( currentType=="content" && contentCurrentId>2){
            removeClass("active","item-content-sub",contentCurrentId);
            contentCurrentId=contentCurrentId-2;
            addClass("item-content-sub",contentCurrentId);
            /* 滚动条向上移动*/
            moveScroll("up");
        }else if( currentType=="content" && contentCurrentId<=2){
            return;
        }else if(currentType=="menu" && categoryCurrentId!=1 ){
            removeClass("active","item-child",categoryCurrentId);
            // 切换内容区
            $(getid("item-area-"+categoryCurrentId)).removeClass("content-block");
            categoryCurrentId=categoryCurrentId-1;
            addClass("item-child",categoryCurrentId);
            getid("item-area-"+categoryCurrentId).className+=" content-block";
            contentCurrentId=1;
            //更新内容数量
            var itemArea = getid("item-area-"+categoryCurrentId);
            totalContentCount=itemArea.getElementsByClassName("item-content-sub").length;
        }else if(currentType=="menu" && categoryCurrentId==1 ){
            currentType="filter";
            removeClass("active","item-child",categoryCurrentId);
            getid("item-filter").className+=" active";

        }else if(currentType=="filterItem" && filterCurrentId>9){
            removeClass("active","filter-sub",filterCurrentId);
            filterCurrentId=filterCurrentId-9;
            addClass("filter-sub",filterCurrentId);
        }
    }
    // 下键
    function fun_down(){
        if(currentType=="filter"){
            currentType="menu";
            $(getid("filter-items")).removeClass("content-block");
            $(getid("item-filter")).removeClass("active");
            contentCurrentId = 1;
            categoryCurrentId = 1;
            addClass("item-child",categoryCurrentId);
        }else if( currentType=="content" && contentCurrentId<= (totalContentCount - 2) ){
                    removeClass("active","item-content-sub",contentCurrentId);
                    contentCurrentId=contentCurrentId+2;
                    if(contentCurrentId>totalContentCount){
                        contentCurrentId=contentCurrentId-2;
                        addClass("item-content-sub",contentCurrentId);
                    }else{
                        addClass("item-content-sub",contentCurrentId);
                    }
                   /* 滚动条向下移动*/
                    moveScroll("down");
                    
        }else if(currentType=="menu" && categoryCurrentId!=totalCount ){
            removeClass("active","item-child",categoryCurrentId);
            $(getid("item-area-"+categoryCurrentId)).removeClass("content-block");

            categoryCurrentId=categoryCurrentId+1;
            addClass("item-child",categoryCurrentId);
            getid("item-area-"+categoryCurrentId).className+=" content-block";
            contentCurrentId=1;
            //更新内容数量
            var itemArea = getid("item-area-"+categoryCurrentId);
            totalContentCount=itemArea.getElementsByClassName("item-content-sub").length;

        }else if(currentType=="filterItem" && filterCurrentId<=(totalFilterCount-9)){
            removeClass("active","filter-sub",filterCurrentId);
            filterCurrentId=filterCurrentId+9;
            addClass("filter-sub",filterCurrentId);
        }
    }
    // 确认键
    function fun_enter(){
        if(currentType=="menu"){
            alert("type:"+currentType+"=>Id:"+categoryCurrentId);
        }else if(currentType=="content"){
            alert("type:"+currentType+" 视频类型："+document.getElementById("item-area-"+categoryCurrentId).id+" =>Id:"+contentCurrentId)
        }else if(currentType=="filter"){
            currentType="filterItem";
            addClass("filter-sub",filterCurrentId);
            getid("filter-items").className+=" content-block";
        }else if(currentType=="filterItem"){
            alert("type:"+currentType+"=>Id:"+filterCurrentId)
        }
    }
    // 返回键
    function fun_back() {
        if(currentType=="filterItem"){
            $(getid("filter-items")).removeClass("content-block");
            currentType="filter"
        }
    }
     //添加选中样式
    var flag="";
    var scrollFlag={};
    function addClass(className,currentId) {
        if(currentType=="content"){
            var itemContentSub = getid("item-area-"+categoryCurrentId).getElementsByClassName("item-content-sub")[currentId-1];
            itemContentSub.className+=" active";
            //视频标题左右滚动
            flag="true";
            scrollFlag = $(itemContentSub.getElementsByClassName("scroll_begin")[0]);
            if(itemContentSub.getElementsByClassName("scroll_begin")[0].offsetWidth > itemContentSub.getElementsByClassName("scroll_div")[0].offsetWidth){
                var scroll_begin = itemContentSub.getElementsByClassName("scroll_begin")[0];
                var scroll_end = itemContentSub.getElementsByClassName("scroll_end")[0];
                var scroll_div = itemContentSub.getElementsByClassName("scroll_div")[0];
                scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
            }
        }
        document.getElementsByClassName(className)[currentId-1].className+=" active";
    }
    //改变选中项样式
    function removeClass(removeClassName,className,currentId){
        // 获取当前选中项的class值
        var classNames = document.getElementsByClassName(className)[currentId-1].className;
        classNames=classNames.replace(/(^\s*)|(\s*$)/g, "");
        var classNameArr = classNames.split(" ");
        var okClassNames = "";
        for (var ii = 0; ii < classNameArr.length; ii++) {
            if(!(classNameArr[ii]==removeClassName)){
                okClassNames+=" "+classNameArr[ii];
            }
        }
        if(currentType=="content"){
            var itemContentSub = getid("item-area-"+categoryCurrentId).getElementsByClassName("item-content-sub")[currentId-1];
            itemContentSub.className=okClassNames;
            //停止视频标题左右滚动
            flag="false";
            if(itemContentSub.getElementsByClassName("scroll_begin")[0].offsetWidth > itemContentSub.getElementsByClassName("scroll_div")[0].offsetWidth){
                var scroll_begin = itemContentSub.getElementsByClassName("scroll_begin")[0];
                var scroll_end = itemContentSub.getElementsByClassName("scroll_end")[0];
                var scroll_div = itemContentSub.getElementsByClassName("scroll_div")[0];
                scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);

            }
        }
        document.getElementsByClassName(className)[currentId-1].className=okClassNames;
    }

    //滚动条移动
    function moveScroll(dir) {
        //获取窗口高度
        var $winHeight = $(window).height();
        // 海报内容区
        var $itemContent = $("#item-content");
        // 每个海报高度
        var singleHeight = $(".item-content-sub").height();
        // 垂直方向海报数量
        var num = Math.ceil(totalContentCount/2);
        // 海报内容总高度
        var $contentHeight = singleHeight * num;
        // 滚动条当前位置
        var $top = $itemContent.scrollTop();
        // 滚动条的总高度
        var totalScroll = $('#item-content')[0].scrollHeight;
        // 每次点击滚动条移动的距离
        var itemHeight = (totalScroll - $winHeight)/(num-1);
        if(dir=="down"){
            // 动态改变滚动条位置(向下)
            $itemContent[0].scrollTop += itemHeight;
        }else if(dir=="up"){
            // 动态改变滚动条位置(向上)
            $itemContent[0].scrollTop -= itemHeight;
        }
    }
    // 给第一张海报加定时器
    var firstInterval = getid("item-area-1");
    if(firstInterval.getElementsByClassName("scroll_begin")[0].offsetWidth > firstInterval.getElementsByClassName("scroll_div")[0].offsetWidth){
        var scroll_begin = firstInterval.getElementsByClassName("scroll_begin")[0];
        var scroll_end = firstInterval.getElementsByClassName("scroll_end")[0];
        var scroll_div = firstInterval.getElementsByClassName("scroll_div")[0];
        scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
    }
    // 视频标题左右滚动
    function scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag) {
        var speed=30;
        scroll_end.innerHTML=scroll_begin.innerHTML;
        function stopScroll() {
            clearInterval(scrollFlag.MyMar);
        }
        if(flag=="false"){
            stopScroll();
            scroll_div.scrollLeft=0;
        }else{
            scrollFlag.MyMar=setInterval(Marquee,speed);
            function Marquee(){
                if(scroll_end.offsetWidth <= scroll_div.scrollLeft){
                    scroll_div.scrollLeft-=scroll_begin.offsetWidth;
                } else{
                    scroll_div.scrollLeft++;
                }
            }
        }
    }
    //按A字母键弹框，测试用
    function warn_alert() {
        $("#warn-message").css("display","block");
        $('#warn-message').delay(3000).hide(0);
    }

});