package com.hd03.gangsoju.domain.cart;
//소규석
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateCartVO {

	private String mid;
	private String psid;
	private String pccolorcode;
	private String psize;
	private int pquantity;
}
