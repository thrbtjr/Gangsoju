package com.hd03.gangsoju.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*********************************
 * @function : SocialMemberDTO
 * @author : 함세강
 * 소셜 로그인한 member정보를 반환하는 DTO
 *********************************/
@Setter
@Getter
@ToString
public class SocialMemberDTO {

	private String email;
	private String name;
	private String pwd;
	private int social;
	
}
