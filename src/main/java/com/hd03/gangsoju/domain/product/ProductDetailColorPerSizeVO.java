package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : ProductDetailColorPerSizeVO
 * @author : 김주현
 * 상품 색상의 정보를 가진 VO
 *********************************/
@Getter
@ToString
public class ProductDetailColorPerSizeVO {
	
	private String pcid;
	private String pcimg1;
	private String pcimg2;
	private String pcimg3;
	private String pcchipimg;
	private String pccolorcode;
	private int pcprice;
	private String pid;
	
	private List<ProductDetailSizeVO> sizes; //pcid에 따른 사이즈(재고)
}
