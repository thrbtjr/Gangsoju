package com.hd03.gangsoju.domain.product;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*********************************
 * @function : Pagination
 * @author : 김주현
 * 상품 리스트: 무한스크롤 시 필요한 페이징 정보 DTO
 *********************************/
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Pagination {
	
	//pagination
	private int currentPage; //현재 페이지
	private int pageSize; //한 페이지의 데이터 개수
	private int totalNumberOfResults; //전체 수량
	private int numberOfPages; //페이지 개수
	private int sort;
	
	//state
	private boolean isNextPage;
	private int nextPageNum;
	private int keepPageNum; //이전페이지
	private int displayTopPageNUm;
	
	private String chkBrand;
	private boolean chkSales;
	
	
	@Builder
	public Pagination(int currentPage, int pageSize, int totalNumberOfResults, int numberOfPages, int sort,
			boolean isNextPage, int nextPageNum, int keepPageNum, int displayTopPageNUm,
			String chkBrand, boolean chkSales) {
		
		this.currentPage = currentPage == 0 ? 1 : currentPage;
		this.pageSize = 14;
		this.totalNumberOfResults = totalNumberOfResults;
		this.numberOfPages = (int) Math.ceil(this.totalNumberOfResults / this.pageSize) + 1;
		this.sort = 0;
		
		this.isNextPage = currentPage < this.numberOfPages ? true : false;
		this.nextPageNum = currentPage == 1 ? 1 : currentPage+1;
		this.keepPageNum = currentPage == 1 ? 1 : this.currentPage - 1;
		this.displayTopPageNUm = 1;
		this.chkBrand = "";
		this.chkSales = false;
	}
}
