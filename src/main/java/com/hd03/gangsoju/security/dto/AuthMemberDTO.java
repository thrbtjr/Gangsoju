package com.hd03.gangsoju.security.dto;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*********************************
 * @function : AuthMemberDTO
 * @author : 함세강
 * 일반 로그인한 member정보를 반환하는 DTO
 *********************************/
@Getter
@Setter
@ToString
public class AuthMemberDTO extends User implements OAuth2User{
	
	private static final long serialVersionUID = 1L;
	private String email;
	private String name;
	private int fromSocial;
	private String password;
    private Map<String, Object> OA2_attr;

    
    public AuthMemberDTO(String username,String password,int fromSocial,List<GrantedAuthority> authorities,Map<String, Object> OA2_attr) {
        this(username,password,fromSocial,authorities);
        this.OA2_attr = OA2_attr;
    }

	
	public AuthMemberDTO(String username, String password, List<GrantedAuthority> authorities,int fromSocial, String name) {
		super(username, password, authorities);
		this.email = username;
        this.fromSocial = fromSocial;
        this.name= name;
	}
	
	public AuthMemberDTO(String username, String password, int fromSocial,List<GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.email = username;
		this.fromSocial = fromSocial;
	}


	@Override
	public Map<String, Object> getAttributes() {
		return null;
	}

}
