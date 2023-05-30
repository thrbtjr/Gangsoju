package com.hd03.gangsoju.domain.order;
//소규석
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OrderCompleteVO {
	
	private String oid;
    private String oreceiver;
    private String ophone;
    private String ozipcode;
    private String oaddress1;
    private String oaddress2;
    private String omemo;
    private int obeforeprice;
    private int oafterprice;
    private String pmcode;

}
