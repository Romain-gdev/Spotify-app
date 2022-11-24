import '../style/App.css';

import { Outlet, Link} from 'react-router-dom';
import {Menu, Layout} from 'antd';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

/**
 * Représente la page d'acceuil de l'application
 * Utilise les Layouts de Antd + react-query pour les appels API
 * @returns la page d'accueil
 */
function PageAccueil(){

  const client = new QueryClient()
  const { Header, Footer, Sider, Content } = Layout;


return (
    <QueryClientProvider client={client} >
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
      <Footer>
        Accepting <a href="https://developer.spotify.com/terms/"><u> Spotify Developer Terms of Service.</u> </a>
      </Footer>
    </Layout>
    </Layout>
    </QueryClientProvider>
)
}

export default PageAccueil;