# my-hr

> HRIS (Human Resource Information System) - 인사관리시스템

## 프로젝트 개요

인사관리시스템 (HRIS) 프로젝트입니다. 사원관리, 인사기본정보, 부서관리, 메뉴관리, 공통코드 등 인사 업무에 필요한 핵심 기능을 구현하고 있습니다.

## 기술 스택

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Ant Design v6** (UI 라이브러리, 한국어 로케일 ko_KR)
- **TanStack Query (React Query)** - 서버 상태관리, 캐싱
- **React Router v6** - 라우팅
- **Zustand** - 클라이언트 상태관리 (인증)
- **Axios** - HTTP 클라이언트

### Backend
- **Java 21** + **Spring Boot 3.4.1**
- **Spring Security** + **JWT** 인증 (Access Token + Refresh Token)
- **Spring Data JPA / Hibernate**
- **H2 Database** (개발환경, 인메모리)
- **PostgreSQL** (운영환경 전환 예정)

## 프로젝트 구조

```
my-hr/
├── frontend/                          # React 프론트엔드
│   └── src/
│       ├── api/                       # API 호출 모듈
│       │   ├── axiosInstance.ts        # Axios 인스턴스 (JWT 인터셉터)
│       │   ├── employeeApi.ts          # 사원 API
│       │   ├── organizationApi.ts      # 조직 API
│       │   ├── personnelApi.ts         # 인사기본 API
│       │   ├── menuApi.ts              # 메뉴 API
│       │   └── codeApi.ts              # 공통코드 API
│       ├── hooks/                     # Custom Hooks
│       │   ├── useEmployee.ts          # 사원관리 hooks
│       │   ├── useOrganization.ts      # 조직관리 hooks
│       │   ├── usePersonnel.ts         # 인사기본 hooks
│       │   ├── useMenu.ts              # 메뉴관리 hooks
│       │   └── useCommonCode.ts        # 공통코드 hooks (30분 캐시)
│       ├── pages/
│       │   ├── Login.tsx               # 로그인 페이지
│       │   ├── Dashboard.tsx           # 대시보드
│       │   ├── employee/              # 사원관리
│       │   │   ├── EmployeeList.tsx     # 사원목록 (검색, 필터, 페이징)
│       │   │   ├── EmployeeDetail.tsx   # 사원상세
│       │   │   ├── EmployeeRegister.tsx # 사원등록
│       │   │   └── EmployeeFormModal.tsx # 등록/수정 모달
│       │   ├── personnel/             # 인사기본 (7개 탭)
│       │   │   ├── PersonnelInfo.tsx    # 인사기본 메인
│       │   │   └── tabs/
│       │   │       ├── PersonnelBasicTab.tsx  # 기본정보
│       │   │       ├── FamilyTab.tsx          # 가족사항
│       │   │       ├── ContactTab.tsx         # 연락처
│       │   │       ├── MilitaryTab.tsx        # 병역사항
│       │   │       ├── EducationTab.tsx       # 학력사항
│       │   │       ├── CertificateTab.tsx     # 자격증
│       │   │       └── CareerTab.tsx          # 경력사항
│       │   ├── organization/          # 조직관리
│       │   │   └── DepartmentList.tsx   # 부서관리
│       │   └── system/                # 시스템관리
│       │       └── MenuManagement.tsx   # 메뉴관리
│       ├── components/
│       │   └── MainLayout.tsx          # 레이아웃 (동적 사이드바)
│       ├── store/
│       │   └── authStore.ts            # 인증 상태 (Zustand)
│       └── App.tsx                    # 라우팅 설정
│
├── backend/                           # Spring Boot 백엔드
│   └── src/main/java/com/myhr/
│       ├── controller/
│       │   ├── auth/
│       │   │   └── AuthController.java        # 로그인/리프레시/로그아웃
│       │   ├── employee/
│       │   │   └── EmployeeController.java    # 사원 CRUD API
│       │   ├── organization/
│       │   │   └── OrganizationController.java # 조직 CRUD API
│       │   ├── personnel/
│       │   │   └── PersonnelController.java   # 인사기본 API (7개 카테고리)
│       │   └── system/
│       │       ├── MenuController.java        # 메뉴관리 API
│       │       └── CommonCodeController.java  # 공통코드 API
│       ├── domain/
│       │   ├── employee/
│       │   │   ├── Employee.java              # 사원 엔티티
│       │   │   └── EmployeeRepository.java
│       │   ├── personnel/                    # 인사기본 엔티티 (7개)
│       │   │   ├── Family.java, Contact.java, Military.java
│       │   │   ├── Education.java, Certificate.java, Career.java
│       │   │   └── PersonnelBasic.java
│       │   └── system/
│       │       ├── MainMenu.java (TSYS309)    # 대메뉴
│       │       ├── MenuItem.java (TSYS303)    # 서브메뉴
│       │       ├── CommonCode.java (TSYS005)  # 공통코드
│       │       └── CommonCodeRepository.java
│       ├── service/
│       │   ├── employee/EmployeeService.java
│       │   ├── personnel/PersonnelService.java
│       │   └── system/
│       │       ├── MenuService.java
│       │       └── CommonCodeService.java
│       ├── config/
│       │   ├── SecurityConfig.java           # Spring Security 설정
│       │   ├── WebConfig.java                # CORS 설정
│       │   └── JwtFilter.java                # JWT 인증 필터
│       └── util/
│           └── JwtUtil.java                  # JWT 토큰 생성/검증
│
└── database/                          # DB 스크립트
```

