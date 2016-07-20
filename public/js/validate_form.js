/*--------------Phần kiểm tra thông tin thường-------------------*/
function validateName(inputID)
{
	var val = $("#" + inputID).val();
	var checkName = /^[A-Za-z ĐđaăâêôơưáắấéếíóốớúứàằầèềìòồờùừảẳẩẻểỏổởỉủửãẫẵẽễõỗỡĩũữạậặẹệịọộợụựAĂÂÊÔƠƯÁẮẤÉẾÍÓỐỚÚỨÀẰẦÈỀÌÒỒỜÙỪẢẲẨẺỂỎỔỞỈỦỬÃẪẴẼỄÕỖỠĨŨỮẠẬẶẸỆỊỌỘỢỤỰ]+$/;
	if (checkName.test(val))
	{
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-error has-feedback");
		$("#" + inputID).parent().addClass("has-success has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
		return 1;
	}
	else
	{
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-success has-feedback");
		$("#" + inputID).parent().addClass("has-error has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
		return 0;
	}
}

function validateEmail(inputID)
{
	var val = $("#" + inputID).val();
	var checkEmail = /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/;
	if (checkEmail.test(val))
	{
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-error has-feedback");
		$("#" + inputID).parent().addClass("has-success has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
		return 1;
	}
	else
	{
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-success has-feedback");
		$("#" + inputID).parent().addClass("has-error has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
		return 0;
	}
}

function validateUsername(inputID)
{
	var val = $("#" + inputID).val();
	var checkUsername = /^[\w0-9._@-]+$/;
	if (checkUsername.test(val))
	{
		$.ajax({
			type: "POST",
			url: "http://localhost/DuToan/index.php/TaiKhoan/check_unique/0",
			dataType:"json",
			data:{username:val},
			success: function(res){
				if(res==1)// neu username khong trung
				{
					$("#" + inputID).next().remove();
					$("#" + inputID).parent().removeClass("has-error has-feedback");
					$("#" + inputID).parent().addClass("has-success has-feedback");
					$("#" + inputID).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
					
					return 1;
				}
				else
				{
					$("#" + inputID).next().remove();
					$("#" + inputID).parent().removeClass("has-success has-feedback");
					$("#" + inputID).parent().addClass("has-error has-feedback");
					$("#" + inputID).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
					
					return 0;
				}
			},
		});
	}
}

function checkPassword(inputID)
{
	var score = 0;
	
    var wordLength = 0;
    var wordSequences = 0;
    var wordNonRepetitions = 0;
    var wordLowercase = 0;
    var wordUppercase = 0;
    var wordHasNumber = 0;
    var wordHasSpecialChar = 0;
    var wordUpperLowerCombo = 0;
    var wordLetterNumberCombo = 0;
    var wordLetterNumberCharCombo = 0;
	
	
	var pwd = $("#" + inputID).val();
	var checkHasNumber = /[0-9]+/;
	var checkHasLowerUpper = /[A-Za-z]+/;
	var checkRepititions = /(.)\1\1/;
	var checkUpperLowerCombo = /([A-Z][a-z]){3,}|([a-z][A-Z]){3,}/;
	var checkHasSpecialChar = /[!,@,#,$,%,\^,&,*,?,_,~]/;
	var checkLetterNumberCombo = /([A-Za-z][0-9]){3,}|([0-9][A-Za-z]){3,}/;
	var checkLetterNumberCharCombo = /([A-Za-z0-9][!,@,#,$,%,\^,&,*,?,_,~]){3,}|([!,@,#,$,%,\^,&,*,?,_,~][A-Za-z0-9]){3,}/;
	
	
	if (pwd.length >= 6)
	{
		$("#6orMoreChar").css("color", "#83ce40");
		wordLength = 20;
	}
	else
	{
		$("#6orMoreChar").css("color", "#bababa");
		wordLength = 0;
	}
	
	if (checkHasLowerUpper.test(pwd))
	{
		$("#lowerUpper").css("color", "#83ce40");
		wordLowercase = 10;
		wordUppercase = 10;
	}
	else
	{
		$("#lowerUpper").css("color", "#bababa");
		wordLowercase = 0;
		wordUppercase = 0;
	}
	
	if (checkHasNumber.test(pwd))
	{
		$("#hasNumber").css("color", "#83ce40");
		wordHasNumber = 10;
	}
	else
	{
		$("#hasNumber").css("color", "#bababa");
		wordHasNumber = 0;
	}
	
	if ($("#email").val().length > 0 && $("#email").val().toLowerCase() == pwd.toLowerCase())
	{
		$("#pwdWarning").html('<span class="fa fa-warning"></span>'
							+ ' Mật khẩu không được giống Email');
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-success has-feedback");
		$("#" + inputID).parent().addClass("has-error has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
	}
	else
	{
		$("#pwdWarning").html('');
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-error has-feedback");
		$("#" + inputID).parent().addClass("has-success has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
	}
	
	if ($("#tenDangNhap").val().length > 0 && $("#tenDangNhap").val().toLowerCase() == pwd.toLowerCase())
	{
		$("#pwdWarning").html('<span class="fa fa-warning"></span>'
							+ ' Mật khẩu không được trùng với Tên đăng nhập');
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-success has-feedback");
		$("#" + inputID).parent().addClass("has-error has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
	}
	else
	{
		$("#pwdWarning").html('');
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-error has-feedback");
		$("#" + inputID).parent().addClass("has-success has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
	}
	
	if (checkHasSpecialChar.test(pwd))
	{
		wordHasSpecialChar = 10;
	}
	
	score = wordLength + wordLowercase + wordUppercase + wordHasNumber + wordHasSpecialChar;
	
	if (score>=50)
	{
		if (!checkRepititions.test(pwd))
		{
			wordNonRepetitions = 10;
		}

		if (!checkUpperLowerCombo.test(pwd))
		{
			wordUpperLowerCombo = 10;
		}

		if (!checkLetterNumberCharCombo.test(pwd))
		{
			wordLetterNumberCharCombo = 10;
		}

		if (!checkLetterNumberCombo.test(pwd))
		{
			wordLetterNumberCombo = 10;
		}
	}
	
	
	/*Phần thực thi cho progress bar*/
	score = wordLength + wordSequences + wordNonRepetitions + wordLowercase + wordUppercase + 
			wordHasNumber + wordHasSpecialChar + wordUpperLowerCombo + wordLetterNumberCombo +
			wordLetterNumberCharCombo;
	
	if (score > 0 && score <= 20)
	{
		$("#pwdMetter").css("width", "20%");
		$("#pwdMetter").html("Yếu");
		$("#pwdMetter").removeClass("progress-bar-warning");
		$("#pwdMetter").removeClass("progress-bar-success");
		$("#pwdMetter").addClass("progress-bar-danger");
	}
	else if (score > 20 && score <= 60)
	{
		$("#pwdMetter").css("width", "50%");
		$("#pwdMetter").html("Bình thường");
		$("#pwdMetter").removeClass("progress-bar-danger");
		$("#pwdMetter").removeClass("progress-bar-success");
		$("#pwdMetter").addClass("progress-bar-warning");
	}
	else
	{
		$("#pwdMetter").css("width", score + "%");
		$("#pwdMetter").html("Mạnh");
		$("#pwdMetter").removeClass("progress-bar-danger");
		$("#pwdMetter").removeClass("progress-bar-warning");
		$("#pwdMetter").addClass("progress-bar-success");
	}
	
	if (score >= 50)
	{
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-error has-feedback");
		$("#" + inputID).parent().addClass("has-success has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
		return 1;
	}
	
	else 
	{
		$("#" + inputID).next().remove();
		$("#" + inputID).parent().removeClass("has-success has-feedback");
		$("#" + inputID).parent().addClass("has-error has-feedback");
		$("#" + inputID).parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
		return 0;
	}
}

function confirmPassword()
{
	var pwd = $('#password').val();
	var pwdConfirm = $('#passwordConfirm').val();
	if (pwd.length > 0 && pwd != pwdConfirm)
	{
		$('#passwordConfirm').popover('show');
		$('#passwordConfirm').next().remove();
		$('#passwordConfirm').parent().removeClass("has-success has-feedback");
		$('#passwordConfirm').parent().addClass("has-error has-feedback");
		$('#passwordConfirm').parent().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
	}
	else
	{
		$('#passwordConfirm').popover('destroy');		
		$('#passwordConfirm').next().remove();
		$('#passwordConfirm').parent().removeClass("has-error has-feedback");
		
		if (checkPassword(pwd))
		{
			$('#passwordConfirm').next().remove();
			$('#passwordConfirm').parent().removeClass("has-error has-feedback");
			$('#passwordConfirm').parent().addClass("has-success has-feedback");
			$('#passwordConfirm').parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
		}
	}
}

$(document).ready(function()
{
    $("#ho").blur(function()
	{
		validateName('ho');
	});
	$("#ten").blur(function()
	{
		validateName('ten');
	});
	$("#email").blur(function()
	{
		validateEmail('email');
	});
	$("#tenDangNhap").blur(function()
	{
		validateUsername('tenDangNhap');
	});
	
	$('#password').popover({
		html : true,
		content: function() {
			return $('#passwordTips').html();
		}
	});
	
	 
	
	$('#password').on('keyup', function(e){
		checkPassword('password');
		$('#password').popover('show');
	});
	
	$('#passwordConfirm').blur(function(){
		confirmPassword();
	});
});