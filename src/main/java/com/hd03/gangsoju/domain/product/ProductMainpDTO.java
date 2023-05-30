package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : ProductMainpDTO
 * @author : 김주현
 * 메인P: 베스트, 신상품 상품의 정보를 가진 DTO
 *********************************/
@Getter
@ToString
public class ProductMainpDTO {

	private String pcid;
	private String pname;
	private String pcimg2;
	private int pcprice;
	private String bname;
	private String cateno;
}
