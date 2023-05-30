package com.hd03.gangsoju.domain.order;
//소규석
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrdersDTO {
	private String oid;
	private String ozipcode;
	private String oaddress1;
	private String oreceiver;
	private String ophone;
	private String omemo;
	private String cpid;
	private String pmcode;
	private String ousedmileage;
	private String obeforeprice;
	private String oafterprice;
	private String oaddress2;
	private List<OrderItemVO> list;
}
