window.onload = function () {
    var maxHeight = window.screen.height + "px";
    document.getElementById("item-content").style.cssText="max-height:"+maxHeight+";overflow-y:auto";

    var contentCurrentId=1;  //当前海报
    var categoryCurrentId=1;    // 当前记录 菜单栏上下移动时赋值
    var filterCurrentId=0;  // 当前栏目筛选项 上下左右移动筛选项时赋值
    var totalCount=document.getElementsByClassName("item").length;           //栏目数
    // 每个海报高度
    var singleHeight = getid("item-area-"+categoryCurrentId).getElementsByTagName("li")[0].offsetHeight;
    //每个类别的内容数
    var totalContentCount=getid("item-area-"+categoryCurrentId).getElementsByClassName("item-content-sub").length;
    var totalFilterCount=document.getElementsByClassName("filter-sub").length;  //总的栏目筛选项
    var currentType="content";  //初始焦点呈现区左上侧第一张海报
    var titleLength = document.getElementsByClassName("scroll_div")[0].offsetWidth;
    //添加选中样式
    var flag="";
    var scrollFlag={};


    function addClass(className,currentId) {
        if(currentType=="content"){
            var itemContentSub = getid("item-area-"+categoryCurrentId).getElementsByClassName("item-content-sub")[currentId-1];
            itemContentSub.className+=" active";
            //视频标题左右滚动
            flag="true";
              if(itemContentSub.querySelector(".item-msg")){
                scrollFlag = itemContentSub.getElementsByClassName("scroll_begin")[0];
                if(itemContentSub.getElementsByClassName("scroll_begin")[0].offsetWidth > itemContentSub.getElementsByClassName("scroll_div")[0].offsetWidth){
                    var scroll_begin = itemContentSub.getElementsByClassName("scroll_begin")[0];
                    var scroll_end = itemContentSub.getElementsByClassName("scroll_end")[0];
                    var scroll_div = itemContentSub.getElementsByClassName("scroll_div")[0];
                    scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
                }
            }
        }
        document.getElementsByClassName(className)[currentId-1].className+=" active";
    }
    // 给第一张海报加定时器
    var firstInterval = getid("item-area-1");
    if(firstInterval.getElementsByClassName("scroll_begin")[0].offsetWidth > firstInterval.getElementsByClassName("scroll_div")[0].offsetWidth){
        var scroll_begin = firstInterval.getElementsByClassName("scroll_begin")[0];
        var scroll_end = firstInterval.getElementsByClassName("scroll_end")[0];
        var scroll_div = firstInterval.getElementsByClassName("scroll_div")[0];
        scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
    }

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
                moveScroll("up",categoryCurrentId,contentCurrentId  );
            }

        }else if(currentType=="content" && contentCurrentId==1 ){
            removeClass("active","item-content-sub",contentCurrentId);
            currentType="menu";
            addClass("item-child",categoryCurrentId);
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
                moveScroll("down",categoryCurrentId,contentCurrentId);
            }
        }else if(currentType=="menu" ){
            currentType="content";
            contentCurrentId=1;
            removeClass("active","item-content-sub",contentCurrentId);
            addClass("item-content-sub",contentCurrentId);
        }else if(currentType=="filter" ){
            if(getid("filter-items").getAttribute("class")==" content-block"){
                currentType="filterItem";
                filterCurrentId = 1;
                addClass("filter-sub",filterCurrentId);
            }else{
                currentType="content";
                contentCurrentId=1;
                getid("item-filter").setAttribute("class", "");
                addClass("item-content-sub",contentCurrentId);
            }
        } else if(currentType=="filterItem" && filterCurrentId<totalFilterCount){

            if(filterCurrentId == 0){
                filterCurrentId = 1;
                addClass("filter-sub",filterCurrentId);
            }else{
                removeClass("active","filter-sub",filterCurrentId);
                filterCurrentId=filterCurrentId+1;
                addClass("filter-sub",filterCurrentId);
            }

        }
    }
    // 上键
    function fun_up(){
        if( currentType=="content" && contentCurrentId>2){
            removeClass("active","item-content-sub",contentCurrentId);
            contentCurrentId=contentCurrentId-2;
            addClass("item-content-sub",contentCurrentId);
            /* 滚动条向上移动*/
            moveScroll("up",categoryCurrentId,contentCurrentId);
        }else if( currentType=="content" && contentCurrentId<=2){
            return;
        }else if(currentType=="menu" && categoryCurrentId!=1 ){
            removeClass("active","item-child",categoryCurrentId);
            // 切换内容区
            getid("item-area-"+categoryCurrentId).setAttribute("class", "item-area");
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
            getid("item-filter").setAttribute("class", "");
            filterItemHide();
            currentType="menu";
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
                    moveScroll("down",categoryCurrentId,contentCurrentId);

        }else if(currentType=="menu" && categoryCurrentId!=totalCount ){
            removeClass("active","item-child",categoryCurrentId);
            getid("item-area-"+categoryCurrentId).setAttribute("class", "item-area");

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
        if(currentType=="content"){
            alert("type:"+currentType+" 视频类型："+document.getElementById("item-area-"+categoryCurrentId).id+" =>Id:"+contentCurrentId)
        }else if(currentType=="filter"){
            currentType="filterItem";
            getid("filter-items").className+=" content-block";
        }
    }
    // 返回键
    function fun_back() {
        if(currentType=="filterItem" || currentType=="filter"){
            filterItemHide();
            currentType="filter"
        }
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
            if(itemContentSub.querySelector(".item-msg")){
                if(itemContentSub.getElementsByClassName("scroll_begin")[0].offsetWidth > itemContentSub.getElementsByClassName("scroll_div")[0].offsetWidth){
                    var scroll_begin = itemContentSub.getElementsByClassName("scroll_begin")[0];
                    var scroll_end = itemContentSub.getElementsByClassName("scroll_end")[0];
                    var scroll_div = itemContentSub.getElementsByClassName("scroll_div")[0];
                    scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
                }
            }

        }
        document.getElementsByClassName(className)[currentId-1].className=okClassNames;
    }

    //滚动条移动
    function moveScroll(dir,categoryCurrentId,contentCurrentId) {
        //当前选中的节目项
        var itemContentSub = getid("item-area-"+categoryCurrentId).getElementsByClassName("item-content-sub")[contentCurrentId-1];
        //当前项到父元素顶部的距离
        var topDistance = itemContentSub.parentNode.getBoundingClientRect().top;
        //获取窗口高度
        var winHeight = window.screen.height - 125;
        // 海报内容区
        var itemContent = getid("item-content");
        // 垂直方向海报数量
        var num = Math.ceil(totalContentCount/2);
        // 海报内容总高度
        var contentHeight = singleHeight * num;
        // 滚动条当前位置
        var $top = itemContent.scrollTop;
        // 滚动条的总高度
        var totalScroll = getid("item-content").scrollHeight;
        // 每次点击滚动条移动的距离
        var itemHeight = (totalScroll - winHeight)/(num-3.4);
        if(dir=="down" && topDistance >= singleHeight*2){
            // 动态改变滚动条位置(向下)
            itemContent.scrollTop += itemHeight;
            //console.log("当前项到父元素顶部的距离"+topDistance+"向下滚动")
        }else if(dir=="up" && topDistance<0){
            // 动态改变滚动条位置(向上)
            itemContent.scrollTop -= (itemHeight-1);
            //console.log("当前项到父元素顶部的距离"+topDistance+"向上滚动")
        }
    }

    // 视频标题左右滚动

    function scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag) {
        var speed=20;
        scroll_end.innerHTML= "<span style='display: inline-block' class='title-length'></span>"+scroll_begin.innerHTML+"<span style='display: inline-block' class='title-length'></span>";
        //$(".title-length").css("width",titleLength);
        document.getElementsByClassName("title-length")[0].style.width=titleLength+"px";
        document.getElementsByClassName("title-length")[1].style.width=titleLength+"px";
        function stopScroll() {
            clearInterval(scrollFlag.MyMar);
        }
        if(flag=="false"){
            stopScroll();
            scroll_div.scrollLeft=0;
        }else{
            scrollFlag.MyMar=setInterval(Marquee,speed);
            function Marquee(){
                var leftWidth = scroll_end.offsetWidth + scroll_begin.offsetWidth - scroll_div.offsetWidth;
                if(leftWidth <= scroll_div.scrollLeft){
                    scroll_div.scrollLeft-=(scroll_end.offsetWidth - scroll_div.offsetWidth);
                } else{
                    scroll_div.scrollLeft++;
                }
            }
        }
    }
    //按A字母键弹框，测试用
    function warn_alert() {
        getid("warn-message").style.display="block";
        setTimeout(function(){
            getid("warn-message").style.display="none";
        }, 3000);
    }
    //筛选内容消失
    function filterItemHide() {
        if(filterCurrentId > 0){
            removeClass("active","filter-sub",filterCurrentId);
            getid("filter-items").setAttribute("class", "");
            filterCurrentId=0;
        }else{
            getid("filter-items").setAttribute("class", "");
        }

    }

};