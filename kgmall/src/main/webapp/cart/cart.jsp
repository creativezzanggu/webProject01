<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<head>
<link rel="stylesheet" type="text/css" href="../css/cartCss1.css">
<link rel="stylesheet" type="text/css" href="../css/cartCss2.css">
<link rel="stylesheet" type="text/css" href="../css/cartCss3.css">
</head>
<div id="container">
<div id="contents">
<br><br>
<div class="location-subpage">
<div class="tit-subpage">
<h2>Cart</h2>
</div>
</div>

<div class="xans-element- xans-order xans-order-basketpackage">
<div class="xans-element- xans-order xans-order-tabinfo df-base-tab typeLight">
</div>

<!-- 장바구니 비어있을 때 -->
<div class="xans-element- xans-order xans-order-empty" id="emptyCart">
<p><img src="../image/search.png"/><br><br>장바구니가 비어 있습니다.</p>
</div>

<!-- 국내배송상품 주문내역 -->
<div class="orderListArea ">
        <div class="title">
            <h3>장바구니</h3>
        </div>

        <!-- 기본배송 -->
        <div class="ec-base-table typeList ">
            <table border="1" summary="">
<caption>기본배송</caption>
                <colgroup>
<col style="width:27px" class="">
<col style="width:92px">
<col style="width:auto">
<col style="width:98px">
<col style="width:75px">
<col style="width:98px">
<col style="width:98px">
<col style="width:85px">
<col style="width:98px">
</colgroup>
<thead><tr>
<th scope="col" class=""></th>
                        <th scope="col">이미지</th>
                        <th scope="col">상품정보</th>
                        <th scope="col"></th>
                        <th scope="col">판매가</th>
                        <th scope="col">수량</th>
                        <th scope="col">배송구분</th>
                        <th scope="col">배송비</th>
                        <th scope="col">합계</th>
                    </tr></thead>
<tfoot class="right"><tr>
<td class=""></td>
                        <td colspan="8">
<span class="gLeft"></span> 합계 : <strong class="txtEm gIndent10"><span id="domestic_ship_fee_sum" class="txt18">0</span> won</strong> <span class="displaynone"></span>
</td>
                    </tr></tfoot>
                    
                    
                    
                    <tbody class="xans-element- xans-order xans-order-normallist center" id="tablebody">
                    
            
</tbody>
</table>
</div>

	<!-- 주문 버튼 -->
	<div class="xans-element- xans-order xans-order-totalorder df-base-button justify fs-0">
		<a href="#none" class="df-btn highlight big mr-3" id="orderBtn">상품주문</a>
		<span><a href="#" class="df-btn light big" id="ing_shopping">쇼핑계속하기</a></span>
	</div>
</div>

