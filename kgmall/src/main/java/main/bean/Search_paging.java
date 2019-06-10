package main.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class Search_paging {
	private int currentPage; //현재페이지
	private int pageBlock=3; //페이지 3페이지 단위로 표시
	private int pageSize=9; //한 페이지에 9씩 들어감
	private int totalA; //전체 상품 개수
	private String majorcategory;
	private String search_type;
	private String keyword;
	private String product_price1;
	private String product_price2;
	private String order;
	private String order_by;
	private StringBuffer pagingHTML;
	
	public void makePagingHTML(){
		pagingHTML = new StringBuffer();
		
		
		int totalP = (totalA+pageSize-1)/pageSize;
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage+pageBlock-1;
		if(endPage > totalP) endPage = totalP;
		
		//첫번째 페이지로
		pagingHTML.append("<p class='first'><a href='/kgmall/main/search.do?pg=1&majorcategory="+majorcategory+"&search_type="+search_type+"&keyword="+keyword+"&product_price1="+product_price1+"&product_price2="+product_price2+"&order="+order+"&order_by="+order_by+"'><img src='http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingFirst.png' class='img_on' alt='first'></a></p>");
		
		if(startPage > pageBlock)//시작 페이지가 3보다 클때
			pagingHTML.append("<p><a href='/kgmall/main/search.do?pg="+(startPage-1)+"&majorcategory="+majorcategory+"&search_type="+search_type+"&keyword="+keyword+"&product_price1="+product_price1+"&product_price2="+product_price2+"&order="+order+"&order_by="+order_by+"'><img src='http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingPrev.png' class='img_on' alt='prev'></a></p><!-- 이전 페이지 -->");
		else {
			pagingHTML.append("<p><a href='#none'><img src='http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingPrev.png' class='img_on' alt='prev'></a></p><!-- 이전 페이지 -->");

		}
		pagingHTML.append("<ol id='page_list'>");
		for(int i=startPage; i<=endPage; i++){
			if(i==currentPage)
				pagingHTML.append("<li class='xans-record-'><a href='/kgmall/main/search.do?pg="+i+"&majorcategory="+majorcategory+"&search_type="+search_type+"&keyword="+keyword+"&product_price1="+product_price1+"&product_price2="+product_price2+"&order="+order+"&order_by="+order_by+"' class='this' id='currentPage'>"+i+"</a></li>");
			else
				pagingHTML.append("<li class='xans-record-'><a href='/kgmall/main/search.do?pg="+i+"&majorcategory="+majorcategory+"&search_type="+search_type+"&keyword="+keyword+"&product_price1="+product_price1+"&product_price2="+product_price2+"&order="+order+"&order_by="+order_by+"' class='other' id='otherPage'>"+i+"</a></li>");
		}
		pagingHTML.append("</ol>");
		if(totalP > endPage) //전체 페이지가 끝 페이지 보다 클때
			pagingHTML.append("<p><a href='/kgmall/main/search.do?pg="+(endPage+1)+"&majorcategory="+majorcategory+"&search_type="+search_type+"&keyword="+keyword+"&product_price1="+product_price1+"&product_price2="+product_price2+"&order="+order+"&order_by="+order_by+"'><img src='http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingNext.png' class='img_on' alt='next'></a></p><!-- 다음 페이지 -->");
		else {
			pagingHTML.append("<p><a href='#none'><img src='http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingNext.png' class='img_on' alt='next'></a></p><!-- 다음 페이지 -->");
		}
		pagingHTML.append("<p class='last'><a href='/kgmall/main/search.do?pg="+totalP+"&majorcategory="+majorcategory+"&search_type="+search_type+"&keyword="+keyword+"&product_price1="+product_price1+"&product_price2="+product_price2+"&order="+order+"&order_by="+order_by+"'><img src='http://ecudemo31431.cafe24.com/web/upload/dfloor_base/web/button/btn_pagingLast.png' class='img_on' alt='last'></a></p><!-- 다음 페이지 리스트 -->");
	}
}