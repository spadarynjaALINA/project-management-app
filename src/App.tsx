import { Layout } from 'antd';
import { HeaderLayout } from './features/header/header';
import { FooterLayout } from './features/footer/footer';
import { SignIn } from './features/sign-in/sign-in';
import { SignUp } from './features/sign-up/sign-up';
import './translations/i18n';
import './App.less';
import { Main } from './pages/main/main';
import { Board } from './pages/board/board';
import { NotFound } from './pages/not-found/not-found';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Welcome } from './pages/welcome/welcome';
import { PrivateRoute } from './PrivateRoute';
import { Profile } from './pages/profile/profile';
import { Start } from './pages/start/start';
const { Content } = Layout;
function App() {
  const location = useLocation();
  const address = location.pathname.slice(9);
  const boards = location.pathname.slice(0, 7);
  console.log(boards, 'boards', location.pathname, 'pathname', address, 'address');
  const style =
    address === '' ? { padding: '0 ', marginTop: 64 } : { padding: '0 20px', marginTop: 64 };
  const bgStyle =
    address === '' ? { padding: '0', minHeight: '75vh' } : { padding: '24px', minHeight: '75vh' };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {(location.pathname === '/' ||
        location.pathname === '/signin' ||
        location.pathname === '/signup' ||
        location.pathname === '/profile' ||
        boards === '/boards') && <HeaderLayout />}

      <Content className="site-layout" style={style}>
        <div className="site-layout-background" style={bgStyle}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<PrivateRoute page={<Profile />} />} />
            <Route path="/boards" element={<PrivateRoute page={<Main />} />} />
            <Route path="/boards/:id" element={<PrivateRoute page={<Board />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Content>
      {(location.pathname === '/' ||
        location.pathname === '/signin' ||
        location.pathname === '/signup' ||
        location.pathname === '/profile' ||
        boards === '/boards') && <FooterLayout />}
    </Layout>
  );
}

export default App;
