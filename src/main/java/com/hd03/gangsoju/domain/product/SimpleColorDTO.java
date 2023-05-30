package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : SimpleColorDTO
 * @author : 김주현
 * 상세P: 함께 코디한 상품들의 색상만 보여주는 DTO
 *********************************/
@Getter
@ToString
public class SimpleColorDTO {

	private String pcid;
	private String pcchipimg;
	private String pccolorcode;
	private String pcimg2;
}
