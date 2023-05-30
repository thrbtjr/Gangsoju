package com.hd03.gangsoju.domain.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginFormDTO {
	
	private String mEmail;
	private String mSite;
	private String mPassword;
	private String mName;
	private String mPhone;
	private String mGender;
	private String mBirthYear;
	private String mBirthMonth;
	private String mBirthDate;
	
}


