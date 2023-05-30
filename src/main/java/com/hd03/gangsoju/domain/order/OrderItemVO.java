package com.hd03.gangsoju.domain.order;
//소규석
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderItemVO {
	private String psid;
	private String oicount;
	private String oitotalPrice;
	private String ophone;
}
