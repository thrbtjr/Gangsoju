package com.hd03.gangsoju.mapper;

import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.hd03.gangsoju.domain.member.CheckExistDTO;
import com.hd03.gangsoju.domain.member.CheckIdDTO;
import com.hd03.gangsoju.domain.member.CheckPwdDTO;
import com.hd03.gangsoju.domain.member.FindIdDTO;
import com.hd03.gangsoju.domain.member.FindIdLastDTO;
import com.hd03.gangsoju.domain.member.InsertMemberDTO;
import com.hd03.gangsoju.domain.member.LoginMemberDTO;
import com.hd03.gangsoju.domain.member.ModifyFormDTO;
import com.hd03.gangsoju.domain.member.MypageDTO;

/*********************************
 * @function : MemberMapper
 * @author : 함세강
 * 회원 전반을 담당하는 Mapper
 *********************************/
@Mapper
public interface MemberMapper {
	
	//로그인한 아이디가 회원테이블에 있는지 파악하는 메서드
	public LoginMemberDTO findByEmail(@Param("memberId") String memberId) throws SQLException;
	//회원 가입 메서드
	public int insertMember(InsertMemberDTO dto);
	//회원가입시 제공하는 쿠폰 등록 메서드 
	public int insertRegCp1(@Param("userId") String userId);
	public int insertRegCp2(@Param("userId") String userId);
	//아이디 중복검사 메서드
	public int checkId(CheckIdDTO dto);
	//비밀번호 찾기 과정중 아이디가 존재 하는지 조회 하는 메서드
	public int checkIdVal(CheckExistDTO dto);
	//마이페이지 정보 가져오는 메서드
	public MypageDTO getMypageInfo(@Param("userId") String userId);
	//회원 탈퇴 메서드
	public int deleteMember(@Param("userId") String userId);
	//회원 비밀번호 찾기 메서드
	public String checkPwd(@Param("userId") String userId);
	//회원 정보 수정 메서드
	public int modifyMember(@Param("userId")String userId,@Param("dto") ModifyFormDTO modifyFormDTO);
	//아이디 찾기 가능 여부 확인 메서드
	public int findIdCheck(FindIdDTO findIdDTO);
	//아이디 찾기를 통해 찾은 아이디 반환 메서드
	public String findIdVal(FindIdLastDTO findIdLastDTO);
	//비밀번호 찾기 메서드
	public int resetPwd(CheckPwdDTO checkPwdDTO);
	//핸드폰 중복검사 메서드
	public int checkPhoneNum(@Param("mphone") String mphone);
	//회원 가입시 마일리지 추가해 메서드
	public int insertMileage(@Param("userId") String userId);
}
