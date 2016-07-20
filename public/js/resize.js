function fitness()
{
	var sum=0;
	$("#main>div").each(function(){
		if($(this).is(":visible") && $(this).is(":not('#right, #left')"))
		{ 
			sum+= parseInt($(this).css("margin-top").replace('px', ''));
			sum+= parseInt($(this).css("margin-bottom").replace('px', ''));
			sum+= parseInt($(this).css("padding-top").replace('px', ''));
			sum+= parseInt($(this).css("padding-bottom").replace('px', ''));
		}
	});
	var height = $("#main").height()- sum -$("#top").outerHeight()-$("#toolbar").outerHeight()-5 ;
	$('#left,#separator, #right').innerHeight(height);
}
function resize_estimate_table()
{
	var sum=0;
	$("#right").find("h2,#search_bar, #sum_money").each(function(){
		sum+= parseInt($(this).css("margin-top").replace('px', ''));
		sum+= parseInt($(this).css("margin-bottom").replace('px', ''));
		sum+= $(this).outerHeight();
	});
	var height = $("#right").innerHeight()-sum-$("#estimate_table>thead").outerHeight()-20;
	$('#estimate_table>tbody').height(height);
}
function resize_new_work()
{
	if($("#new_work_table").is(":visible")){
		var height = $("#new_work_table").find(".modal-body").height()-$("#new_work_info").height()-$("#new_work_table>thead").height()-20;
		$("#new_work_table>tbody").height(height);
	}
}