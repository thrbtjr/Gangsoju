package com.hd03.gangsoju.service.Member;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hd03.gangsoju.domain.member.CheckExistDTO;
import com.hd03.gangsoju.domain.member.CheckIdDTO;
import com.hd03.gangsoju.domain.member.CheckIdValDTO;
import com.hd03.gangsoju.domain.member.CheckPhoneNumDTO;
import com.hd03.gangsoju.domain.member.CheckPwdDTO;
import com.hd03.gangsoju.domain.member.FindIdDTO;
import com.hd03.gangsoju.domain.member.FindIdLastDTO;
import com.hd03.gangsoju.domain.member.InsertMemberDTO;
import com.hd03.gangsoju.domain.member.LoginFormDTO;
import com.hd03.gangsoju.domain.member.MatchPwdRDTO;
import com.hd03.gangsoju.domain.member.ModifyFormDTO;
import com.hd03.gangsoju.domain.member.MypageDTO;
import com.hd03.gangsoju.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


/*********************************
 * @function : MemberServiceImpl
 * @author : 함세강
 * 회원 전반을 담당하는 Service
 *********************************/
@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService{
	
	private final MemberMapper memberMapper;
	private final PasswordEncoder passwordEncoder;
	
	//회원가입 서비스
	@Transactional
	@Override
	public int insertMemberService(LoginFormDTO dto) {
		
		InsertMemberDTO insertMemberDTO = new InsertMemberDTO();
		//view단에서 이메일과 도메인 사이트를 각각 입력받아 합쳐주는 부분
		String mid = dto.getMEmail()+"@"+dto.getMSite();
		
		//vidw단에서 년도, 월, 일을 입려받아 Date 자료형으로 변환해 주는 부분 
		String mBirth = dto.getMBirthYear()+"년 "+dto.getMBirthMonth()+"월 "+dto.getMBirthDate()+"일";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일");
		Date date = new Date();
		try {
			date = formatter.parse(mBirth);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		insertMemberDTO.setMid(mid);
		insertMemberDTO.setMpassword(passwordEncoder.encode(dto.getMPassword()));
		insertMemberDTO.setMname(dto.getMName());
		insertMemberDTO.setMemail(mid);
		insertMemberDTO.setMphone(dto.getMPhone());
		insertMemberDTO.setMbirth(date);
		insertMemberDTO.setMgender(Integer.parseInt(dto.getMGender()));
		insertMemberDTO.setMtosno(0);
		insertMemberDTO.setMenabled(0);
		insertMemberDTO.setMrole("USER");
		
		
		
		log.info("회원가입 서비스 호출");
		log.info(insertMemberDTO);
		int insertCheck=0;
		
		//아이디, 비밀번호, 이름, 핸드폰번호, 생일 등을 받아서  회원 가입 insertMember 호출
		insertCheck= memberMapper.insertMember(insertMemberDTO);
		
		//회원 가입시 가입축하 쿠폰정보를 insert 시켜주는 부분
		int check1 = memberMapper.insertRegCp1(mid);
		int check2 = memberMapper.insertRegCp2(mid);
		int check3 = memberMapper.insertMileage(mid);
		return insertCheck;
	}
	
	
	//아이디 중복검사 서비스
	@Override
	public CheckIdValDTO checkIdService(CheckIdDTO dto) {
		log.info("중복체크 확인 서비스 호출");
		CheckIdValDTO checkIdValDTO = new CheckIdValDTO();
		
		//뷰에서 입력된 아이디를 매개변수로 중복검사해 주는 부분
		int checkVal = memberMapper.checkId(dto);
		checkIdValDTO.setCheckVal(checkVal);
		return checkIdValDTO;
	}
	
	//비밀번호 찾기 과정중 아이디가 존재 하는지 조회 하는 서비스
	@Override
	public int checkIdService(CheckExistDTO checkExistDTO) {
		int result =memberMapper.checkIdVal(checkExistDTO);
		return result;
	}

	//마이페이지 관련 데이터를 불러오는 서비스
	@Override
	public MypageDTO getMyPageService(String userId) {
		MypageDTO dto = new MypageDTO();
		log.info("getMyPageService 호출");
		//회원ID를 통해서 마이페이지 정보(주문내역, 마일리지 점수, 쿠폰내역, 등급)를 가져오는 부분
		dto = memberMapper.getMypageInfo(userId);
		
		String grade = dto.getMGrade();
		//DB에 저장된 등급에 따라 mypage에 반환시킬 등급을 변환하는 과정
		if(grade.equals("0")) {
			dto.setMGrade("FRIEND");
		}else if(grade.equals("1")) {
			dto.setMGrade("MANIA");
		}else{
			dto.setMGrade("STAR");
		}
		
		log.info(dto);
		
		return dto;
	}
	
	//회원 탈퇴 서비스
	@Override
	public int deleteMemberService(String userId) {
		//회원 ID를 입력받아서 DB에 저장된 enabled 칼럼을 0으로 바꿔 탈퇴처리 해주는 부분
		int result = memberMapper.deleteMember(userId);
		return result;
	}
	
	//비밀번호 확인 서비스
	@Override
	public boolean checkPwdService(String userId, String pwd) {
		String dbPwd="";
		dbPwd = memberMapper.checkPwd(userId);
		log.info(dbPwd);
		//passwordEncoder의 matches 메서드를 활용해서 입력된 비밀번호가 일치하는지 비교해 주는 부분
		boolean checkPwd = passwordEncoder.matches(pwd,dbPwd);
		log.info("비밀번호 결과 확인 체크 :"+checkPwd);
		return checkPwd;
	}
	
	//회원 정보변경 서비스
	@Override
	public int modifyMemberService(String userId,ModifyFormDTO modifyFormDTO) {
		//회원 아이디와 modifyFormDTO(회원이름, 회원 휴대폰번호) 객체를 사용해서 회원 정보 수정
		int result = memberMapper.modifyMember(userId, modifyFormDTO);
		log.info(modifyFormDTO);
		log.info("업데이트 성공");
		return result;
	}
	
	//아이디 찾기 과정 아이디 존재 유무확인 서비스
	@Override
	public int findIdCheckService(FindIdDTO findIdDTO) {
		log.info("findIdCheck 컨트롤러 호출");
		log.info(findIdDTO);
		//findIdDTO(핸드폰 번호, 생일)을 사용해서 계정이 존재하는지 확인
		int result = memberMapper.findIdCheck(findIdDTO); 
		return result;
	}

	
	//아이디 찾기 과정 아이디 값 반환 서비스
	@Override
	public String findIdValService(FindIdLastDTO findIdLastDTO) {
		//findIdLastDTO의 필드 값인 년도, 월, 일을 합쳐서 birth라는 전체 생일값을 만들고 
		String birth = findIdLastDTO.getMBirthYear()+"-"+findIdLastDTO.getMBirthMonth()+"-"+findIdLastDTO.getMBirthDate();
		//null이었던 생일 값을 birth로 할당해주는 부분
		findIdLastDTO.setMBirth(birth);
		//핸드폰 번호와 생일을 가지고 회원 Id를 조회해 오는 부분
		String userId = memberMapper.findIdVal(findIdLastDTO);
		log.info(userId);
		return userId;
	}

	
	//비밀번호 재설정 서비스
	@Override
	public int resetPwdService(CheckPwdDTO checkPwdDTO) {
		//view에서 입력받은 비밀번호를 가져오는 부분
		String befPwd = checkPwdDTO.getPwd();
		//입력받은 문자열 비밀번호를 passwordEncoder를 사용해서 암호화 시켜줌
		checkPwdDTO.setPwd(passwordEncoder.encode(befPwd));
		//암호화한 비밀번호를 member테이블의 password칼럼에 update 시켜주는 부분
		int result = memberMapper.resetPwd(checkPwdDTO);
		return result;
	}

	
	//핸드폰 번호 중복검사 서비스
	@Override
	public int checkPhoneNumService(String phoneNum) {
		log.info("핸드폰 중복검사 서비스 호출");
		int result= memberMapper.checkPhoneNum(phoneNum);
		return result;
	}
	
	
	
	
}