## 시작하기

### Frontend
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Backend
```bash
cd backend
./gradlew bootRun    # http://localhost:8080
```

### 로그인 정보 (개발환경)
| 항목 | 값 |
|------|-----|
| ID | admin |
| 비밀번호 | password123 |
| 회사코드 | BS |

## 구현 완료 기능

### 1. 인증 시스템
- JWT 기반 인증 (Access Token 메모리 저장 + Refresh Token HttpOnly 쿠키)
- 로그인/로그아웃/토큰 갱신
- 페이지 새로고침 시 로그인 유지 (쿠키 기반 리프레시)
- Spring Security + JwtFilter 연동

### 2. 사원관리
- **사원목록**: 검색 (이름/사번), 재직상태 필터, 페이징, 정렬
- **사원등록**: 기본정보 + 인사정보 탭 분리, 부서 Select (조직 API 연동)
- **사원상세**: 상세정보 조회, 수정 모달, 퇴직처리 모달
- **사원수정**: 모달 기반 인라인 수정
- **퇴직처리**: 퇴직일자 선택 → 상태코드 변경 (30)

### 3. 인사기본정보 (7개 탭 CRUD)
사원 선택 후 7개 카테고리별 탭으로 관리:
| 탭 | 테이블 | 기능 |
|----|--------|------|
| 기본정보 | Employee | 조회 |
| 가족사항 | THRM305 | 추가/삭제 (Table + Modal) |
| 연락처 | THRM310 | 추가/삭제 (Table + Modal) |
| 병역사항 | THRM315 | 단건 조회/수정 (Form) |
| 학력사항 | THRM320 | 추가/삭제 (Table + Modal) |
| 자격증 | THRM325 | 추가/삭제 (Table + Modal) |
| 경력사항 | THRM330 | 추가/삭제 (Table + Modal) |

- Ant Design `Tabs` + `destroyInactiveTabPane`으로 탭 전환 시 lazy 렌더링
- 단건 데이터 없을 시 204 No Content 응답 처리

### 4. 부서관리
- 부서목록 조회 (조직유형 Tag 색상 표시)
- 부서 등록/수정/비활성화
- 미사용 부서 포함/미포함 토글

### 5. 메뉴관리 시스템
- **DB 테이블**: TSYS309 (대메뉴) + TSYS303 (서브메뉴)
- **동적 사이드바**: 로그인 시 메뉴 트리 API 호출 → 사이드바 자동 구성
- **아이콘 매핑**: DB에 문자열로 저장 ("DashboardOutlined") → 컴포넌트 매핑
- **메뉴관리 페이지**: 좌측 대메뉴 리스트 + 우측 서브메뉴 테이블 CRUD
- 단일 서브메뉴만 있는 대메뉴는 직접 링크로 동작 (children 미생성)
- React Query 5분 캐시 (staleTime)

### 6. 공통코드 시스템 (TSYS005)
하드코딩된 코드값들을 DB 공통코드로 일원화 관리:

**구현 구조:**
- **Backend**: Entity + Repository + Service + Controller (`/api/codes`)
- **Frontend**: `codeApi.ts` + `useCommonCode.ts` hook
- **캐싱**: React Query `staleTime: 30분` (전체 코드 한 번에 조회 후 클라이언트 캐시)

**등록된 코드 그룹:**
| 그룹코드 | 설명 | 코드 예시 |
|----------|------|-----------|
| STATUS | 재직상태 | 10=재직, 20=휴직, 30=퇴직 |
| SEX_TYPE | 성별 | M=남성, F=여성 |
| ORG_TYPE | 조직유형 | T001=대표이사, T002=본부, T003=팀, T004=파트 |
| FAM_CD | 가족관계 | 01=모, 02=부, 03=자녀, 04=배우자, 05=형제, 99=기타 |
| CONT_TYPE | 연락처유형 | 01=휴대폰, 02=자택전화, 03=개인이메일 등 |
| ARMY_TRANSFER | 병역구분 | 01=필, 02=미필, 03=면제, 04=해당없음 |
| ARMY_CD | 군별 | 01=육군, 02=해군, 03=공군, 04=해병대 |
| EDU_STATUS | 졸업구분 | 10=졸업, 20=재학, 30=중퇴, 40=수료 |

