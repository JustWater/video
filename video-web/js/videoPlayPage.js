$(function(){
	
	$(document).on('click',function(){
		$(".commentInput").each(function(){
			if($(this).val()==""){
				$(this).attr("placeholder","请输入...");
			}
		})
	});
	//统计字数
	$(document).on('click','.commentInput',function(e){
		e.stopPropagation();
		if($(this).val()==""){
			$(this).attr("placeholder","")
		}
		$(document).on('input propertychange','.commentInput',function(){
			var numChange = $(this).parent().find(".numChange");
			var inputText = $(this).val().length;
			if (inputText>140) {
				$(this).val($(this).val().substring(0,140));
				showMask("warning","最大长度为140字");
			}else{
				numChange.text(inputText+" ");
			}
		})
	})
	// 删除显隐
	commentPerHover();

	//判断是否登录
	if ($(".userSelf").find(".userName").text()=="") {
		$(document).on('click','.commentBtn',function(){
			showMask("warning","请先登录");
		})
		$(document).on('click','.del',function(){
			showMask("warning","请先登录");
		})
		$(document).on('click','.reply',function(){
			showMask("warning","请先登录");
		})
		$(document).on('click','.praise',function(){
			showMask("warning","请先登录");
		})
	}else{
		//点击评论
		$(document).on('click',".commentBtn",function(){
			var commentArea = $(this).parent();
			var commentInput = commentArea.find(".commentInput");
			if(commentInput.val()!=""){
				var userImg = commentArea.find(".userImg");
				var userName = commentArea.find(".userName");
				var commentList = commentArea.next();
				var time = getTime();
				var str =   '<div class="commentPer">'+
				'<img src="'+userImg.attr("src")+'" class="userImg userComment">'+
				'<div class="userMes">'+
				'<div class="userBlock">'+
				'<div class="userAbout">'+
				'<span class="userName">'+userName.text()+'：</span>'+
				'<i>'+commentInput.val()+'</i>'+
				'</div>'+
				'<div class="operateDiv">'+
				'<span class="writeTime">'+time+'</span>'+
				'<div class="operate">'+
				'<a href="javascript:;" class="del delS">删除</a>'+
				'<a href="javascript:;" class="reply">回复</a>'+
				'<a href="javascript:;" class="praise">11</a>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'<div class="replyList">'+
				'</div>'+
				'</div>'+
				'</div>';
				commentList.append(str);
				commentPerHover();
				commentInput.val("");
				// $.ajax({
				// 	url:"http:zmhwater.vicp.io/videos/1/videousers/1/comments",
				// 	data:
				// })
			}
		});

		$(document).on('click','.commentPer',function(e){
			var obj = e.target || e.srcElement;
			switch(obj.className){
				case 'del delS':
					var parent = $(obj).parents(".commentPer");
					delChild(parent);
					break;
				case 'del delS':
					var parent = $(obj).parents(".commentPer");
					delChild(parent);
					break;
				case 'del delL':
					var parent = $(obj).parents(".replyDiv");
					delChild(parent);
					break;
				case 'reply':
					var parent = $(obj).parent().parent().parent();
					createDom(parent);
					break;
				case 'cBtn replyBtn':
					createReply(obj);
					break;
				case 'praise':
					praise(obj);
					break;
				case 'praise praiseCheck':
					praise(obj);
					break;
			}
		})
		$(document).on('click','.collect',function(){
			var collect = $(this);
			if ($("#login").length==0) {
				if(collect.hasClass("collectHover")){
					collect.removeClass("collectHover");
				}else{
					collect.addClass("collectHover");

				}
			}
		})
	}
});

//删除节点
function delChild(obj){
	obj.remove();
}
//创建回复输入栏
function createDom(obj){
	var childComment = $(".commentArea.childComment");
	var oChildComment =obj.next(".commentArea.childComment"); 
	if (oChildComment.text()!="") {
		oChildComment.remove();
	}else{
		childComment.remove();
		var str = '<div class="commentArea childComment">'+
		'<textarea class="commentInput childText" ></textarea>'+
		'<a href="javascript:;" class="cBtn replyBtn">回复</a>'+
		'<span class="wordNum"><i class="numChange">0&nbsp;</i>/&nbsp;140</span>'+
		'</div>';
		obj.after(str);
		var childText = $(".commentInput.childText");
		var userText = obj.find(".userName").text();
		if (userText.indexOf("：") == -1) {
			userText = userText+"：" ;
		}
		childText.val("回复@"+userText);
		var numChange = childText.parent().find(".numChange");
		numChange.text(childText.val().length+' ');
	}
}
// 移入移出删除显隐
function commentPerHover(){
	// 删除按钮的显隐
	var userBlock = $(".userBlock");
	userBlock.hover(function(){
		$(this).find(".del").show();
	},function(){
		$(this).find(".del").hide();
	})
	var replyDiv = $(".replyDiv");
	replyDiv.hover(function(){
		$(this).find(".del").show();
	},function(){
		$(this).find(".del").hide();
	})
}

// 获取时间
function getTime(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	var day = myDate.getDate();
	var hour = myDate.getHours();
	var min = myDate.getMinutes();
	var sec = myDate.getSeconds();
	hour = hour < 10 ? '0'+hour :hour;
	min = min < 10 ? '0'+min :min;
	sec = sec < 10 ? '0'+sec :sec;
	var time = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
	return time;
}
//  创建回复栏
function createReply(obj){
	var childComment = $(obj).parents(".commentArea.childComment");
	var userName = $(obj.parentNode).prev().find(".userName");
	var commentInput = $(obj).prev();
	var textVal = commentInput.val().split("：")[1];
	var time = getTime();
	var str = 	'<div class="replyDiv">'+
	'<div class="replyOne">'+
	'<div class="myReply">'+
	'<div class="replyPerson">'+
	'<span class="userName">我 </span>'+
	'<span>回复</span>'+
	'<span class="other">@'+userName.text()+'</span>'+
	'</div>'+
	'<div class="replyContent"> '+textVal+'</div>'+
	'</div>'+
	'<div class="replyOther">'+
	'<span class="replyTime">'+time+'</span>'+
	'<div class="operate">'+
	'<a href="javascript:;" class="del delL">删除</a>'+
	'<a href="javascript:;" class="praise">11</a>'+
	'</div>'+
	'</div>'+
	'</div>'+
	'</div>';
	var replyList =$(obj).parents(".commentPer").find(".replyList");
	childComment.remove();
	replyList.prepend(str);
	commentPerHover();
	
}

//点赞
function praise(obj){
	var praiseBtn = $(obj);
	var praiseText = praiseBtn.text();
	if (!praiseBtn.hasClass("praiseCheck")) {
		var newText = parseInt(praiseText)+1;
		praiseBtn.text(newText);
		praiseBtn.addClass("praiseCheck");
	}else{
		var newText = parseInt(praiseText)-1;
		praiseBtn.text(newText);
		praiseBtn.removeClass("praiseCheck");
	}

}
