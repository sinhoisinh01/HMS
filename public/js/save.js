function luu(ma,action){
	if(action==1)
		action="them";
	if(action==2)
		action="sua";
	if(action==3)
		action="xoa"//function xac dinh dong can xoa o file dutoan.js
	if(action==4)
		action="thay";
	if(action==5)
		action="xoa_het";
	$.ajax({
			type: "POST",
			url: "http://localhost/DuToan/index.php/DuToan/luu",
			dataType: 'json',
			data: {ma:ma,action:action},
			success : function(res) 
			{
				if(res){
					if(res.response=="trung")
					{
						alert("Công tác đã tồn tại");
						window.location.reload();
						return 0;
					}
					$("#bang_do_boc tbody").empty();
					
					var tong_tien=0;
					var i=0;
					$.each(res,function(k,v){
						var chuoi = [];
						var thanh_tien = v.don_gia*v.khoi_luong;
						chuoi.push(
						'<tr>',
						'<td>'+(i+1)+'</td>',
						'<td contenteditable>'+v.ma_cong_tac+'</td>',
						'<td contenteditable>'+v.ten_cong_tac+'</td>',
						'<td contenteditable>',
							v.khoi_luong,
						'</td>',
						'<td>'+v.don_vi+'</td>',
						'<td>'+v.don_gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'</td>',
						'<td>'+thanh_tien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
						'</td>',
						'<input type="hidden" id="ma_cu'+i+'" value="'+v.ma_cong_tac+'" />',
						'</tr>');
						tong_tien += thanh_tien;
						i++;
						$("#bang_do_boc tbody").append(chuoi.join(''));
					});
					for(var j=i+1;j<200;j++)
						$("#bang_do_boc tbody").append("<tr><td>"+j+"</td><td contenteditable></td><td contenteditable></td><td></td><td></td><td></td><td></td></tr>");
					
					$("#bang_cong_tac").hide();
					$('#bang_cong_tac').find('table').empty();
					$("#tong_tien").html("Tổng chi phí: "+tong_tien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"VNĐ");
				}
				else alert("Lỗi");				
					
			},
			error: function(ts) { 
				alert(ts.responseText) 
			}
		});
}
