package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*********************************
 * @function : ProductListDTO
 * @author : 김주현
 * 상품 리스트를 보여줄 파라미터 목록 + 현재 페이지 정보
 *********************************/
@Getter
@Setter
@ToString
public class ProductListParamsDTO { //form

	private String brandCode; //bno
	private String brandName; 
	private String categoryCode; //cateno
	private boolean mainCateFlag;
	private String repProdColorCode;
	private String repSizeEnumCode;
	private String priceOrderCode; 
	private String productOrderCode; //new, low, high
	private String checkSaleCode;
	private String rememberPage;
	
	//pagination
	private int pageNum;
	private int pageSize;
}
