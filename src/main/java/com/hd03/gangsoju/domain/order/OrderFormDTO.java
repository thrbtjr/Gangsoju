package com.hd03.gangsoju.domain.order;
//소규석
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderFormDTO {
	
	private int totalPrice;
	private int count;
	private List<OrderProductVO> products;
	private OrderMemberVO member;

}
