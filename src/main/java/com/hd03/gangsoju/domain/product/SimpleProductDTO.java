package com.hd03.gangsoju.domain.product;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : SimpleProductDTO
 * @author : 김주현
 * 상세P: 함께 코디한 상품 DTO
 *********************************/
@Getter
@ToString
public class SimpleProductDTO {

	private String pid;
	private String bno;
	private String bname;
	private String pname;
	
	private String pcid; //함께코디: 자식 pid
	private String pcimg2;
	private int pcprice;
	
	private List<SimpleColorDTO> colors = new ArrayList<>(); //상품에 따른 색상 목록
	
}
