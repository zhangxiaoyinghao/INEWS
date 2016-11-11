$(function () {
    var contentCurrentId=1;  //当前海报
    var categoryCurrentId=1;    // 当前记录
    var categorySelectedId=1;  // 历史选中记录
    var filterCurrentId=1;  // 当前栏目筛选项
    var totalCount=document.getElementsByClassName("item").length;           //栏目数
    var totalContentCount=12;   //内容数
    var totalFilterCount=document.getElementsByClassName("filter-sub").length;  //总的栏目筛选项
    var currentType="content";  //初始焦点呈现区左上侧第一张海报
    /*
    * currentType="content"  当前焦点在呈现区上
    * currentType="menu"   当前焦点在左侧菜单上
    * currentType="filter"  当前焦点在左侧筛选按钮上
    * currentType="filterItem"  当前焦点在筛选内容上
    * */
    document.onkeydown=jumpPage;
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
    }
    // 左键
    function fun_left(){
        // 内容区，并且不是第一个
        if( currentType=="content" && contentCurrentId!=1 ){
            removeClass("item-content-sub-active","content-"+contentCurrentId);
            contentCurrentId=contentCurrentId-1;
            document.getElementById("content-"+contentCurrentId).className+=" item-content-sub-active";
        }else if(currentType=="content" && contentCurrentId==1 ){
            currentType="menu";
            removeClass("item-content-sub-active","content-"+contentCurrentId);
            removeClass("category-selected","category-menu-"+categorySelectedId);
            categorySelectedId=categoryCurrentId;
            document.getElementById("category-menu-"+categorySelectedId).className+=" item-content-sub-active";
        }else if(currentType=="filterItem" && filterCurrentId!=1){
            removeClass("item-content-sub-active","filter-"+filterCurrentId);
            filterCurrentId=filterCurrentId-1;
            document.getElementById("filter-"+filterCurrentId).className+=" item-content-sub-active";
        }
    }
    // 右键
    function fun_right(){
        if( currentType=="content" && contentCurrentId<totalContentCount ){
            removeClass("item-content-sub-active","content-"+contentCurrentId);
            contentCurrentId=contentCurrentId+1;
            document.getElementById("content-"+contentCurrentId).className+=" item-content-sub-active";
        }else if(currentType=="menu" ){
            currentType="content";
            removeClass("item-content-sub-active","content-"+contentCurrentId);
            document.getElementById("content-"+contentCurrentId).className+=" item-content-sub-active";
        }
        /*else if(currentType=="filter"){
            currentType="filterItem";
            document.getElementById("filter-"+filterCurrentId).className+=" item-content-sub-active";
        }*/
        else if(currentType=="filterItem" && filterCurrentId<totalFilterCount){
            removeClass("item-content-sub-active","filter-"+filterCurrentId);
            filterCurrentId=filterCurrentId+1;
            document.getElementById("filter-"+filterCurrentId).className+=" item-content-sub-active";
        }
    }
    // 上键
    function fun_up(){
        if( currentType=="content" && contentCurrentId>2){
            removeClass("item-content-sub-active","content-"+contentCurrentId);
            contentCurrentId=contentCurrentId-2;
            document.getElementById("content-"+contentCurrentId).className+=" item-content-sub-active";
        }else if( currentType=="content" && contentCurrentId<=2){
            return;
        }else if(currentType=="menu" && categoryCurrentId!=1 ){
            removeClass("item-content-sub-active","category-menu-"+categoryCurrentId);
            $(document.getElementById("item-area-"+categoryCurrentId)).removeClass("content-block");
            categoryCurrentId=categoryCurrentId-1;
            document.getElementById("category-menu-"+categoryCurrentId).className+=" item-content-sub-active";
            document.getElementById("item-area-"+categoryCurrentId).className+=" content-block";
        }else if(currentType=="menu" && categoryCurrentId==1 ){
            currentType="filter";
            removeClass("item-content-sub-active","category-menu-"+categoryCurrentId);
            document.getElementById("item-filter").className+=" item-content-sub-active";
        }else if(currentType=="filterItem" && filterCurrentId>9){
            removeClass("item-content-sub-active","filter-"+filterCurrentId);
            filterCurrentId=filterCurrentId-9;
            document.getElementById("filter-"+filterCurrentId).className+=" item-content-sub-active";
        }
    }
    // 下键
    function fun_down(){
        if(currentType=="filter"){
            currentType="menu";
            $(document.getElementById("filter-items")).removeClass("content-block");
            $(document.getElementById("item-filter")).removeClass("item-content-sub-active");
            contentCurrentId = 1;
            categoryCurrentId = 1;
            document.getElementById("category-menu-"+categoryCurrentId).className+=" item-content-sub-active";
        }else if( currentType=="content" && contentCurrentId<= (totalContentCount - 2) ){
                    removeClass("item-content-sub-active","content-"+contentCurrentId);
                    contentCurrentId=contentCurrentId+2;
                    if(contentCurrentId>totalContentCount){
                        contentCurrentId=contentCurrentId-2;
                        document.getElementById("content-"+contentCurrentId).className+=" item-content-sub-active";
                    }else{
                        document.getElementById("content-"+contentCurrentId).className+=" item-content-sub-active";
                    }
                   /* 滚动条移动*/
                    moveScroll("down");
                    
        }else if(currentType=="menu" && categoryCurrentId!=totalCount ){
            removeClass("item-content-sub-active","category-menu-"+categoryCurrentId);
            $(document.getElementById("item-area-"+categoryCurrentId)).removeClass("content-block");
            categoryCurrentId=categoryCurrentId+1;
            document.getElementById("category-menu-"+categoryCurrentId).className+=" item-content-sub-active";
            document.getElementById("item-area-"+categoryCurrentId).className+=" content-block";
        }else if(currentType=="filterItem" && filterCurrentId<=(totalFilterCount-9)){
            removeClass("item-content-sub-active","filter-"+filterCurrentId);
            filterCurrentId=filterCurrentId+9;
            document.getElementById("filter-"+filterCurrentId).className+=" item-content-sub-active";
        }
    }
    // 确认键
    function fun_enter(){
        if(currentType=="menu"){
            alert("type:"+currentType+"=>Id:"+categoryCurrentId);
        }else if(currentType=="content"){
            alert("type:"+currentType+"=>Id:"+contentCurrentId)
        }else if(currentType=="filter"){
            currentType="filterItem";
            document.getElementById("filter-"+filterCurrentId).className+=" item-content-sub-active";
            document.getElementById("filter-items").className+=" content-block";
        }else if(currentType=="filterItem"){
            alert("type:"+currentType+"=>Id:"+filterCurrentId)
        }
    }
    // 返回键
    function fun_back() {
        if(currentType=="filterItem"){
            $(document.getElementById("filter-items")).removeClass("content-block");
            currentType="filter"
        }
    }

    function removeClass(removeClassName,selectedId){
        var classNames = document.getElementById(selectedId).className;
        classNames=classNames.replace(/(^\s*)|(\s*$)/g, "");
        var classNameArr = classNames.split(" ");
        var okClassNames = "";
        for (var ii = 0; ii < classNameArr.length; ii++) {
            if(!(classNameArr[ii]==removeClassName)){
                okClassNames+=" "+classNameArr[ii];
            }
        }
        document.getElementById(selectedId).className=okClassNames;
    }
    //滚动条移动
    function moveScroll(dir) {
        if(dir=="down"){
            var $itemContent = $("#item-content");
            /*var $top = $itemContent.scrollTop();
            alert($top);*/
            $itemContent[0].scrollTop+=200;
        }
        if(dir=="up"){
            var $itemContent = $("#item-content");
            /*var $top = $itemContent.scrollTop();
             alert($top);*/
            $itemContent[0].scrollTop+=200;
        }
    }
});