package com.hd03.gangsoju.domain.cart;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
//소규석
@Getter
@Setter
@ToString
public class CartProductVO {
	private String bname;
	private String pname;
	private int dprice;
	private int pcprice;
	private int psstock;
	private String pccolorcode;
	private String color;
	private String psize;
	private int pquantity;
	private String pcimg2;
	private String psid;
	private String pcid;
	
	List<CartDetailColorPerSize> options;
}