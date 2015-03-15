function bindHandler(s){
	$(s).click(function(){
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
}
bindHandler(".zan, .collect")

$(".camera").click(function(){
	var fileName = window.demo.clickOnAndroid()
	$("#postList")
	.prepend('<div class="am-panel am-panel-default">'
		+'<div class="am-panel-hd"><a href="user1.html"><img src="assets/image/tou.jpg" alt="" class="am-comment-avatar" width="48" height="48"/></a>'
		+'<div class="am-comment-meta"><a href="user.html" class="am-comment-author">王小宇</a>刚刚发表</div></div>'
		+'<div class=""><p class="paragraph-default-p">'
		+'测试'+'</p><img src="file:/'
		+ fileName +'" /></div>'
		+'<footer class="am-comment-footer"><div id="'+fileName+'" class="am-comment-actions"><a class = "zan"><i class="am-icon-thumbs-up"></i>赞(0)</a> <a href="cmt.html" class = "comment"><i class="am-icon-comment"></i>评论(0)</a><a class = "collect"><i class="am-icon-folder"></i>收藏(0)</a></div></footer>'
		+'</div>')
	bindHandler("#"+fileName+" .zan, #"+fileName+" .collect")
})