package com.hd03.gangsoju.domain.member;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class MypageDTO {
	
	private String mid;
	private String mName;
	private List<OrderSuccessDTO> orderList;
	private int mMileage;
	private String mGrade;
	private List<CouponDTO> couponList;
	
	
	
}
