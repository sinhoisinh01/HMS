function modal(id)
{
	var my_modal = $("#"+id);
	my_modal.show();
	var close = my_modal.find(".close");
	close.click(function() {
		my_modal.hide();
		$(".my_modal").find("#bang_kq_tim_vt>tbody, #bang_cong_tac_ps>tbody").empty();
		$(".my_modal").find("input").val("");
	});
}
