$(function () {
    var ip = '10.2.16.246';
    var port = '8080';
    initComponents();
    addEventListener();
    /**初始化组件**/
    function initComponents(){
        var firstColumn = findRootColumn();
        findColumnContents(firstColumn);
        richVideoArea();
        
    }
    /**增加监听**/
    function addEventListener(){

    }
    function richVideoArea(){

    }
    function findColumnContents(firstColumn){
        var params = {};
        $.ajax({
            type : 'POST',
            contentType : 'text/xml;charset=utf-8',
            dataType : 'json',
            data:params,
            url : 'http://'+ip+':'+port+'/GetFolderContents?dataType=json',
            success:function(json){

            },
            error:function(){

            }
        });
    }
    function findRootColumn() {
        var params = {};
        var firstColumn = "";
        $.ajax({
            type : 'POST',
            contentType : 'text/xml;charset=utf-8',
            dataType : 'json',
            data:params,
            url : 'http://'+ip+':'+port+'/GetRootContents?dataType=json',
            success:function(json){

            },
            error:function(){

            }
        });
    }



});