**제공 유틸리티 (useCodeMap hook):**
- `getCodeName(grcodeCd, code)` → 코드명 반환
- `getCodeOptions(grcodeCd)` → Select 옵션 배열 반환
- `getCodeColor(grcodeCd, code)` → Tag 색상 반환 (NOTE1 컬럼)

**적용 완료 파일 (10개):**
EmployeeList, EmployeeDetail, EmployeeFormModal, EmployeeRegister, PersonnelBasicTab, DepartmentList, FamilyTab, ContactTab, MilitaryTab, EducationTab

### 7. 대시보드
- 전체 사원수, 재직/휴직/퇴직 현황
- 이번 달 입사자, 활성 부서 수 통계

## 주요 아키텍처

### 인증 흐름
```
로그인 → Access Token (메모리) + Refresh Token (HttpOnly 쿠키)
API 요청 → Axios 인터셉터에서 Authorization 헤더 자동 첨부
401 응답 → Refresh Token으로 자동 갱신 → 재요청
페이지 새로고침 → /api/auth/refresh로 토큰 복원
```

### 공통코드 캐싱 흐름
```
앱 초기화 → GET /api/codes (전체 코드 조회)
→ React Query 캐시 (staleTime: 30분)
→ useCodeMap() hook으로 getCodeName/getCodeOptions/getCodeColor 사용
코드 수정 시 → invalidateQueries로 캐시 갱신
```

### 메뉴 동적 로딩
```
로그인 → GET /api/menu/tree (메뉴 트리 조회)
→ MainLayout.tsx에서 사이드바 렌더링
→ DB 아이콘 문자열 → React 컴포넌트 매핑
→ React Query 캐시 (staleTime: 5분)
```

## DB 테이블 현황

### 사용 중인 테이블
| 테이블 | 설명 | PK |
|--------|------|----|
| THRM100 | 사원마스터 | ENTER_CD + SABUN |
| THRM305 | 가족사항 | ENTER_CD + SABUN + FAM_NM + FAM_CD + SDATE |
| THRM310 | 연락처 | ENTER_CD + SABUN + CONT_TYPE |
| THRM315 | 병역사항 | ENTER_CD + SABUN |
| THRM320 | 학력사항 | ENTER_CD + SABUN + SEQ |
| THRM325 | 자격증 | ENTER_CD + SABUN + SEQ |
| THRM330 | 경력사항 | ENTER_CD + SABUN + SEQ |
| TORG100 | 조직마스터 | ENTER_CD + ORG_CD + SDATE |
| TSYS309 | 대메뉴 | ENTER_CD + MENU_CD |
| TSYS303 | 서브메뉴(프로그램) | ENTER_CD + PRG_CD |
| TSYS005 | 공통코드(세부코드) | ENTER_CD + GRCODE_CD + CODE |
| TSYS_USERS | 사용자인증 | ENTER_CD + SABUN |

## DB 명세 참조

EHR 시스템 DB 명세는 상위 폴더에서 참조합니다.

```
../                          # 상위 폴더 (EHR_DB명세)
├── README.md                # DB 전체 현황
├── Table_summary.md         # 테이블 목록 (1,092개)
├── Procedure_summary.md     # 프로시저 목록 (371개)
├── Function_summary.md      # 함수 목록 (525개)
├── Package_summary.md       # 패키지 목록 (108개)
├── View_summary.md          # 뷰 목록 (41개)
├── docs/                    # 프로시저/함수 매뉴얼 (896개)
└── *_split/                 # 상세 DDL (분리된 파일)
```

### 도메인별 접두사
| 접두사 | 도메인 | 설명 |
|--------|--------|------|
| `THRM` | 인사관리 | Human Resource Management |
| `TCPN` | 급여 | Compensation |
| `TBEN` | 복리후생 | Benefits |
| `TTIM` | 근태관리 | Time Management |
| `TORG` | 조직관리 | Organization |
| `TSYS` | 시스템관리 | System |

## 향후 계획

- [ ] PostgreSQL 마이그레이션 (application.yml 설정 변경)
- [ ] 공통코드 관리 화면 (TSYS005 CRUD 페이지)
- [ ] 급여관리 모듈
- [ ] 근태관리 모듈
- [ ] 복리후생 모듈
- [ ] Redis 캐시 도입 (대시보드/통계 데이터)
- [ ] 코드 스플리팅 (번들 사이즈 최적화)

## License

MIT License
