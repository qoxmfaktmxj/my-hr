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
    └── db-spec/       # EHR DB 명세 참조
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

## 📚 참고 문서

- [DB 명세서](./docs/db-spec/) - EHR 시스템 DB 구조 참조

## 📝 License

MIT License
