package com.hd03.gangsoju.service.Member;

import com.hd03.gangsoju.domain.member.CheckExistDTO;
import com.hd03.gangsoju.domain.member.CheckIdDTO;
import com.hd03.gangsoju.domain.member.CheckIdValDTO;
import com.hd03.gangsoju.domain.member.CheckPhoneNumDTO;
import com.hd03.gangsoju.domain.member.CheckPwdDTO;
import com.hd03.gangsoju.domain.member.FindIdDTO;
import com.hd03.gangsoju.domain.member.FindIdLastDTO;
import com.hd03.gangsoju.domain.member.LoginFormDTO;
import com.hd03.gangsoju.domain.member.ModifyFormDTO;
import com.hd03.gangsoju.domain.member.MypageDTO;

/*********************************
 * @function : MemberService
 * @author : 함세강
 * 회원 전반을 담당하는 Service를 모아 놓은 interface
 *********************************/
public interface MemberService {

	//회원가입 서비스
	public int insertMemberService(LoginFormDTO dto);
	//아이디 중복검사 서비스
	public CheckIdValDTO checkIdService(CheckIdDTO dto);
	//비밀번호 찾기 과정중 아이디가 존재 하는지 조회 하는 서비스
	public int checkIdService(CheckExistDTO checkExistDTO);
	//마이페이지 서비스
	public MypageDTO getMyPageService(String userId);
	//회원 탈퇴 서비스
	public int deleteMemberService(String userId);
	//비밀번호 확인 서비스
	public boolean checkPwdService(String userId, String pwd);
	//회원 정보변경 서비스
	public int modifyMemberService(String userId,ModifyFormDTO modifyFormDTO);
	//아이디 찾기 과정 아이디 존재 유무확인
	public int findIdCheckService(FindIdDTO findIdDTO);
	//아이디 찾기 과정 아이디 값 반환 서비스
	public String findIdValService(FindIdLastDTO findIdLastDTO);
	//비밀번호 재설정 서비스
	public int resetPwdService(CheckPwdDTO checkPwdDTO);
	//핸드폰 번호 중복검사 서비스
	public int checkPhoneNumService(String phoneNum);
}
