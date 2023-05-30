package com.hd03.gangsoju.domain.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class CheckExistDTO {
	private String userId;
	private String mphone;
}
