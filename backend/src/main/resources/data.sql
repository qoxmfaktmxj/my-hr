-- ============================================================
-- 초기 데이터 (H2 개발용) - DataInitializer 대신 data.sql로 통합
-- ============================================================

-- ============================================================
-- 1. TORG101 (조직기본관리) - 부서 데이터
-- ============================================================
INSERT INTO TORG101 (ENTER_CD, ORG_CD, SDATE, EDATE, ORG_NM, ORG_FULL_NM, ORG_ENG_NM, ORG_TYPE, OBJECT_TYPE, VISUAL_YN, TEL_NO, CHKDATE, CHKID) VALUES
('BS', 'ORG000', '20200101', '99991231', '대표이사', '대표이사', 'CEO Office', 'T001', 'D', 'Y', '02-1234-5678', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG001', '20200101', '99991231', '경영지원본부', '경영지원본부', 'Management Support Division', 'T002', 'D', 'Y', '02-1234-5600', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG002', '20200101', '99991231', '인사팀', '경영지원본부 > 인사팀', 'HR Team', 'T003', 'T', 'Y', '02-1234-5610', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG003', '20200101', '99991231', '총무팀', '경영지원본부 > 총무팀', 'General Affairs Team', 'T003', 'T', 'Y', '02-1234-5620', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG004', '20200101', '99991231', '재무팀', '경영지원본부 > 재무팀', 'Finance Team', 'T003', 'T', 'Y', '02-1234-5630', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG010', '20200101', '99991231', '기술본부', '기술본부', 'Technology Division', 'T002', 'D', 'Y', '02-1234-5700', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG011', '20200101', '99991231', '개발1팀', '기술본부 > 개발1팀', 'Development Team 1', 'T003', 'T', 'Y', '02-1234-5710', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG012', '20200101', '99991231', '개발2팀', '기술본부 > 개발2팀', 'Development Team 2', 'T003', 'T', 'Y', '02-1234-5720', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG013', '20200101', '99991231', 'QA팀', '기술본부 > QA팀', 'QA Team', 'T003', 'T', 'Y', '02-1234-5730', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG020', '20200101', '99991231', '영업본부', '영업본부', 'Sales Division', 'T002', 'D', 'Y', '02-1234-5800', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG021', '20200101', '99991231', '국내영업팀', '영업본부 > 국내영업팀', 'Domestic Sales Team', 'T003', 'T', 'Y', '02-1234-5810', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG022', '20200101', '99991231', '해외영업팀', '영업본부 > 해외영업팀', 'Overseas Sales Team', 'T003', 'T', 'Y', '02-1234-5820', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', 'ORG030', '20200101', '99991231', '마케팅본부', '마케팅본부', 'Marketing Division', 'T002', 'D', 'Y', '02-1234-5900', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 2. THRM100 (인사마스타) - 사원 데이터 100명
-- ============================================================
INSERT INTO THRM100 (SABUN, ENTER_CD, KOR_NM, ENG_NM, SEX_TYPE, EMP_YMD, EMAIL, HP_NO, STATUS_CD, CHKDATE) VALUES
('20240001', 'BS', '김철수', 'Kim Cheolsu', 'M', '20200315', 'kim.cs@company.com', '010-1234-5678', '10', CURRENT_TIMESTAMP()),
('20240002', 'BS', '이영희', 'Lee Younghee', 'F', '20210701', 'lee.yh@company.com', '010-2345-6789', '10', CURRENT_TIMESTAMP()),
('20240003', 'BS', '박민수', 'Park Minsu', 'M', '20230110', 'park.ms@company.com', '010-3456-7890', '10', CURRENT_TIMESTAMP()),
('20240004', 'BS', '정수진', 'Jung Sujin', 'F', '20190520', 'jung.sj@company.com', '010-4567-8901', '20', CURRENT_TIMESTAMP()),
('20240005', 'BS', '최동훈', 'Choi Donghoon', 'M', '20240201', 'choi.dh@company.com', '010-5678-9012', '10', CURRENT_TIMESTAMP()),
('20240006', 'BS', '강미경', 'Kang Mikyung', 'F', '20180315', 'kang.mk@company.com', '010-6789-0123', '10', CURRENT_TIMESTAMP()),
('20240007', 'BS', '윤태호', 'Yoon Taeho', 'M', '20220601', 'yoon.th@company.com', '010-7890-1234', '10', CURRENT_TIMESTAMP()),
('20240008', 'BS', '한소희', 'Han Sohee', 'F', '20210915', 'han.sh@company.com', '010-8901-2345', '30', CURRENT_TIMESTAMP()),
('20240009', 'BS', '임재현', 'Lim Jaehyun', 'M', '20230405', 'lim.jh@company.com', '010-9012-3456', '10', CURRENT_TIMESTAMP()),
('20240010', 'BS', '오지영', 'Oh Jiyoung', 'F', '20200820', 'oh.jy@company.com', '010-0123-4567', '10', CURRENT_TIMESTAMP()),
('20240011', 'BS', '서준혁', 'Seo Junhyuk', 'M', '20190815', 'seo.jh@company.com', '010-1111-2222', '10', CURRENT_TIMESTAMP()),
('20240012', 'BS', '백지은', 'Baek Jieun', 'F', '20200312', 'baek.je@company.com', '010-1111-3333', '10', CURRENT_TIMESTAMP()),
('20240013', 'BS', '노현우', 'Noh Hyunwoo', 'M', '20210503', 'noh.hw@company.com', '010-1111-4444', '10', CURRENT_TIMESTAMP()),
('20240014', 'BS', '문세연', 'Moon Seyeon', 'F', '20180923', 'moon.sy@company.com', '010-1111-5555', '10', CURRENT_TIMESTAMP()),
('20240015', 'BS', '조성민', 'Cho Sungmin', 'M', '20220114', 'cho.sm@company.com', '010-1111-6666', '10', CURRENT_TIMESTAMP()),
('20240016', 'BS', '황예린', 'Hwang Yerin', 'F', '20230620', 'hwang.yr@company.com', '010-1111-7777', '10', CURRENT_TIMESTAMP()),
('20240017', 'BS', '신동현', 'Shin Donghyun', 'M', '20170405', 'shin.dh@company.com', '010-1111-8888', '10', CURRENT_TIMESTAMP()),
('20240018', 'BS', '권나영', 'Kwon Nayoung', 'F', '20191108', 'kwon.ny@company.com', '010-1111-9999', '20', CURRENT_TIMESTAMP()),
('20240019', 'BS', '유승호', 'Yoo Seungho', 'M', '20200722', 'yoo.sh@company.com', '010-2222-1111', '10', CURRENT_TIMESTAMP()),
('20240020', 'BS', '차은우', 'Cha Eunwoo', 'M', '20210930', 'cha.ew@company.com', '010-2222-2222', '10', CURRENT_TIMESTAMP()),
('20240021', 'BS', '안서현', 'Ahn Seohyun', 'F', '20180617', 'ahn.sh@company.com', '010-2222-3333', '10', CURRENT_TIMESTAMP()),
('20240022', 'BS', '송지훈', 'Song Jihoon', 'M', '20221205', 'song.jh@company.com', '010-2222-4444', '10', CURRENT_TIMESTAMP()),
('20240023', 'BS', '전소미', 'Jeon Somi', 'F', '20230318', 'jeon.sm@company.com', '010-2222-5555', '10', CURRENT_TIMESTAMP()),
('20240024', 'BS', '홍기범', 'Hong Kibeom', 'M', '20160912', 'hong.kb@company.com', '010-2222-6666', '10', CURRENT_TIMESTAMP()),
('20240025', 'BS', '양수빈', 'Yang Subin', 'F', '20190301', 'yang.sb@company.com', '010-2222-7777', '10', CURRENT_TIMESTAMP()),
('20240026', 'BS', '구자철', 'Koo Jachuul', 'M', '20201115', 'koo.jc@company.com', '010-2222-8888', '30', CURRENT_TIMESTAMP()),
('20240027', 'BS', '배수지', 'Bae Suji', 'F', '20211027', 'bae.sj@company.com', '010-2222-9999', '10', CURRENT_TIMESTAMP()),
('20240028', 'BS', '남궁민', 'Namgung Min', 'M', '20170708', 'namgung.m@company.com', '010-3333-1111', '10', CURRENT_TIMESTAMP()),
('20240029', 'BS', '하지원', 'Ha Jiwon', 'F', '20220420', 'ha.jw@company.com', '010-3333-2222', '10', CURRENT_TIMESTAMP()),
('20240030', 'BS', '탁재훈', 'Tak Jaehoon', 'M', '20180225', 'tak.jh@company.com', '010-3333-3333', '10', CURRENT_TIMESTAMP()),
('20240031', 'BS', '고은아', 'Ko Eunah', 'F', '20230815', 'ko.ea@company.com', '010-3333-4444', '10', CURRENT_TIMESTAMP()),
('20240032', 'BS', '장동건', 'Jang Donggun', 'M', '20150610', 'jang.dg@company.com', '010-3333-5555', '10', CURRENT_TIMESTAMP()),
('20240033', 'BS', '손예진', 'Son Yejin', 'F', '20191220', 'son.yj@company.com', '010-3333-6666', '10', CURRENT_TIMESTAMP()),
('20240034', 'BS', '현빈', 'Hyun Bin', 'M', '20200405', 'hyun.b@company.com', '010-3333-7777', '10', CURRENT_TIMESTAMP()),
('20240035', 'BS', '김태리', 'Kim Taeri', 'F', '20210718', 'kim.tr@company.com', '010-3333-8888', '10', CURRENT_TIMESTAMP()),
('20240036', 'BS', '이병헌', 'Lee Byunghun', 'M', '20140320', 'lee.bh@company.com', '010-3333-9999', '10', CURRENT_TIMESTAMP()),
('20240037', 'BS', '전지현', 'Jun Jihyun', 'F', '20180530', 'jun.jh@company.com', '010-4444-1111', '10', CURRENT_TIMESTAMP()),
('20240038', 'BS', '공유', 'Gong Yoo', 'M', '20160815', 'gong.y@company.com', '010-4444-2222', '10', CURRENT_TIMESTAMP()),
('20240039', 'BS', '한효주', 'Han Hyojoo', 'F', '20220925', 'han.hj@company.com', '010-4444-3333', '10', CURRENT_TIMESTAMP()),
('20240040', 'BS', '정해인', 'Jung Haein', 'M', '20230110', 'jung.hi@company.com', '010-4444-4444', '10', CURRENT_TIMESTAMP()),
('20240041', 'BS', '수지', 'Suzy', 'F', '20191105', 'suzy@company.com', '010-4444-5555', '20', CURRENT_TIMESTAMP()),
('20240042', 'BS', '박서준', 'Park Seojun', 'M', '20200628', 'park.sj@company.com', '010-4444-6666', '10', CURRENT_TIMESTAMP()),
('20240043', 'BS', '아이유', 'IU', 'F', '20170315', 'iu@company.com', '010-4444-7777', '10', CURRENT_TIMESTAMP()),
('20240044', 'BS', '이종석', 'Lee Jongsuk', 'M', '20210812', 'lee.js@company.com', '010-4444-8888', '10', CURRENT_TIMESTAMP()),
('20240045', 'BS', '박민영', 'Park Minyoung', 'F', '20180420', 'park.my@company.com', '010-4444-9999', '10', CURRENT_TIMESTAMP()),
('20240046', 'BS', '김수현', 'Kim Soohyun', 'M', '20220205', 'kim.sh@company.com', '010-5555-1111', '10', CURRENT_TIMESTAMP()),
('20240047', 'BS', '서예지', 'Seo Yeji', 'F', '20230720', 'seo.yj@company.com', '010-5555-2222', '10', CURRENT_TIMESTAMP()),
('20240048', 'BS', '남주혁', 'Nam Joohyuk', 'M', '20190918', 'nam.jh@company.com', '010-5555-3333', '10', CURRENT_TIMESTAMP()),
('20240049', 'BS', '신민아', 'Shin Minah', 'F', '20200130', 'shin.ma@company.com', '010-5555-4444', '10', CURRENT_TIMESTAMP()),
('20240050', 'BS', '이민호', 'Lee Minho', 'M', '20160525', 'lee.mh@company.com', '010-5555-5555', '10', CURRENT_TIMESTAMP()),
('20240051', 'BS', '김지원', 'Kim Jiwon', 'F', '20211103', 'kim.jw@company.com', '010-5555-6666', '10', CURRENT_TIMESTAMP()),
('20240052', 'BS', '조인성', 'Jo Insung', 'M', '20140715', 'jo.is@company.com', '010-5555-7777', '10', CURRENT_TIMESTAMP()),
('20240053', 'BS', '송혜교', 'Song Hyekyo', 'F', '20180928', 'song.hk@company.com', '010-5555-8888', '30', CURRENT_TIMESTAMP()),
('20240054', 'BS', '원빈', 'Won Bin', 'M', '20130420', 'won.b@company.com', '010-5555-9999', '10', CURRENT_TIMESTAMP()),
('20240055', 'BS', '김희선', 'Kim Heesun', 'F', '20220615', 'kim.hs@company.com', '010-6666-1111', '10', CURRENT_TIMESTAMP()),
('20240056', 'BS', '소지섭', 'So Jisub', 'M', '20170830', 'so.js@company.com', '010-6666-2222', '10', CURRENT_TIMESTAMP()),
('20240057', 'BS', '김남주', 'Kim Namjoo', 'F', '20190205', 'kim.nj@company.com', '010-6666-3333', '10', CURRENT_TIMESTAMP()),
('20240058', 'BS', '이정재', 'Lee Jungjae', 'M', '20150912', 'lee.jj@company.com', '010-6666-4444', '10', CURRENT_TIMESTAMP()),
('20240059', 'BS', '전도연', 'Jeon Doyeon', 'F', '20200520', 'jeon.dy@company.com', '010-6666-5555', '10', CURRENT_TIMESTAMP()),
('20240060', 'BS', '하정우', 'Ha Jungwoo', 'M', '20210308', 'ha.jw2@company.com', '010-6666-6666', '10', CURRENT_TIMESTAMP()),
('20240061', 'BS', '김혜수', 'Kim Hyesoo', 'F', '20161125', 'kim.hys@company.com', '010-6666-7777', '10', CURRENT_TIMESTAMP()),
('20240062', 'BS', '황정민', 'Hwang Jungmin', 'M', '20180118', 'hwang.jm@company.com', '010-6666-8888', '10', CURRENT_TIMESTAMP()),
('20240063', 'BS', '엄정화', 'Uhm Junghwa', 'F', '20230405', 'uhm.jh@company.com', '010-6666-9999', '10', CURRENT_TIMESTAMP()),
('20240064', 'BS', '류승룡', 'Ryu Seungryong', 'M', '20190720', 'ryu.sr@company.com', '010-7777-1111', '10', CURRENT_TIMESTAMP()),
('20240065', 'BS', '공효진', 'Gong Hyojin', 'F', '20201010', 'gong.hj@company.com', '010-7777-2222', '20', CURRENT_TIMESTAMP()),
('20240066', 'BS', '마동석', 'Ma Dongseok', 'M', '20220228', 'ma.ds@company.com', '010-7777-3333', '10', CURRENT_TIMESTAMP()),
('20240067', 'BS', '이나영', 'Lee Nayoung', 'F', '20170605', 'lee.ny@company.com', '010-7777-4444', '10', CURRENT_TIMESTAMP()),
('20240068', 'BS', '조승우', 'Jo Seungwoo', 'M', '20140915', 'jo.sw@company.com', '010-7777-5555', '10', CURRENT_TIMESTAMP()),
('20240069', 'BS', '한지민', 'Han Jimin', 'F', '20210422', 'han.jm@company.com', '010-7777-6666', '10', CURRENT_TIMESTAMP()),
('20240070', 'BS', '유아인', 'Yoo Ahhin', 'M', '20180803', 'yoo.ai@company.com', '010-7777-7777', '30', CURRENT_TIMESTAMP()),
('20240071', 'BS', '이보영', 'Lee Boyoung', 'F', '20230118', 'lee.by@company.com', '010-7777-8888', '10', CURRENT_TIMESTAMP()),
('20240072', 'BS', '정우성', 'Jung Woosung', 'M', '20130625', 'jung.ws@company.com', '010-7777-9999', '10', CURRENT_TIMESTAMP()),
('20240073', 'BS', '김아중', 'Kim Ahjoong', 'F', '20191230', 'kim.aj@company.com', '010-8888-1111', '10', CURRENT_TIMESTAMP()),
('20240074', 'BS', '조진웅', 'Jo Jinwoong', 'M', '20200915', 'jo.jw@company.com', '010-8888-2222', '10', CURRENT_TIMESTAMP()),
('20240075', 'BS', '고소영', 'Ko Soyoung', 'F', '20160320', 'ko.sy@company.com', '010-8888-3333', '10', CURRENT_TIMESTAMP()),
('20240076', 'BS', '설경구', 'Sul Kyunggu', 'M', '20211105', 'sul.kg@company.com', '010-8888-4444', '10', CURRENT_TIMESTAMP()),
('20240077', 'BS', '이영애', 'Lee Youngae', 'F', '20140210', 'lee.ya@company.com', '010-8888-5555', '10', CURRENT_TIMESTAMP()),
('20240078', 'BS', '송강호', 'Song Kangho', 'M', '20120815', 'song.kh@company.com', '010-8888-6666', '10', CURRENT_TIMESTAMP()),
('20240079', 'BS', '김선아', 'Kim Sunah', 'F', '20220520', 'kim.sa@company.com', '010-8888-7777', '10', CURRENT_TIMESTAMP()),
('20240080', 'BS', '이선균', 'Lee Sunkyun', 'M', '20170928', 'lee.sk@company.com', '010-8888-8888', '10', CURRENT_TIMESTAMP()),
('20240081', 'BS', '문소리', 'Moon Sori', 'F', '20190415', 'moon.sr@company.com', '010-8888-9999', '10', CURRENT_TIMESTAMP()),
('20240082', 'BS', '김윤석', 'Kim Yoonseok', 'M', '20201218', 'kim.ys@company.com', '010-9999-1111', '10', CURRENT_TIMESTAMP()),
('20240083', 'BS', '전미선', 'Jeon Misun', 'F', '20180605', 'jeon.ms@company.com', '010-9999-2222', '20', CURRENT_TIMESTAMP()),
('20240084', 'BS', '유해진', 'Yoo Haejin', 'M', '20210730', 'yoo.hj@company.com', '010-9999-3333', '10', CURRENT_TIMESTAMP()),
('20240085', 'BS', '김민희', 'Kim Minhee', 'F', '20230225', 'kim.mh@company.com', '010-9999-4444', '10', CURRENT_TIMESTAMP()),
('20240086', 'BS', '조정석', 'Jo Jungsuk', 'M', '20160112', 'jo.js@company.com', '010-9999-5555', '10', CURRENT_TIMESTAMP()),
('20240087', 'BS', '라미란', 'Ra Miran', 'F', '20191020', 'ra.mr@company.com', '010-9999-6666', '10', CURRENT_TIMESTAMP()),
('20240088', 'BS', '박해일', 'Park Haeil', 'M', '20200308', 'park.hi@company.com', '010-9999-7777', '10', CURRENT_TIMESTAMP()),
('20240089', 'BS', '염정아', 'Yum Junga', 'F', '20220815', 'yum.ja@company.com', '010-9999-8888', '10', CURRENT_TIMESTAMP()),
('20240090', 'BS', '김의성', 'Kim Euisung', 'M', '20171205', 'kim.es@company.com', '010-9999-9999', '10', CURRENT_TIMESTAMP()),
('20240091', 'BS', '배두나', 'Bae Doona', 'F', '20140525', 'bae.dn@company.com', '010-1010-1010', '10', CURRENT_TIMESTAMP()),
('20240092', 'BS', '유연석', 'Yoo Yeonseok', 'M', '20210115', 'yoo.ys@company.com', '010-1010-2020', '10', CURRENT_TIMESTAMP()),
('20240093', 'BS', '이정은', 'Lee Jungeun', 'F', '20180920', 'lee.je@company.com', '010-1010-3030', '10', CURRENT_TIMESTAMP()),
('20240094', 'BS', '김상호', 'Kim Sangho', 'M', '20230610', 'kim.sho@company.com', '010-1010-4040', '10', CURRENT_TIMESTAMP()),
('20240095', 'BS', '진경', 'Jin Kyung', 'F', '20190228', 'jin.k@company.com', '010-1010-5050', '30', CURRENT_TIMESTAMP()),
('20240096', 'BS', '오달수', 'Oh Dalsu', 'M', '20151018', 'oh.ds@company.com', '010-1010-6060', '10', CURRENT_TIMESTAMP()),
('20240097', 'BS', '박소담', 'Park Sodam', 'F', '20201125', 'park.sd@company.com', '010-1010-7070', '10', CURRENT_TIMESTAMP()),
('20240098', 'BS', '이광수', 'Lee Kwangsoo', 'M', '20220405', 'lee.ks@company.com', '010-1010-8080', '10', CURRENT_TIMESTAMP()),
('20240099', 'BS', '정려원', 'Jung Ryowon', 'F', '20170715', 'jung.rw@company.com', '010-1010-9090', '10', CURRENT_TIMESTAMP()),
('20240100', 'BS', '김래원', 'Kim Raewon', 'M', '20260201', 'kim.rw@company.com', '010-2020-1010', '10', CURRENT_TIMESTAMP());

-- ============================================================
-- 3. TSYS305 (USER관리) - 로그인 계정 (비밀번호: password123)
--    BCrypt 해싱값 = $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- ============================================================
-- 주요 테스트 계정 5개
INSERT INTO TSYS305 (ENTER_CD, SABUN, ID, PASSWORD, ROCKING_YN, LOGIN_FAIL_CNT, PSWD_CHG_YMD, SEARCH_TYPE, EXTRA_YN, MAIN_TYPE, SKIN_TYPE, FONT_TYPE, CHKDATE, CHKID) VALUES
('BS', '20240001', 'admin',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'N', 0, '20250201', 'A', 'N', 'M', 'theme4', 'nanum', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240002', 'younghee',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'N', 0, '20250201', 'P', 'N', 'M', 'theme4', 'nanum', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240003', 'minsu',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'N', 0, '20250201', 'P', 'N', 'M', 'theme4', 'nanum', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240004', 'sujin',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'N', 0, '20250201', 'P', 'N', 'M', 'theme4', 'nanum', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240005', 'donghun',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'N', 0, '20250201', 'P', 'N', 'M', 'theme4', 'nanum', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 4. THRM151 (인사이력 - 개인조직사항) - 현재 유효 이력
-- ============================================================
-- 대표이사 직할
INSERT INTO THRM151 (ENTER_CD, SABUN, SDATE, EDATE, ORG_CD, STATUS_CD, STATUS_NM, JIKCHAK_CD, JIKCHAK_NM, JIKWEE_CD, JIKWEE_NM, JIKGUB_CD, JIKGUB_NM, MANAGE_CD, MANAGE_NM, MAIN_DEPT_YN, CHKDATE, CHKID) VALUES
('BS', '20240001', '20200315', '99991231', 'ORG002', '10', '재직', 'JC001', '팀장',   'JW002', '부장', 'JG002', '부장', 'MG01', '정규직', 'Y', CURRENT_TIMESTAMP(), 'SYSTEM');
-- 인사팀
INSERT INTO THRM151 (ENTER_CD, SABUN, SDATE, EDATE, ORG_CD, STATUS_CD, STATUS_NM, JIKCHAK_CD, JIKCHAK_NM, JIKWEE_CD, JIKWEE_NM, JIKGUB_CD, JIKGUB_NM, MANAGE_CD, MANAGE_NM, MAIN_DEPT_YN, CHKDATE, CHKID) VALUES
('BS', '20240002', '20210701', '99991231', 'ORG002', '10', '재직', NULL,    NULL,     'JW004', '과장', 'JG004', '과장', 'MG01', '정규직', 'Y', CURRENT_TIMESTAMP(), 'SYSTEM');
-- 개발1팀
INSERT INTO THRM151 (ENTER_CD, SABUN, SDATE, EDATE, ORG_CD, STATUS_CD, STATUS_NM, JIKCHAK_CD, JIKCHAK_NM, JIKWEE_CD, JIKWEE_NM, JIKGUB_CD, JIKGUB_NM, MANAGE_CD, MANAGE_NM, MAIN_DEPT_YN, CHKDATE, CHKID) VALUES
('BS', '20240003', '20230110', '99991231', 'ORG011', '10', '재직', NULL,    NULL,     'JW006', '사원', 'JG006', '사원', 'MG01', '정규직', 'Y', CURRENT_TIMESTAMP(), 'SYSTEM');
-- 총무팀 (휴직)
INSERT INTO THRM151 (ENTER_CD, SABUN, SDATE, EDATE, ORG_CD, STATUS_CD, STATUS_NM, JIKCHAK_CD, JIKCHAK_NM, JIKWEE_CD, JIKWEE_NM, JIKGUB_CD, JIKGUB_NM, MANAGE_CD, MANAGE_NM, MAIN_DEPT_YN, CHKDATE, CHKID) VALUES
('BS', '20240004', '20190520', '99991231', 'ORG003', '20', '휴직', NULL,    NULL,     'JW004', '과장', 'JG004', '과장', 'MG01', '정규직', 'Y', CURRENT_TIMESTAMP(), 'SYSTEM');
-- 개발2팀
INSERT INTO THRM151 (ENTER_CD, SABUN, SDATE, EDATE, ORG_CD, STATUS_CD, STATUS_NM, JIKCHAK_CD, JIKCHAK_NM, JIKWEE_CD, JIKWEE_NM, JIKGUB_CD, JIKGUB_NM, MANAGE_CD, MANAGE_NM, MAIN_DEPT_YN, CHKDATE, CHKID) VALUES
('BS', '20240005', '20240201', '99991231', 'ORG012', '10', '재직', NULL,    NULL,     'JW006', '사원', 'JG006', '사원', 'MG01', '정규직', 'Y', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 5. THRM111 (가족사항)
-- ============================================================
INSERT INTO THRM111 (ENTER_CD, SABUN, FAM_NM, FAM_CD, SDATE, FAM_YMD, SEX_TYPE, TEL_NO, FAM_YN, NOTE, CHKDATE, CHKID) VALUES
('BS', '20240001', '김순자', '01', '20200315', '19551020', 'F', '010-1111-0001', 'Y', '어머니', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240001', '김민지', '03', '20200315', '20100305', 'F', '010-1111-0002', 'Y', '딸', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240002', '이정호', '02', '20210701', '19600815', 'M', '010-2222-0001', 'N', '아버지', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 6. THRM113 (자격사항)
-- ============================================================
INSERT INTO THRM113 (ENTER_CD, SABUN, SEQ, LICENSE_NM, LICENSE_GRADE, LICENSE_NO, LIC_S_YMD, OFFICE_CD, LICENSE_BIGO, CHKDATE, CHKID) VALUES
('BS', '20240001', 1, '정보처리기사', '기사', '2018-001234', '20180615', '한국산업인력공단', '', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240001', 2, 'SQLD', '전문가', 'SQL-2020-5678', '20200320', '한국데이터산업진흥원', '', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240003', 1, 'AWS Solutions Architect', 'Associate', 'AWS-2023-1234', '20230801', 'Amazon', '', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 7. THRM115 (학력사항)
-- ============================================================
INSERT INTO THRM115 (ENTER_CD, SABUN, SEQ, ACA_SCH_NM, ACAMAJ_NM, ACA_S_YM, ACA_E_YM, ACA_YN, ACA_TYPE, NOTE, CHKDATE, CHKID) VALUES
('BS', '20240001', 1, '서울대학교', '컴퓨터공학', '20100301', '20140228', '10', 'Y', '학사', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240001', 2, '서울중학교', '', '20040301', '20070228', '10', 'N', '', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240002', 1, '연세대학교', '경영학', '20120301', '20160228', '10', 'Y', '학사', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240003', 1, '한양대학교', '소프트웨어학', '20180301', '20220228', '10', 'Y', '학사', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 8. THRM121 (병역사항)
-- ============================================================
INSERT INTO THRM121 (ENTER_CD, SABUN, TRANSFER_CD, ARMY_CD, ARMY_GRADE_CD, ARMY_NO, ARMY_S_YMD, ARMY_E_YMD, ARMY_UNIT_NM, DISCHARGE_CD, ARMY_MEMO, CHKDATE, CHKID) VALUES
('BS', '20240001', '01', '01', '05', '12-71234567', '20140701', '20160401', '육군 제1사단', '01', '만기전역', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240003', '01', '02', '06', '23-71234568', '20220301', '20231201', '해군 작전사령부', '01', '만기전역', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 9. THRM124 (연락처)
-- ============================================================
INSERT INTO THRM124 (ENTER_CD, SABUN, CONT_TYPE, CONT_ADDRESS, CHKDATE, CHKID) VALUES
('BS', '20240001', '01', '010-1234-5678', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240001', '02', '02-1234-5678', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240001', '03', 'kim.cs@personal.com', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240002', '01', '010-2345-6789', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 10. THRM128 (포상관리)
-- ============================================================
INSERT INTO THRM128 (ENTER_CD, SABUN, SEQ, PRIZE_YMD, PRIZE_CD, PRIZE_OFFICE_NM, MEMO2, NOTE, CHKDATE, CHKID) VALUES
('BS', '20240001', 1, '20220115', '01', '대표이사', '연간 우수사원 선정', '상금 200만원', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240001', 2, '20230720', '02', '기술본부장', '프로젝트 우수 기여', '', CURRENT_TIMESTAMP(), 'SYSTEM'),
('BS', '20240003', 1, '20240101', '01', '개발본부장', '신규 서비스 런칭 기여', '상금 100만원', CURRENT_TIMESTAMP(), 'SYSTEM');

-- ============================================================
-- 11. THRM129 (징계관리)
-- ============================================================
INSERT INTO THRM129 (ENTER_CD, SABUN, SEQ, PUNISH_YMD, PUNISH_CD, PUNISH_GB, SDATE, EDATE, PUNISH_MEMO, NOTE, CHKDATE, CHKID) VALUES
('BS', '20240005', 1, '20240815', '01', '01', '20240815', '20240915', '지각 3회 누적', '경고', CURRENT_TIMESTAMP(), 'SYSTEM');
