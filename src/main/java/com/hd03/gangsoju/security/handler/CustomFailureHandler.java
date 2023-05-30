package com.hd03.gangsoju.security.handler;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : CustomFailureHandler
 * @author : 함세강
 * 로그인 실패시 에러를 다루는 Handler
 *********************************/
@Component
@Log4j2
public class CustomFailureHandler extends SimpleUrlAuthenticationFailureHandler{

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
			String errorMsg="";
			
			if(exception instanceof BadCredentialsException) {
				errorMsg = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.";
			}else if(exception instanceof UsernameNotFoundException) {
				errorMsg = "계정이 존재하지 않습니다. 회원가입을 진행해 주세요.";
			}else {
				errorMsg = "계정이 존재하지 않습니다. 회원가입을 진행해 주세요.";
			}
			
			errorMsg = URLEncoder.encode(errorMsg, "UTF-8");
			log.info("errorMsg"+errorMsg);
			
			setDefaultFailureUrl("/customLogin?error=true&exception="+errorMsg);
			
		super.onAuthenticationFailure(request, response, exception);
	}
}
