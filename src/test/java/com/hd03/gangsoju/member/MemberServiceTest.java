package com.hd03.gangsoju.member;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.member.CheckExistDTO;
import com.hd03.gangsoju.domain.member.CheckIdDTO;
import com.hd03.gangsoju.domain.member.CheckIdValDTO;
import com.hd03.gangsoju.domain.member.CheckPwdDTO;
import com.hd03.gangsoju.domain.member.FindIdDTO;
import com.hd03.gangsoju.domain.member.FindIdLastDTO;
import com.hd03.gangsoju.domain.member.LoginFormDTO;
import com.hd03.gangsoju.domain.member.ModifyFormDTO;
import com.hd03.gangsoju.domain.member.MypageDTO;
import com.hd03.gangsoju.service.Member.MemberService;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MemberServiceTest {
	
	@Setter(onMethod_ =@Autowired)
	MemberService memberService;
	
	//회원가입 서비스 테스트
	@Test
	public void insertMemberServiceTest() {
		LoginFormDTO loginFormDTO = new LoginFormDTO();
		
		loginFormDTO.setMEmail("mouse");
		loginFormDTO.setMSite("naver.com");
		loginFormDTO.setMPassword("kosa12!@");
		loginFormDTO.setMName("마우스");
		loginFormDTO.setMPhone("01022223323");
		loginFormDTO.setMGender("0");
		loginFormDTO.setMBirthYear("1995");
		loginFormDTO.setMBirthMonth("07");
		loginFormDTO.setMBirthDate("12");
		
		assertThat(memberService.insertMemberService(loginFormDTO)).isEqualTo(1);
		
	}
	
	//아이디 중복검사 서비스 테스트
	@Test
	public void checkIdServiceTest1() {
		CheckIdDTO checkIdDTO = new CheckIdDTO();
		checkIdDTO.setCheckMid("katie@naver.com");
		assertThat(memberService.checkIdService(checkIdDTO)).isInstanceOf(CheckIdValDTO.class);
	}
	
	
	@Test
	public void checkIdServiceTest2() {
		CheckExistDTO checkExistDTO = new CheckExistDTO();
		checkExistDTO.setMphone("01022223323");
		checkExistDTO.setUserId("mouse@naver.com");
		assertThat(memberService.checkIdService(checkExistDTO)).isEqualTo(1);
	}

	//마이페이지 서비스 테스트
	@Test
	public void getMyPageServiceTest() {
		assertThat(memberService.getMyPageService("katie@naver.com")).isInstanceOf(MypageDTO.class);
	}
	
	//비밀번호 확인 서비스 테스트
	@Test
	public void checkPwdServiceTest() {
		assertThat(memberService.checkPwdService("mouse@naver.com", "kosa12!@")).isTrue();
	}
	
	//회원 탈퇴 서비스 테스트
	@Test
	public void deleteUserService() {
		assertThat(memberService.deleteMemberService("mouse@naver.com")).isEqualTo(1);
	}
	
	//회원 정보변경 서비스 테스트
	@Test
	public void modifyMemberServiceTest() {
		ModifyFormDTO modifyFormDTO = new ModifyFormDTO();
		modifyFormDTO.setMName("프레소");
		modifyFormDTO.setMPhone("01034562322");
		assertThat(memberService.modifyMemberService("test1@naver.com", modifyFormDTO)).isEqualTo(1);
	}
	
	//아이디 찾기 과정 아이디 존재 유무확인 테스트
	@Test
	public void findIdCheckTest() {
		FindIdDTO findIdDTO = new FindIdDTO();
		findIdDTO.setBirth("94/07/19");
		findIdDTO.setPhoneNum("01099293321");
		assertThat(memberService.findIdCheckService(findIdDTO)).isEqualTo(0);
		
	}
	
	//아이디 찾기 과정 아이디 값 반환 서비스 테스트
	@Test
	public void findIdValTest() {
		FindIdLastDTO findIdLastDTO = new FindIdLastDTO();
		findIdLastDTO.setMPhone("01055556666");
		findIdLastDTO.setMBirthYear("1994");
		findIdLastDTO.setMBirthMonth("07");
		findIdLastDTO.setMBirthDate("19");
		assertThat(memberService.findIdValService(findIdLastDTO)).isNotNull();
		
	}
	
	//비밀번호 재설정 서비스 테스트
	@Test
	public void resetPwdTest() {
		CheckPwdDTO checkPwdDTO = new CheckPwdDTO("test1@naver.com","kosa12!@");
		assertThat(memberService.resetPwdService(checkPwdDTO)).isEqualTo(1);
	}
	
	//핸드폰 중복검사 서비스 테스트
	@Test
	public void checkPhoneNumTest() {
		assertThat(memberService.checkPhoneNumService("01034562322")).isEqualTo(1);
	}
	
	
}
