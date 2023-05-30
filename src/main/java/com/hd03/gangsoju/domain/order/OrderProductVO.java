package com.hd03.gangsoju.domain.order;
//소규석
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OrderProductVO {
	
	private String bname;
	private String pname;
	private int dprice;
	private int pcprice;
	private  int psstock;
	private String pccolorcode;
	private String color;
	private String psize;
	private int pquantity;
	private String pcimg2;
	private String psid;
	private String pcid;
	
	

}
