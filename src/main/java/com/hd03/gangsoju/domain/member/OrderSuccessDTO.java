package com.hd03.gangsoju.domain.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderSuccessDTO {
	
	private String oid;
	private String orderImg;
	private String pName;
	private String mid;
	private String oDate;
	private String bName;
	private int totalCount;
	private int totalPrice;
	
}
