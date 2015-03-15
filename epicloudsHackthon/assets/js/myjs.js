
$(".zan, .collect").click(function(){
	var clicked = $(this).attr("clicked")
	var ori = $(this).html()
	var num = /(\d+)/.exec(ori)[1]

	if(clicked != "true"){
		$(this).html(ori.replace(num, num-0+1))
		$(this).css("color","#EF189B")
		$(this).attr("clicked", "true")
	}
	else{
		$(this).html(ori.replace(num, num-1))
		$(this).css("color","#999999")
		$(this).attr("clicked", "false")
	}
})

$(".camera").click(){
	var fileName = window.demo.clickOnAndroid();
}