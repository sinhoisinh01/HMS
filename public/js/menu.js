$("#menu>li.has-children").click(function(e){
	if($(e.target).parent().hasClass("has-children"))//  click vao menu level 0 moi hien ra menu level 1
	{
		$("#menu>li.has-children").each(function(){
			$(this).children("ul").hide();
			$(this).removeClass("current-li");
			$(this).find(".overlay").remove();
		});
		$(this).addClass("current-li");
		$(this).children("ul").show("fast");// chi show ul level 1
		$(this).append("<div class='overlay'></div>");
	}
})
$(document).on("mouseover","#menu>li>ul>li",function(){
	if($(window).width()>880)
		$(this).children("ul").show();
});
$(document).on("click","#menu>li>ul>li",function(){
	if($(window).width()<=880)
	{
		if(!$(this).children("ul").is(":visible"))
		{
			$("#menu>li>ul>li").children("ul").hide();
			$(this).children("ul").show();
		}	
		else
		{
			$(this).children("ul").hide();
		} 			
	}
});
$(document).on("mouseout","#menu>li>ul>li",function(){
	if($(window).width()>880)
		$(this).children("ul").hide();
});
$(window).click(function(e){
	if($(window).width()>880)
	{
		if(!$(e.target).is("#menu *") || ($(e.target).is("#menu>li>ul>li>a") && !$(e.target).parent().children().is("ul")))
		{
			$("#menu>li.has-children").find("ul").hide();
			$("#menu>li.has-children").removeClass("current-li");
			$("#menu>li.has-children").find(".overlay").remove();
		}
	}	
})
$("#menu_toggle").click(function(){
	if(!$("#menu").is(":visible"))
		$("#menu").show();
	else $("#menu").hide();
})
$(window).on("resize", function() {
	var first_child_top = $(".toolbar_button:first-child").position().top;
	$(".toolbar_button").not("#toolbar_show_more").each(function(){
		//console.log($(this));
		if (Math.abs(first_child_top - $(this).position().top) > 10) {
			if(!$("#toolbar_show_more").is(":visible"))
			{
				$("#toolbar").append("<div class='toolbar_button' id='toolbar_show_more'><i class='fa fa-ellipsis-v '></i><ul><li>"+$(this).prop('outerHTML')+"</li></ul></div>") ;
			}
			else{
				if($("#toolbar_show_more").find("#ma_dg").length==0 && $(this).find("#ma_dg").length==1)
					$("#toolbar_show_more ul").append($(this).prop("outerHTML"));
				if($("#toolbar_show_more").find("#tinh_thanh").length==0 && $(this).find("#tinh_thanh").length==1)
					$("#toolbar_show_more ul").append($(this).prop("outerHTML"));
			}
			$(this).remove();	
		} 
	});
});
$(document).on("click","#toolbar_show_more",function(){
	$(this).find("ul").show();
})