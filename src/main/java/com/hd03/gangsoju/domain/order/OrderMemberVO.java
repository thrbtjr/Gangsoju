package com.hd03.gangsoju.domain.order;
//소규석
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OrderMemberVO {

	private String mname;
	private String mphone;
	private String mzipcode;
	private String maddress1;
	private String maddress2;
	private String mmileage;
	private int count;
	private List<OrderCouponVO> list;
}
