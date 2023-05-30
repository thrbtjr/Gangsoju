package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : SearchProductDTO
 * @author : 김주현
 * 검색P: 검색 결과의 상품 정보를 담은 DTO
 *********************************/
@Getter
@ToString
public class SearchProductDTO {

	private String pcid;
	private String pname;
	private String pcimg2;
	private int pcprice;
	private String bname;
}
