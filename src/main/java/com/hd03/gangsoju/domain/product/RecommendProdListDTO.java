package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : RecommendProdListDTO
 * @author : 김주현
 * 상세P: 추천 상품의 정보를 가진 DTO
 *********************************/
@Getter
@ToString
public class RecommendProdListDTO {

	private String bname;
	private String pcid;
	private String pcimg1;
	private int pcprice;
}
