package com.hd03.gangsoju.domain.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CouponDTO {
	
	private String mid;
	private String cIssuedate; 
	private String cExpiredate; 
	private String eTitle;
	private String eContent;
	private String eDiscount;
	private String expDday;
	
}