<!-- 이용안내 -->
<div class="xans-element- xans-order xans-order-basketguide df-base-help ">
<h3>이용안내</h3>
<div class="inner">
<h4>장바구니 이용안내</h4>
<ol>
<li class="item1">해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
<li class="item2">해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
<li class="item3">선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
<li class="item4">[쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
<li class="item5">장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
<li class="item6">파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
</ol>

<h4>무이자할부 이용안내</h4>
<ol>
<li class="item1">상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
<li class="item2">[전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
<li class="item3">단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
</ol>
</div>
</div>
</div>
</div>
<script>
//지우기
function deleteTr(value){
	var totalPrice=0;
	$('#'+value).remove();
	$.ajax({
		type : 'POST',
		data : {'productName' : value,
				'id' : '${id}'},
		url : '/kgmall/cart/selectDeleteCookie.do'
	});
	location.reload();
}

//comma
function addComma(num) {
	  var regexp = /\B(?=(\d{3})+(?!\d))/g;
	  return num.toString().replace(regexp, ',');
}

$('#ing_shopping').click(function(){
	location.href="/kgmall/main/index.do";
});

$('#orderBtn').click(function(){
	var id = '${id}';
	if(id==""){
		alert("로그인이 필요합니다.");
		location.href="/kgmall/user/loginForm.do";
	}
	else{
		location.href="/kgmall/order/order.do?name=";
	}
});

$(document).ready(function(){
	var name=null;
	var totalPrice=0;
	var id = '${id}';
	if(id==""){
		$.ajax({
			type : 'POST',
			url : '/kgmall/cart/selectCookie.do',
			dataType : 'json',
			success : function(data){
				var map = data.map;
				$.each(map, function(index, value){
					var str = index.split("_");
					name=str[0];
					if(name!=1){
						$('#emptyCart').addClass('displaynone');	
					}
					$.ajax({
						type : 'POST',
						url : '/kgmall/product/getDTO.do',
						data : "name="+name,
						dataType : 'json',
						success : function(data){
							$("#tablebody").append("<tr class='alltr' id="+index+"><td class=''><button value="+index+" type='' onclick='javascript:deleteTr(this.value)'><img class='' style='height:10px; width:10px;' src='../image/x.png'></button></td><td class='thumb gClearLine'><a href='../product/select.do?name="+name+"'><img id = 'productImage' src='../image/productImage/"+data.productDTO.imageLink+"' height='50px' width='50px' onerror='this.src=//img.echosting.cafe24.com/thumb/img_product_small.gif;' alt=''></a></td><td class='gClearLine'><a id='productName' href='../product/select.do?name="+name+"'><strong>"+data.productDTO.name+"</strong>"+"_"+str[1]+"_"+str[2]+"</a></td><td class=''></td><td class='right'><div class=''><strong>"+addComma(data.productDTO.price)+" won</strong><p class='displaynone'></p></div></td><td>"+value+"개"+"</td><td><div class='txtInfo'>기본배송<br></div></td><td rowspan='1' class=''>[선택]</td><td class='right'><strong>"+addComma(value*data.productDTO.price)+" won</strong><div class='displaynone'></div></td></tr>");
							totalPrice = totalPrice+(value*data.productDTO.price);
							$('#domestic_ship_fee_sum').text(addComma(totalPrice));
						}
					});
				});
			}
		});
	}//id가 널일 때
	else{
		$.ajax({
			type : 'POST',
			url : '/kgmall/cart/insertCookie.do',
			data : {'id':id},
			dataType : 'json',
			success : function(data){
				var list = data.list2;
				$.each(list, function(index, value){
					var str = value.product.split("_");
					name=str[0];
					if(str[2]!=null){
						$('#emptyCart').addClass('displaynone');	
					}
					$.ajax({
						type : 'POST',
						url : '/kgmall/product/getDTO.do',
						data : "name="+name,
						dataType : 'json',
						success : function(data){
							$("#tablebody").append("<tr class='alltr' id="+value.product+"><td class=''><button value="+value.product+" type='' onclick='javascript:deleteTr(this.value)'><img class='' style='height:10px; width:10px;' src='../image/x.png'></button></td><td class='thumb gClearLine'><a href='../product/select.do?name="+name+"'><img id = 'productImage' src='../image/productImage/"+data.productDTO.imageLink+"' height='50px' width='50px' onerror='this.src=//img.echosting.cafe24.com/thumb/img_product_small.gif;' alt=''></a></td><td class='gClearLine'><a id='productName' href='../product/select.do?name="+name+"'><strong>"+data.productDTO.name+"</strong>"+"_"+str[1]+"_"+str[2]+"</a></td><td class=''></td><td class='right'><div class=''><strong>"+addComma(data.productDTO.price)+" won</strong><p class='displaynone'></p></div></td><td>"+value.productCount+"개"+"</td><td><div class='txtInfo'>기본배송<br></div></td><td rowspan='1' class=''>[선택]</td><td class='right'><strong>"+addComma(value.productCount*data.productDTO.price)+" won</strong><div class='displaynone'></div></td></tr>");
							totalPrice = totalPrice+(value.productCount*data.productDTO.price);
							$('#domestic_ship_fee_sum').text(addComma(totalPrice));
						}
					}); 
				});
				$.ajax({
					type : 'POST',
					url : '/kgmall/cart/deleteCookie.do'
				});
			}
		});
	}
});
</script>