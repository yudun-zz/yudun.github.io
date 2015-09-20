(function showResult(){

    // Files need to be loaded
    var fileList = ["conventional","spark","bouquetconf","bouquetfilter","bouquetfunc","bouquet"]

    //Make sure the data processing is after the data transmission
    $.ajaxSetup({
        async: false
    });


    setTimeout(function(){
        $("#loader, #status").fadeIn(1000);
    },600);

    setTimeout(function(){
        for (var i = 0; i < fileList.length; i++) {
            $.getScript( "static/js/"+ fileList[i] +".js",function(){
                if(i==fileList.length-1){
                    $("#title").fadeOut(500);
                    setTimeout(function(){
                        $("#mainviewtitle").fadeIn(1000);
                    },600)
                }
            });  
        };
    },2000);
})()
