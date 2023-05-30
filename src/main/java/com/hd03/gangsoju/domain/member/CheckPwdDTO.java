package com.hd03.gangsoju.domain.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
public class CheckPwdDTO {
	private String userId;
	private String pwd;
	
}
