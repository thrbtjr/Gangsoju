package com.hd03.gangsoju.domain.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/*********************************
 * @function : Category
 * @author : 김주현
 * 카테고리 VO
 *********************************/
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Category {
	private String cateno;
	private String catename; //category 테이블의 dept1name, depth2name, depth3name 중 1개
}
