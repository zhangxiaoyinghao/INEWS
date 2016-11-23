window.onload = function () {
    var maxHeight = window.screen.height + "px";
    document.getElementById("item-content").style.cssText="max-height:"+maxHeight+";overflow-y:auto";
    var getElementsByClassName = function (className, tag, elm){
        if (document.getElementsByClassName) {
            getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for(var i=0, il=elements.length; i<il; i+=1){
                    current = elements[i];
                    if(!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        else if (document.evaluate) {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                for(var j=0, jl=classes.length; j<jl; j+=1){
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try	{
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        }
        else {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
                    current = elements[l];
                    match = false;
                    for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return getElementsByClassName(className, tag, elm);
    };
    var contentCurrentId=1;  //当前海报
    var categoryCurrentId=1;    // 当前记录 菜单栏上下移动时赋值
    var filterCurrentId=0;  // 当前栏目筛选项 上下左右移动筛选项时赋值
    var totalCount=getElementsByClassName("item","li",document).length;           //栏目数
    // 每个海报高度
    var singleHeight = getid("item-area-"+categoryCurrentId).getElementsByTagName("li")[0].offsetHeight;
    //每个类别的内容数
    var totalContentCount=getElementsByClassName("item-content-sub","div",getid("item-area-"+categoryCurrentId)).length;
    var totalFilterCount=getElementsByClassName("filter-sub","li",document).length;  //总的栏目筛选项;
    var currentType="content";  //初始焦点呈现区左上侧第一张海报
    var titleLength =getElementsByClassName("scroll_div","div",document)[0].offsetWidth;
    //添加选中样式
    var flag="";
    var scrollFlag={};



    function addClass(className,currentId,tag) {
        if(currentType=="content"){
            var itemContentSub = getElementsByClassName("item-content-sub","div",getid("item-area-"+categoryCurrentId))[currentId-1];
            itemContentSub.className+=" active";
            //视频标题左右滚动
            flag="true";
              if(itemContentSub.querySelector(".item-msg")){
                scrollFlag = getElementsByClassName("scroll_begin","p",itemContentSub)[0];
                if(scrollFlag.offsetWidth > getElementsByClassName("scroll_div","div",itemContentSub)[0].offsetWidth){
                    var scroll_begin = getElementsByClassName("scroll_begin","p",itemContentSub)[0];
                    var scroll_end = getElementsByClassName("scroll_end","p",itemContentSub)[0];
                    var scroll_div = getElementsByClassName("scroll_div","div",itemContentSub)[0];
                    scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
                }
            }
        }
        getElementsByClassName(className,tag,document)[currentId-1].className+=" active";
    }
    // 给第一张海报加定时器
    var firstInterval = getid("item-area-1");
    if(getElementsByClassName("scroll_begin","p",firstInterval)[0].offsetWidth > getElementsByClassName("scroll_div","div",firstInterval)[0].offsetWidth){
        var scroll_begin = getElementsByClassName("scroll_begin","p",firstInterval)[0];
        var scroll_end = getElementsByClassName("scroll_end","p",firstInterval)[0];
        var scroll_div = getElementsByClassName("scroll_div","div",firstInterval)[0];
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
            removeClass("active","item-content-sub",contentCurrentId,"div");
            contentCurrentId=contentCurrentId-1;
            addClass("item-content-sub",contentCurrentId,"div");

            //需要移动滚动条的时候
            if(contentCurrentId < totalContentCount-4){
                moveScroll("up",categoryCurrentId,contentCurrentId  );
            }

        }else if(currentType=="content" && contentCurrentId==1 ){
            removeClass("active","item-content-sub",contentCurrentId,"div");
            currentType="menu";
            addClass("item-child",categoryCurrentId,"span");
        }else if(currentType=="filterItem" && filterCurrentId!=1){
            removeClass("active","filter-sub",filterCurrentId,"li");
            filterCurrentId=filterCurrentId-1;
            addClass("filter-sub",filterCurrentId,"li");
        }else if(currentType=="filterItem" && filterCurrentId==1){
            removeClass("active","filter-sub",filterCurrentId,"li");
            currentType="filter";
        }
    }
    // 右键
    function fun_right(){
        if( currentType=="content" && contentCurrentId<totalContentCount ){
            removeClass("active","item-content-sub",contentCurrentId,"div");
            contentCurrentId=contentCurrentId+1;
            addClass("item-content-sub",contentCurrentId,"div");
            //需要移动滚动条的时候
            if(contentCurrentId > 6){
                moveScroll("down",categoryCurrentId,contentCurrentId);
            }
        }else if(currentType=="menu" ){
            currentType="content";
            contentCurrentId=1;
            removeClass("active","item-content-sub",contentCurrentId,"div");
            addClass("item-content-sub",contentCurrentId,"div");
        }else if(currentType=="filter" ){
            if(getid("filter-items").getAttribute("class")==" content-block"){
                currentType="filterItem";
                filterCurrentId = 1;
                addClass("filter-sub",filterCurrentId,"li");
            }else{
                currentType="content";
                contentCurrentId=1;
                getid("item-filter").setAttribute("class", "");
                addClass("item-content-sub",contentCurrentId,"div");
            }
        } else if(currentType=="filterItem" && filterCurrentId<totalFilterCount){

            if(filterCurrentId == 0){
                filterCurrentId = 1;
                addClass("filter-sub",filterCurrentId,"li");
            }else{
                removeClass("active","filter-sub",filterCurrentId,"li");
                filterCurrentId=filterCurrentId+1;
                addClass("filter-sub",filterCurrentId,"li");
            }

        }
    }
    // 上键
    function fun_up(){
        if( currentType=="content" && contentCurrentId>2){
            removeClass("active","item-content-sub",contentCurrentId,"div");
            contentCurrentId=contentCurrentId-2;
            addClass("item-content-sub",contentCurrentId,"div");
            /* 滚动条向上移动*/
            moveScroll("up",categoryCurrentId,contentCurrentId);
        }else if( currentType=="content" && contentCurrentId<=2){
            return;
        }else if(currentType=="menu" && categoryCurrentId!=1 ){
            removeClass("active","item-child",categoryCurrentId,"span");
            // 切换内容区
            getid("item-area-"+categoryCurrentId).setAttribute("class", "item-area");
            categoryCurrentId=categoryCurrentId-1;
            addClass("item-child",categoryCurrentId,"span");
            getid("item-area-"+categoryCurrentId).className+=" content-block";
            contentCurrentId=1;
            //更新内容数量
            var itemArea = getid("item-area-"+categoryCurrentId);
            totalContentCount = getElementsByClassName("item-content-sub","div",itemArea).length;
        }else if(currentType=="menu" && categoryCurrentId==1 ){
            currentType="filter";
            removeClass("active","item-child",categoryCurrentId,"span");
            getid("item-filter").className+=" active";

        }else if(currentType=="filterItem" && filterCurrentId>9){
            removeClass("active","filter-sub",filterCurrentId,"li");
            filterCurrentId=filterCurrentId-9;
            addClass("filter-sub",filterCurrentId,"li");
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
            addClass("item-child",categoryCurrentId,"span");
        }else if( currentType=="content" && contentCurrentId<= (totalContentCount - 2) ){
                    removeClass("active","item-content-sub",contentCurrentId,"div");
                    contentCurrentId=contentCurrentId+2;
                    if(contentCurrentId>totalContentCount){
                        contentCurrentId=contentCurrentId-2;
                        addClass("item-content-sub",contentCurrentId,"div");
                    }else{
                        addClass("item-content-sub",contentCurrentId,"div");
                    }
                   /* 滚动条向下移动*/
                    moveScroll("down",categoryCurrentId,contentCurrentId);

        }else if(currentType=="menu" && categoryCurrentId!=totalCount ){
            removeClass("active","item-child",categoryCurrentId,"span");
            getid("item-area-"+categoryCurrentId).setAttribute("class", "item-area");

            categoryCurrentId=categoryCurrentId+1;
            addClass("item-child",categoryCurrentId,"span");
            getid("item-area-"+categoryCurrentId).className+=" content-block";
            contentCurrentId=1;
            //更新内容数量
            var itemArea = getid("item-area-"+categoryCurrentId);
            totalContentCount = getElementsByClassName("item-content-sub","div",itemArea).length;

        }else if(currentType=="filterItem" && filterCurrentId<=(totalFilterCount-9)){
            removeClass("active","filter-sub",filterCurrentId,"li");
            filterCurrentId=filterCurrentId+9;
            addClass("filter-sub",filterCurrentId,"li");
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
    function removeClass(removeClassName,className,currentId,tag){
        // 获取当前选中项的class值
        var classNames =getElementsByClassName(className,tag,document)[currentId-1].className;
            classNames=classNames.replace(/(^\s*)|(\s*$)/g, "");
        var classNameArr = classNames.split(" ");
        var okClassNames = "";
        for (var ii = 0; ii < classNameArr.length; ii++) {
            if(!(classNameArr[ii]==removeClassName)){
                okClassNames+=" "+classNameArr[ii];
            }
        }
        if(currentType=="content"){
            var itemContentSub = getElementsByClassName("item-content-sub","div",getid("item-area-"+categoryCurrentId))[currentId-1];
            itemContentSub.className=okClassNames;
            //停止视频标题左右滚动
            flag="false";
            if(itemContentSub.querySelector(".item-msg")){
                if(getElementsByClassName("scroll_begin","p",itemContentSub)[0].offsetWidth > getElementsByClassName("scroll_div","div",itemContentSub)[0].offsetWidth){
                    var scroll_begin = getElementsByClassName("scroll_begin","p",itemContentSub)[0];
                    var scroll_end = getElementsByClassName("scroll_end","p",itemContentSub)[0];
                    var scroll_div = getElementsByClassName("scroll_div","div",itemContentSub)[0];
                    scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag);
                }
            }
            

        }
        getElementsByClassName(className,tag,document)[currentId-1].className=okClassNames;
    }

    //滚动条移动
    function moveScroll(dir,categoryCurrentId,contentCurrentId) {
        //当前选中的节目项
        var itemContentSub = getElementsByClassName("item-content-sub","div",getid("item-area-"+categoryCurrentId))[contentCurrentId-1];
        //当前项到父元素顶部的距离
        var topDistance = itemContentSub.parentNode.getBoundingClientRect().top;
        // 海报内容区
        var itemContent = getid("item-content");
        // 每次点击滚动条移动的距离
        if(dir=="down" && topDistance >= singleHeight*2){
            // 动态改变滚动条位置(向下)
            itemContent.scrollTop += singleHeight;
        }else if(dir=="up" && topDistance<0){
            // 动态改变滚动条位置(向上)
            itemContent.scrollTop -= singleHeight;
        }
    }

    // 视频标题左右滚动

    function scrollAble(scroll_begin,scroll_end,scroll_div,flag,scrollFlag) {
        var speed=20;
        scroll_end.innerHTML= "<span style='display: inline-block' class='title-length'></span>"+scroll_begin.innerHTML+"<span style='display: inline-block' class='title-length'></span>";
        getElementsByClassName("title-length","span",document)[0].style.width=titleLength+"px";
        getElementsByClassName("title-length","span",document)[1].style.width=titleLength+"px";
        
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
            removeClass("active","filter-sub",filterCurrentId,"li");
            getid("filter-items").setAttribute("class", "");
            filterCurrentId=0;
        }else{
            getid("filter-items").setAttribute("class", "");
        }

    }

};