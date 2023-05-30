package com.hd03.gangsoju.domain.member;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LoginMemberDTO {
	private String mid;
    private String mpassword;
    private String mname;
    private String memail;
    private int from_social;
    private Date mbirth;
    private String mrole;
    
    
}
