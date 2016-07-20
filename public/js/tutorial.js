function next_step(step)
{
	switch(step){
		case 1:
			$('#ten_cong_trinh').attr('data-toggle','popover');
			$('#ten_cong_trinh').attr('data-placement','bottom');
			$('#ten_cong_trinh').attr('data-title','<a class="close_tutorial"><i class="fa fa-close"></i></a>');
			$('#ten_cong_trinh').attr('data-content','<p>Tên công trình</p><p><button onclick="next_step(2)" class="btn btn-primary" >Tiếp tục</button></p>');
			$('#ten_cong_trinh').popover({html:true});
			$('#ten_cong_trinh').popover("show");
			remove_prev_step("#ten_cong_trinh");
		break;
		case 2:
			$('#btn_tim_hang_muc').attr('data-toggle','popover');
			$('#btn_tim_hang_muc').attr('data-placement','right')
			$('#btn_tim_hang_muc').attr('data-title','<a class="close_tutorial"><i class="fa fa-close"></i></a>');
			$('#btn_tim_hang_muc').attr('data-content','<p>Nhập tên hạng mục cần tìm</p><p><button class="btn btn-default" onclick="next_step(1)">Quay lại</button><button onclick="next_step(3)" class="btn btn-primary" >Tiếp tục</button></p>');
			$('#btn_tim_hang_muc').popover({html:true});
			$('#btn_tim_hang_muc').popover('show');
			remove_prev_step("#btn_tim_hang_muc");
		break;
		case 3:
			$('#icon_them_hang_muc').attr('data-toggle','popover');
			$('#icon_them_hang_muc').attr('data-placement','top');
			$('#icon_them_hang_muc').attr('data-title','<a class="close_tutorial"><i class="fa fa-close"></i></a>');
			$('#icon_them_hang_muc').attr('data-content','<p>Click vào dấu + để thêm hạng mục mới</p><p><button class="btn btn-default" onclick="next_step(2)">Quay lại</button><button onclick="next_step(4)" class="btn btn-primary">Tiếp tục</button></p>');
			$('#icon_them_hang_muc').popover({html:true});
			$('#icon_them_hang_muc').popover('show');
			remove_prev_step("#icon_them_hang_muc");
		break;
		case 4:
			$('#nhap_cong_tac_hint').show();
			remove_prev_step("#nhap_cong_tac_hint");
		break;
		case 5:
			$('#cong_tac_search').attr('data-toggle','popover');
			$('#cong_tac_search').attr('data-placement','left');
			$('#cong_tac_search').attr('data-title','<a class="close_tutorial"><i class="fa fa-close"></i></a>');
			$('#cong_tac_search').attr('data-content','<p>Nhập tên hoặc mã công tác cần tìm trong hạng mục</p><p><button class="btn btn-default" onclick="next_step(4)">Quay lại</button><button onclick="" class="btn btn-primary" >Tiếp tục</button></p>');
			$('#cong_tac_search').popover({html:true});
			$('#cong_tac_search').popover('show');
			remove_prev_step("#cong_tac_search");
		break;
		
	}
}
function remove_prev_step(prev)
{
	if(!$(prev).is("#nhap_cong_tac_hint"))
		$("#nhap_cong_tac_hint").hide();
	$('#ten_cong_trinh,#btn_tim_hang_muc, #icon_them_hang_muc, #cong_tac_search').each(function(){
		if(!$(this).is(prev))
		{
			$(this).removeAttr('data-toggle');
			$(this).removeAttr('data-placement');
			$(this).removeAttr('data-content');
			$(this).removeAttr('data-original-title title');
			$(this).popover('hide');
		}	
	});
}
$(document).on("click",".close_tutorial",function(){
	$("#nhap_cong_tac_hint").hide();
	$('#ten_cong_trinh,#btn_tim_hang_muc, #icon_them_hang_muc, #cong_tac_search').each(function(){
		$(this).removeAttr('data-toggle');
		$(this).removeAttr('data-placement');
		$(this).removeAttr('data-title');
		$(this).removeAttr('data-content');
		$(this).removeAttr('data-original-title title');
		$(this).popover('destroy');
	});
})