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
import { Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/welcome/welcome';
import { Protected } from './Protected';
const { Content } = Layout;
function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderLayout />
      <Content className="site-layout" style={{ padding: '0 20px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/registration" element={<SignUp />} />
            <Route path="/main" element={<Protected page={<Main />} />} />
            <Route path="/board/:id" element={<Protected page={<Board />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
}

export default App;
