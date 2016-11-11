$(function () {
    var tabs=$("#item-list").children(".item");
    var uls=$("#item-content").children(".item-area");
    /*筛选*/
    var filter = $("#item-filter");
    var filterItems = $("#filter-items");

    for(var i=0;i<tabs.length;i++){

        tabs[i].onclick=function(){change(this);}

    }
    /*内容区切换*/
    function change(obj){
        /*关闭栏目筛选项*/
        if(filter.hasClass("item-content-sub-active")){
            filter.removeClass("item-content-sub-active")
        }
        if(filterItems.hasClass("content-block")){
            filterItems.removeClass("content-block")
        }
        for(var i=0;i<tabs.length;i++)

        {

            if(tabs[i]==obj){

                $(tabs[i]).children("span").addClass("item-content-sub-active");

                $(uls[i]).addClass("content-block");

            } else{

                $(tabs[i]).children("span").removeClass("item-content-sub-active");

                $(uls[i]).removeClass("content-block");

            }

        }

    }
    /*筛选*/
    filter.click(function () {
        filter.toggleClass("item-content-sub-active");
        filterItems.toggleClass("content-block");

    });

});