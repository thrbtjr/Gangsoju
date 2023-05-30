package com.hd03.gangsoju.security.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hd03.gangsoju.domain.member.LoginMemberDTO;
import com.hd03.gangsoju.mapper.MemberMapper;
import com.hd03.gangsoju.security.dto.AuthMemberDTO;

import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : GangSoJuUserDetailsService
 * @author : 함세강
 * 일반 로그인 관련 비즈니스 로직을 다루는 Service
 *********************************/
@Log4j2
@Service
public class GangSoJuUserDetailsService implements UserDetailsService{
	
	@Autowired
	private MemberMapper memberMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		LoginMemberDTO loginMemberDTO=null;
		try {
			loginMemberDTO=memberMapper.findByEmail(username);
			log.info(loginMemberDTO);
		} catch (SQLException e) {
			throw new UsernameNotFoundException("check Id plz");
		}
		
		List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + loginMemberDTO.getMrole()));

        AuthMemberDTO authMemberDTO = new AuthMemberDTO(loginMemberDTO.getMid(),loginMemberDTO.getMpassword(),authorities,0,loginMemberDTO.getMname());
        
        // ClubAuthMemberDTO 값 세팅
        authMemberDTO.setName(loginMemberDTO.getMname());
        authMemberDTO.setPassword(loginMemberDTO.getMpassword());
        authMemberDTO.setFromSocial(0);
        log.info(authMemberDTO);
		
		return authMemberDTO;
	}
	
	
	
	
}
