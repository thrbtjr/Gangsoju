package com.hd03.gangsoju.domain.cart;

import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
//소규석
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartFormDTO {
	
	List<CartProductVO> list;
	int count;
	int totalProduct;
	List<String> recommand;

}
