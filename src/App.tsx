import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import { HeaderLayout } from './features/header/header';
import { FooterLayout } from './features/footer/footer';
import { SignIn } from './features/sign-in/sign-in';
import { SignUp } from './features/sign-up/sign-up';
import './translations/i18n';
import './App.less';
const { Content } = Layout;
function App() {
  const { t } = useTranslation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderLayout></HeaderLayout>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <SignIn></SignIn>
          <SignUp></SignUp>
          {t('welcome')}
        </div>
      </Content>
      <FooterLayout></FooterLayout>
    </Layout>
  );
}

export default App;
