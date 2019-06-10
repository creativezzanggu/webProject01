<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>상품 등록 페이지</title>
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
	</head>
	<body>
		<div class="container" style ="width: 500px; margin-top : 10px;">
			<form method="post" id="productInsertForm" name="productInsertForm" action="/kgmall/admin/productInsert.do">
				<h3>상품 등록</h3>
				<div class="row">
					<div class="form-group col-md-6" style ="width: 220px; padding: 0px 0px 0px 15px;"><!-- 위 오른쪽 아래 왼쪽 -->
						<label>분류</label>
						<select class="form-control" id="majorCategory" name="majorCategory" onchange="category()">
							<option value="">대분류</option>
							<option value="OUTER">OUTER</option>
							<option value="TOP">TOP</option>
							<option value="BOTTOM">BOTTOM</option>
							<option value="OUTER">OUTER</option>
							<option value="SHOES&BAG">SHOES&BAG</option>
						</select>
					</div>
					
					<div class="form-group col-md-6" style ="width: 220px; margin-top : 25px;">
						<select class="form-control" id="subCategory" name="subCategory">
							<option value="">소분류</option>
						</select>
						<div id="majorCategoryDiv" style="color : red;"></div>
					</div>
				</div>
				
				
				<div class=".col-md-6" style ="padding: 0px 0px 5px 0px;">
					<label>제조사</label>
					<input type="text" class="form-control" id="company" name="company">
					<div id="companyDiv" style="color : red;"></div>
				</div>
				
				<div class=".col-md-6" style ="padding: 0px 0px 5px 0px;">
					<label>상품명</label>
					<input type="text" class="form-control" id="name" name="name">
					<div id="nameDiv" style="color : red;"></div>
				</div>
				
				<div class=".col-md-6" style ="padding: 0px 0px 5px 0px;">
					<label>상품코드</label>
					<input type="text" class="form-control" id="code" name="code">
					<div id="codeDiv" style="color : red;"></div>
				</div>
				
				<div class=".col-md-6" style ="padding: 0px 0px 5px 0px;">
					<label>상품가격</label>
					<input type="text" class="form-control" id="price" name="price" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"/>
					<div id="priceDiv" style="color : red;"></div>
				</div>
				
				<div class=".col-md-6" style="width: 300px; padding: 0px 0px 5px 0px;">
					<label>색상</label>
					<select class="form-control" id="productColor" name="productColor">
						<option value="">색상</option>
						<option value="Black">Black</option>
						<option value="Blue">Blue</option>
						<option value="Green">Green</option>
						<option value="Pink">Pink</option>
						<option value="White">White</option>
						<option value="Yellow">Yellow</option>
					</select>
					<div id="productColorDiv" style="color : red;"></div>
				</div>
				<div class=".col-md-6" style="width: 300px; padding: 0px 0px 5px 0px;">
					<label>사이즈</label>
					<select class="form-control" id="productSize" name="productSize">
						<option value="">사이즈</option>
						<option value="S">S</option>
						<option value="M">M</option>
						<option value="L">L</option>
						<option value="XL">XL</option>
					</select>
					<div id="productSizeDiv" style="color : red;"></div>
					<br>
					<!-- <button type="button" id="btnAppend">추가</button> -->
				</div>
				
				<div class=".col-md-6" style="padding: 0px 0px 5px 0px;">
					<!-- <label>수량</label> -->
					<div id="totalProducts" class="" style="width: 100%; height:200px;overflow:scroll;" >
						<div class="thead-wrap" ></div>
						<table border="1" summary="" >
							<caption>상품 목록</caption>
							<colgroup>
								<col style="width:300px;">
								<col style="width:100px;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">상품명</th>
									<th scope="col">수량</th>
								</tr>
							</thead>
							<tbody class="" id="totalTable">
								<tr id="deliveryPrice" class="displaynone"></tr>
							</tbody>
						</table>
					</div>
					<div class="totalProductsDiv" style="color : red;"></div>
					<!-- <div class="buttons"></div> -->
					<!-- <div class="qtyDiv" style="color : red;"></div> -->
				</div>
				
				<div class=".col-md-6" style="padding: 0px 0px 5px 0px;">
					<label>메인이미지</label>
					<input type="file" id="imageLink" name="imageLink">
					<div id="imageLinkDiv" style="color : red;"></div>
				</div>
				<br>
				
				<div class=".col-md-6" style="padding: 0px 0px 5px 0px;">
					<label for="exampleInputFile">상품이미지</label>
					<input type="file" id="productImage1" name="productImage1"><br>
					<input type="file" id="productImage2" name="productImage2"><br>
					<input type="file" id="productImage3" name="productImage3">
					<div id="productImageDiv" style="color : red;"></div>
				</div>
				<br>
				
				<div class=".col-md-6" align="center">
					<button type="button" class="btn btn-default" id="productInsert">등록</button>
					<button type="button" class="btn btn-default" id="reset">초기화</button>
				</div>
				<br><br>
			</form>
		</div>
	</body>
	<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
	<script type="text/javascript">
	function category(){
		form = document.productInsertForm;
		
		if(document.productInsertForm.majorCategory.value == "OUTER"){
			form.subCategory.length = 1;
			form.subCategory.options[1] = new Option("JACKET");
			form.subCategory.options[1].value = "JACKET";
			form.subCategory.options[2] = new Option("JUMPER");
			form.subCategory.options[2].value = "JUMPER";
			form.subCategory.options[3] = new Option("CADIGAN");
			form.subCategory.options[3].value = "CADIGAN";
		}
		
		if(document.productInsertForm.majorCategory.value == "TOP"){
			form.subCategory.length = 1;
			form.subCategory.options[1] = new Option("TEE-SHIRT");
			form.subCategory.options[1].value = "TEE-SHIRT";
			form.subCategory.options[2] = new Option("BLOUSE");
			form.subCategory.options[2].value = "BLOUSE";
			form.subCategory.options[3] = new Option("KNIT");
			form.subCategory.options[3].value = "KNIT";
			form.subCategory.options[4] = new Option("CAMI");
			form.subCategory.options[4].value = "CAMI";
		}
		
		if(document.productInsertForm.majorCategory.value == "BOTTOM"){
			form.subCategory.length = 1;
			form.subCategory.options[1] = new Option("SKIRT");
			form.subCategory.options[1].value = "SKIRT";
			form.subCategory.options[2] = new Option("LEGGINGS");
			form.subCategory.options[2].value = "LEGGINGS";
			form.subCategory.options[3] = new Option("PANTS");
			form.subCategory.options[3].value = "PANTS";
			form.subCategory.options[4] = new Option("DENIM");
			form.subCategory.options[4].value = "DENIM";
		}
		
		if(document.productInsertForm.majorCategory.value == "SHOES&BAG"){
			form.subCategory.length = 1;
			form.subCategory.options[1] = new Option("SHOES");
			form.subCategory.options[1].value = "SHOES";
			form.subCategory.options[2] = new Option("BAG");
			form.subCategory.options[2].value = "BAG";
		}
	}
	</script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-3.4.0.min.js"></script>
	<script type="text/javascript">
	$('#productInsert').click(function(){
		$('#majorCategoryDiv').empty();
		$('#companyDiv').empty();
		$('#nameDiv').empty();
		$('#codeDiv').empty();
		$('#priceDiv').empty();
		$('#productColorDiv').empty();
		$('#productSizeDiv').empty();
		//$('.qtyDiv').empty();
		$('#imageLinkDiv').empty();
		$('#productImageDiv').empty();
		
		if($('#majorCategory').val() == ''){
			$('#majorCategoryDiv').text("대분류를 선택해주세요.");
			$('#majorCategory').focus();
			return false;
		} else if($('#subCategory').val() == ''){
			$('#majorCategoryDiv').text("소분류을 선택해주세요.");
			$('#subCategory').focus();
			return false;
		} else if($('#company').val().length == 0){
			$('#companyDiv').text("제조사를 입력해주세요.");
			$('#company').focus();
		} else if($('#name').val().length == 0){
			$('#nameDiv').text("상품명을 입력해주세요.");
			$('#name').focus();
		} else if($('#code').val().length == 0){
			$('#codeDiv').text("상품코드을 입력해주세요.");
			$('#code').focus();
		} else if($('#price').val().length == 0){
			$('#priceDiv').text("상품가격을 입력해주세요.");
			$('#price').focus();
		} else if($('#productColor').val() == ''){
			$('#productColorDiv').text("색상을 선택해주세요.");
			$('#productColor').focus();
			return false;
		} else if($('#productSize').val() == ''){
			$('#productSizeDiv').text("사이즈를 선택해주세요.");
			$('#productSize').focus();
			return false;
		} else if($('#imageLink').val() == ''){
			var ext = $('#imageLink').val().split('.').pop().toLowerCase();
			
			if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
				$('#imageLinkDiv').text("메인 이미지를 넣어주세요.");
				return;
			}
		} else if($('#productImage1').val() == ''){
			var ext1 = $('#productImage1').val().split('.').pop().toLowerCase();
			
			if($.inArray(ext1, ['gif','png','jpg','jpeg']) == -1) {
				$('#productImageDiv').text("상품 이미지를 넣어주세요.");
				return;
			}
		} else if($('#productImage2').val() == ''){
			var ext2 = $('#productImage2').val().split('.').pop().toLowerCase();
			
			if($.inArray(ext2, ['gif','png','jpg','jpeg']) == -1) {
				$('#productImageDiv').text("상품 이미지를 넣어주세요.");
				return;
			}
		} else if($('#productImage3').val() == ''){
			var ext3 = $('#productImage3').val().split('.').pop().toLowerCase();
			
			if($.inArray(ext3, ['gif','png','jpg','jpeg']) == -1) {
				$('#productImageDiv').text("상품 이미지를 넣어주세요.");
				return;
			}
		} else {
			var ncs = new Array();
			for(var i=0; i<$('.productCount').length; i++){
				var array = parseInt($('.productCount').eq(i).val()); //수량
				ncs[i] = $('.productCount').eq(i).attr('id');
				$.ajax({
					type : 'POST',
					url : '/kgmall/admin/detailProductInsert.do',
					data : {'ncs' : ncs[i],
							'array' : array},
					dataType : 'json',
					success:function(data){
						//alert(JSON.stringify(data));
					}
				});
			}//for
			alert($('#productImage1').val());
			$('#productInsertForm').submit();
		}
	});
	
	$("#productSize").change(function() {
		var nameValue = $('#name').val();
		var colorValue = $('#productColor option:selected').val();
		var sizeValue = $('#productSize option:selected').val();
		var name = "'"+nameValue+"_"+colorValue+"_"+sizeValue+"'";
		if(($('#productColor').val().length == 0)){
			return false;
		} else if(($('#productSize').val().length == 0)){
			return false;
		} else {
			$('#totalTable').append("<tr class='' id="+nameValue+"_"+colorValue+"_"+sizeValue+"><td>"+nameValue+"_"+colorValue+"_"+sizeValue+"</td><td><span><input class='productCount' id='"
					+nameValue+"_"+colorValue+"_"+sizeValue+"' style='width:33px;' value='1' min='1' type='number'></span><input value='삭제' type='button' onclick=listDelete("+name+")></td></tr>");
		}
	});
	
	$('#reset').click(function(){
		$('#majorCategoryDiv').empty();
		$('#companyDiv').empty();
		$('#nameDiv').empty();
		$('#codeDiv').empty();
		$('#priceDiv').empty();
		$('#productColorDiv').empty();
		$('#productSizeDiv').empty();
		$('#qtyDiv').empty();
		$('#imageLinkDiv').empty();
		$('#productImageDiv').empty();
		$('#totalTable').empty();
		
		$('#majorCategory').val('');
		$('#subCategory').val('');
		$('#company').val('');
		$('#name').val('');
		$('#code').val('');
		$('#price').val('');
		$('#productColor').val('');
		$('#productSize').val('');
		$('#qtyDiv').val('');
		$('#imageLink').val('');
		$('#productImage1').val('');
		$('#productImage2').val('');
		$('#productImage3').val('');
		
		$('#majorCategory').focus();
	});
	</script>
	<script type="text/javascript">
		function listDelete(name1){
			$('#'+name1).remove();
		}
	</script>
</html>