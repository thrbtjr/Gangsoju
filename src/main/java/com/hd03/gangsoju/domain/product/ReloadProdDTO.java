package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.Getter;
import lombok.ToString;
/*********************************
 * @function : ReloadProdDTO
 * @author : 김주현
 * 상세P: 색상에 따라 변경될 상품 정보
 *********************************/
@Getter
@ToString
public class ReloadProdDTO {

	private String pcid;
	private String pcimg2;
	private String pcprice;
	private List<ProductDetailSizeVO> sizes; //색상에 따른 사이즈, 재고
	
}
