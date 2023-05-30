package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : ProductDetailCommonVO
 * @author : 김주현
 * 상품 상세 정보 with colors
 *********************************/
@Getter
@ToString
public class ProductDetailCommonVO {
	
	private String pid;
	private String pname;
	private String pnote;
	private String bno;
	private String bname;
	private int pstatus;
	
	private List<ProductDetailColorPerSizeVO> colors; //같은 pid 아래의 pcid들

}
