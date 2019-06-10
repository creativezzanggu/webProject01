$(function(){
	
	if($('#member').text()=='bronze'){
		$('#member').css("color", "brown");
	}else if($('#member').text() == 'silver'){
		$('#member').css("color","silver");
	}else{
		$('#member').css("color","gold");
	}
	
	var a;
	
	$.ajax({
		type : 'GET',
		url : '/kgmall/board/myQAList.do',
		dataType : 'json',
		success : function(data){
			
			if(data.list!=""){
				$('#empty3').attr("class","");
			
				$.each(data.list, function(index, items){
					$('<tr/>').append($('<td/>',{
						align : 'center',
						text : items.seq
					})).append($('<td/>',{
						align : 'center',
						text : items.category
					})).append($('<td/>',{
						align : 'center',
						class : 'subject'
						}).append($('<a/>',{
							href : '/kgmall/board/QAview.do?seq='+items.seq,
							text : items.subject
						}))
					).append($('<td/>',{
						align : 'center',
						text : items.id
					})).append($('<td/>',{
						align : 'center',
						text : items.logtime
					})).append($('<td/>',{
						align : 'center',
						text : items.hit
					})).appendTo($('#myQA'));
					
					if(index==2){
						return false;
					}
					
					
				});
			}
			
		}
	
	});
	
	$('#extend1').click(function(){ 
		window.open('/kgmall/user/myOrder.jsp','myOrder','scrollbars=yes,resizable=no,top=300,left=200,width=1400,height=400');
	});
	
	$('#extend2').click(function(){
		document.domain = "localhost"; 
		window.open('/kgmall/user/myQA.jsp','myQA','scrollbars=yes,resizable=no,top=300,left=200,width=1400,height=400');
	});
	
	$.ajax({
		type : 'GET',
		url : '/kgmall/order/userGetOrderList.do',
		dataType : 'json',
		success : function(data){
			if(data.list!=""){
				$('#empty1').attr("class","");
			
				$.each(data.list, function(index, items){
					$('<tr/>').append($('<td/>',{
						align : 'center',
						text : items.seq
					})).append($('<td/>',{
						align : 'center'
						}).append($('<img/>',{
							src : "../image/productImage/"+items.image,
							width : '40px',
							height : '40px'
					}))).append($('<td/>',{
						align : 'center',
						text : items.productName
					})).append($('<td/>',{
						align : 'center',
						text : items.quantity
					})).append($('<td/>',{
						align : 'center',
						text : items.total
					})).append($('<td/>',{
						align : 'center',
						text : items.orderState
					})).appendTo($('#orderState'));
					
					if(index==2){
						return false;
					}
				});
				
				
			}
		}
		
	});
});

