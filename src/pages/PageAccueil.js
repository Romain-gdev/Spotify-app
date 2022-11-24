import '../style/App.css';

import { Outlet, Link} from 'react-router-dom';
import {Menu, Layout} from 'antd';

/**
 * Représente la page d'acceuil de l'application
 * Utilise les Layouts de Antd
 * @returns la page d'accueil
 */
function PageAccueil(){


  const { Header, Footer, Sider, Content } = Layout;


return (

  <Layout >
    <Sider id="menu" className="h-full">
      <Menu className="h-full bg-[#F0F0F5]" >
        <Menu.Item><Link to="/">Accueil</Link></Menu.Item>
        <Menu.Item><Link to="/search">Albums</Link></Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header className="rounded-full bg-[#292929] text-center text-[#81b71a] font-bold">API SPOTIFY</Header>
      <Content><Outlet/></Content>
      <Footer></Footer>
    </Layout>
    </Layout>

)
}

export default PageAccueil;