$(function(){
	$.ajax({
		type : 'GET',
		url : '/kgmall/board/myQAList.do',
		dataType : 'json',
		success : function(data){
			if(data=="0"){
				location.href="#";
			}else{
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
						id : 'seq'+items.seq,
						href : '#',
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
				 
				 $('#seq'+items.seq).click(function(){
					 	$('#myQALIST').attr('action','/kgmall/board/QAview.do?seq=3');
						var f= document.forms.myQALIST;
					    document.domain = "localhost";
					    opener.name = "myPage"; 
					    f.target = opener.name;
					    $('input[name=seq]').val(items.seq);
					    window.close();
					    $('#myQALIST').submit();
				});
			});
			
			}
			
		}
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
					
				});
				
				
			}
		}
		
	});
	
	
});