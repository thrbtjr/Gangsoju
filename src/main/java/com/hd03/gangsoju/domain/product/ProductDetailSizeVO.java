package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : ProductDetailColorPerSizeVO
 * @author : 김주현
 * 상품 사이즈, 재고 정보를 가진 VO
 *********************************/
@Getter
@ToString
public class ProductDetailSizeVO {
	
	private String psid;
	private int psstock;
	private String psize;
	private String pcid;

}
