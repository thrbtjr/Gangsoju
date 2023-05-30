package com.hd03.gangsoju.member;

import static org.assertj.core.api.Assertions.assertThat;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.member.CheckExistDTO;
import com.hd03.gangsoju.domain.member.CheckIdDTO;
import com.hd03.gangsoju.domain.member.CheckPwdDTO;
import com.hd03.gangsoju.domain.member.FindIdDTO;
import com.hd03.gangsoju.domain.member.FindIdLastDTO;
import com.hd03.gangsoju.domain.member.InsertMemberDTO;
import com.hd03.gangsoju.domain.member.LoginMemberDTO;
import com.hd03.gangsoju.domain.member.ModifyFormDTO;
import com.hd03.gangsoju.domain.member.MypageDTO;
import com.hd03.gangsoju.mapper.MemberMapper;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MemberMapperTest {
	
	@Autowired
	private MemberMapper memberMapper;
	
	//회원 가입 메서드 테스트
	@Test
	public void insertMapper() {
		
		InsertMemberDTO insertMemberDTO= new InsertMemberDTO();
		
		insertMemberDTO.setMid("3");
		insertMemberDTO.setMpassword("2");
		insertMemberDTO.setMname("ham");
		insertMemberDTO.setMemail("1");
		insertMemberDTO.setMphone("010202055");
		
		String mBirth = "1994년 07월 19일";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일");
		Date date = null;
		try {
			date = formatter.parse(mBirth);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		insertMemberDTO.setMbirth(date);
		insertMemberDTO.setMgender(Integer.parseInt("0"));
		insertMemberDTO.setMtosno(0);
		insertMemberDTO.setMenabled(0);
		insertMemberDTO.setMrole("USER");
		
		assertThat(memberMapper.insertMember(insertMemberDTO)).isEqualTo(1);
	}
	
	//로그인한 아이디가 회원테이블에 있는지 파악하는 메서드 테스트
	@Test
	public void findByEmailTest() {
		try {
			assertThat(memberMapper.findByEmail("katie@naver.com")).isInstanceOf(LoginMemberDTO.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	//회원가입시 제공하는 쿠폰 등록 메서드 테스트1
	@Test
	public void insertRegCp1Test() {
		assertThat(memberMapper.insertRegCp1("test1@naver.com")).isEqualTo(1);
	}
	//회원가입시 제공하는 쿠폰 등록 메서드 테스트2
	@Test
	public void insertRegCp2Test() {
		assertThat(memberMapper.insertRegCp2("test1@naver.com")).isEqualTo(1);
	}
	
	//아이디 중복검사 메서드 테스트
	@Test
	public void checkIdTest() {
		CheckIdDTO checkIdDTO = new CheckIdDTO();
		checkIdDTO.setCheckMid("test9999@naver.com");
		assertThat(memberMapper.checkId(checkIdDTO)).isEqualTo(0);
		
	}
	
	//찾는 아이디 존재 유무 반환 메서드 테스트
	@Test
	public void checkIdValTest() {
		CheckExistDTO checkExistDTO = new CheckExistDTO();
		checkExistDTO.setUserId("katie@naver.com");
		checkExistDTO.setMphone("01055556666");
		assertThat(memberMapper.checkIdVal(checkExistDTO)).isEqualTo(1);
	}
	
	//마이페이지 정보 가져오는 메서드 테스트
	@Test
	public void getMypageInfoTest() {
		assertThat(memberMapper.getMypageInfo("katie@naver.com")).isInstanceOf(MypageDTO.class);
	}
	
	//회원 탈퇴 메서드 테스트
	@Test
	public void deleteMemberTest() {
		assertThat(memberMapper.deleteMember("gangsoju@naver.com")).isEqualTo(1);
	}
	
	//회원 비밀번호 찾기 메서드 테스트
	@Test
	public void checkPwdTest() {
		assertThat(memberMapper.deleteMember("gangsoju@naver.com")).isNotNull();
	}
	
	//회원 정보 수정 메서드 테스트
	@Test
	public void modifyMember() {
		ModifyFormDTO modifyFormDTO = new ModifyFormDTO();
		modifyFormDTO.setMName("순하리");
		modifyFormDTO.setMPhone("01099293321");
		assertThat(memberMapper.modifyMember("test1@naver.com", modifyFormDTO)).isEqualTo(1);
	}
	
	//아이디 찾기 가능 여부 확인 메서드 테스트
	@Test
	public void findIdCheckTest() {
		FindIdDTO findIdDTO = new FindIdDTO();
		findIdDTO.setPhoneNum("01055556666");
		findIdDTO.setBirth("94/07/19");
		assertThat(memberMapper.findIdCheck(findIdDTO)).isEqualTo(1);
	}
	
	//아이디 찾기를 통해 찾은 아이디 반환 메서드 테스트
	@Test
	public void findIdValTest() {
		FindIdLastDTO findIdLastDTO = new FindIdLastDTO();
		findIdLastDTO.setMPhone("01055556666");
		findIdLastDTO.setMBirth("94/07/19");
		assertThat(memberMapper.findIdVal(findIdLastDTO)).isEqualTo("katie@naver.com");
	}
	
	//비밀번호 찾기 메서드 테스트
	@Test
	public void resetPwdTest() {
		CheckPwdDTO checkPwdDTO = new CheckPwdDTO("test1@naver.com","kosa12!@");
		assertThat(memberMapper.resetPwd(checkPwdDTO)).isEqualTo(1);
	}
	
	//핸드폰 중복검사 메서드 테스트
	@Test
	public void checkPhoneTest() {
		assertThat(memberMapper.checkPhoneNum("01055556666")).isEqualTo(1);
	}
	
	
}
