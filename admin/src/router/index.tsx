import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/views/layout'
import Template from '@/views/layout/template'
import NotFound from '@/views/404'
import Dashboard from '@/views/dashboard'
import Colors from '@/views/dashboard/colors'
import Login from '@/views/auth/login'
import Register from '@/views/auth/register'
import Forbidden from '@/views/403'
import Account from '@/views/setting/account'
import Role from '@/views/setting/role'
import RolePermission from '@/views/setting/role/permission'
import Log from '@/views/setting/log'
import { CheckLogin, CheckPermission } from './guard'

const router = () => (
  <BrowserRouter basename="/admin">
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<CheckLogin component={Layout} />}>
        <Route path="" element={<CheckPermission component={Template} />}>
          <Route path="" element={<Navigate to="dashboard" replace />}></Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="colors" element={<Colors />} />
          <Route path="setting">
            <Route path="" element={<Navigate to="account" replace />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="role" element={<Role />}></Route>
            <Route path="role-permission/:id" element={<RolePermission />}></Route>
            <Route path="log" element={<Log />}></Route>
          </Route>
        </Route>
        <Route path="403" element={<Forbidden />} />
      </Route>
      <Route path="/login" element={<CheckLogin component={Login} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
)

export default router
