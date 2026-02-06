# my-hr

> HRIS (Human Resource Information System) - 인사관리시스템

## 🎯 프로젝트 개요

AI 기반으로 개발되는 인사관리시스템입니다.

## 🛠️ 기술 스택

### Frontend
- React 18
- TypeScript
- Ant Design (UI 라이브러리)
- React Query (상태관리)
- React Router (라우팅)

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- JPA / Hibernate
- Oracle Database

## 📁 프로젝트 구조

```
my-hr/
├── frontend/          # React 프론트엔드
├── backend/           # Spring Boot 백엔드
├── database/          # DB 스크립트, 마이그레이션
└── docs/              # 프로젝트 문서
```

## 🚀 시작하기

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./gradlew bootRun
```

## 📊 주요 기능 (예정)

- [ ] 사원 관리 (인사기록, 발령관리)
- [ ] 급여 관리 (급여계산, 연말정산)
- [ ] 근태 관리 (출퇴근, 휴가)
- [ ] 조직 관리 (부서, 직급)
- [ ] 복리후생 (경조금, 학자금)
- [ ] 교육 훈련

## 📚 DB 명세 참조

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

### AI 활용 검색 예시
```
"THRM100 테이블 구조 알려줘"
→ ../Table_summary.md에서 확인 → ../Table_split/ 폴더에서 상세 DDL

"급여계산 프로시저 찾아줘"
→ ../Procedure_summary.md에서 P_CPN 섹션 확인
```

## 📝 License

MIT License
