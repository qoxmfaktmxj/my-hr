import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employee/EmployeeList';
import EmployeeDetail from './pages/employee/EmployeeDetail';
import EmployeeRegister from './pages/employee/EmployeeRegister';
import PersonnelInfo from './pages/personnel/PersonnelInfo';
import DepartmentList from './pages/organization/DepartmentList';
import MenuManagement from './pages/system/MenuManagement';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={koKR}>
      <BrowserRouter>
        <Routes>
          {/* 로그인 페이지 (인증 불필요) */}
          <Route path="/login" element={<Login />} />

          {/* 인증 필요한 페이지들 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="employee" element={<EmployeeList />} />
            <Route path="employee/register" element={<EmployeeRegister />} />
            <Route path="employee/:sabun" element={<EmployeeDetail />} />
            <Route path="personnel" element={<PersonnelInfo />} />
            <Route path="personnel/:sabun" element={<PersonnelInfo />} />
            <Route path="organization/department" element={<DepartmentList />} />
            <Route path="system/menu" element={<MenuManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
