package com.hd03.gangsoju.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;

/*********************************
 * @function : SecurityConfig
 * @author : 함세강
 * 시큐리티 관련 설정을 해주는 Config
 *********************************/
@Configuration
@Log4j2
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private AuthenticationFailureHandler customFailureHandler;
	
	@Bean
    public RoleHierarchyImpl roleHierarchyImpl() {
        log.info("실행");
        RoleHierarchyImpl roleHierarchyImpl = new RoleHierarchyImpl();
        roleHierarchyImpl.setHierarchy("ROLE_ADMIN > ROLE_MANAGER > ROLE_USER");
        return roleHierarchyImpl;
    }

	
	@Bean
	PasswordEncoder passwordEncoder(){
	       return new BCryptPasswordEncoder();
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
       http.authorizeRequests()
           .antMatchers("/register").permitAll()
           .antMatchers("/cart").hasRole("USER")
       	   .antMatchers("/mypage").hasRole("USER");

       //인가 인증 문제시 로그인 화면
       http.formLogin()
       		.loginPage("/customLogin").permitAll()
       		.loginProcessingUrl("/login")
       		.failureHandler(customFailureHandler);
       //http.csrf().disable();
       http.logout()
       		.logoutUrl("/logout")
       		.logoutSuccessUrl("/main");
       
       http.oauth2Login();
	}
	
}
