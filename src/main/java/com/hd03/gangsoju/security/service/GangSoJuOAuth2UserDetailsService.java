package com.hd03.gangsoju.security.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.hd03.gangsoju.domain.member.InsertMemberDTO;
import com.hd03.gangsoju.domain.member.LoginMemberDTO;
import com.hd03.gangsoju.mapper.MemberMapper;
import com.hd03.gangsoju.security.dto.AuthMemberDTO;
import com.hd03.gangsoju.security.dto.SocialMemberDTO;

import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : GangSoJuOAuth2UserDetailsService
 * @author : 함세강
 * 소셜 로그인 관련 비즈니스 로직을 다루는 Service
 *********************************/
@Log4j2
@Service
public class GangSoJuOAuth2UserDetailsService extends DefaultOAuth2UserService{
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private LoginMemberDTO saveSocialMember(String email) throws SQLException{
		log.info("saveSocialMember 시작");
		
		LoginMemberDTO result = memberMapper.findByEmail(email);
		
		if (!(result == null)) {
            log.info("기존 회원");
            return  result;
        } 

		
		InsertMemberDTO insertMemberDTO = new InsertMemberDTO();
		String mBirth = "1994년 07월 19일";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일");
		Date date = new Date();
		try {
			date = formatter.parse(mBirth);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		
		insertMemberDTO.setMid(email);
		insertMemberDTO.setMname(email);
		insertMemberDTO.setMemail(email);
		insertMemberDTO.setSocial(1);
		insertMemberDTO.setMpassword(passwordEncoder.encode("1111"));
		insertMemberDTO.setMphone("01011111111");
		insertMemberDTO.setMbirth(date);
		insertMemberDTO.setMgender(0);
		insertMemberDTO.setMtosno(0);
		insertMemberDTO.setMenabled(0);
		insertMemberDTO.setMrole("USER");
		
		memberMapper.insertMember(insertMemberDTO);
		
		result = memberMapper.findByEmail(email);
		
		log.info(result);
		log.info("saveSocialMember 끝");
		return result;
		
	}
	
	
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		log.info("-----loaduser---------------");
    	log.info("userRequest" + userRequest);
    	
    	String clienName = userRequest.getClientRegistration().getClientName();
        //인증 제공자 출력
        log.info("clienName" + clienName);
        log.info(userRequest.getAdditionalParameters());
       
        //사용자 정보 가져오기 구글에서 허용한 API 범위
        OAuth2User oAuth2User = super.loadUser(userRequest);
        oAuth2User.getAttributes().forEach( ( k , v ) ->{
            log.info(k + " : " + v);
        });//end foreach

        String email = null;
        if (clienName.equals("Google")) {// 구글 인증 확인 부분
            email = oAuth2User.getAttribute("email");
        } // end if
        log.info("구글 인증 확인 부분");
        log.info("email : " + email);
        
        
 
        try {
        	LoginMemberDTO loginMemberDTO = saveSocialMember(email);
            log.info(loginMemberDTO);
            
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_"+loginMemberDTO.getMrole()));
            
            AuthMemberDTO authMemberDTO = 
            		new AuthMemberDTO(loginMemberDTO.getMid(), loginMemberDTO.getMpassword(), 1, authorities,oAuth2User.getAttributes());
            
            log.info(authMemberDTO);
            authMemberDTO.setName(loginMemberDTO.getMname());
            authMemberDTO.setPassword(loginMemberDTO.getMpassword());
            log.info(authMemberDTO);

            return authMemberDTO;
            
        } catch (SQLException e) {
            log.info("saveSocialMember error");
            log.info("에러 ");
            log.info(e.toString());
            return null;
        }//end try

	
		//return super.loadUser(userRequest);
	}
	
}
