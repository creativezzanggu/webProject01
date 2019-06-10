package list.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class ListPaging {
	private int currentPage;
	private int pageBlock;
	private int pageSize;
	private int totalA;
	private StringBuffer pagingHTML;
	private String category;
	private String category2;
	
	public void makePagingHTML(){
		pagingHTML = new StringBuffer();
		
		int totalP = (totalA+pageSize-1)/pageSize;
		
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage+pageBlock-1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > pageBlock)
			pagingHTML.append("[<a id=paging href='#' onclick=ListForm('"+(startPage-1)+"','"+getCategory()+"')>이전</a>]");
		
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage)
				pagingHTML.append("[<a id=currentPaging href='#' onclick=ListForm('"+i+"','"+getCategory()+"')>"+i+"</a>]");
			else
				pagingHTML.append("[<a id=paging href='#' onclick=ListForm('"+i+"','"+getCategory()+"')>"+i+"</a>]");
		}
		
		if(totalP > endPage)
			pagingHTML.append("[<a id=paging href='#' onclick=ListForm'('"+(endPage+1)+"','"+getCategory()+"')>다음</a>]");
	}

	public void makeSelectPagingHTML() {
		pagingHTML = new StringBuffer();
		
		int totalP = (totalA+pageSize-1)/pageSize;
		
		int startPage = (currentPage-1)/pageBlock*pageBlock+1;
		int endPage = startPage+pageBlock-1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > pageBlock)
			pagingHTML.append("[<span id=paging onclick=ListSelectForm("+(startPage-1)+",'"+getCategory()+"','"+getCategory2()+"')>이전</span>]");
		
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage)
				pagingHTML.append("[<span id=currentPaging onclick=ListSelectForm("+i+",'"+getCategory()+"','"+getCategory2()+"')>"+i+"</span>]");
			else
				pagingHTML.append("[<span id=paging onclick=ListSelectForm("+i+",'"+getCategory()+",'"+getCategory2()+"')>"+i+"</span>]");
		}
		
		if(totalP > endPage)
			pagingHTML.append("[<span id=paging onclick=ListSelectForm("+(endPage+1)+",'"+getCategory()+"','"+getCategory2()+"')>다음</span>]");
		
	}

}


	



















		
		
		
		
		
		
		
		
		







