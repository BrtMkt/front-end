import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import PageLogin from "./page/Login";
import { getCookies } from "./components/Cookies/index";
import Logo from "./assests/img/bruta.svg"
import Home from "./page/Home";
import Gerenciamento from "./page/Gerenciamento";
import Perfil from "./page/Perfil";
import Registro from "./page/Registro";
import Importacao from "./page/Importacao";

function Router() {
  const cookie = getCookies('token')
  const listPage = [
    {nome: 'home', page: <Home />},
    {nome:'gerenciamento', page:<Gerenciamento />},
    {nome:':rota', page:<Perfil />},
    {nome:'filtro/:filtro', page:<Registro />},
    {nome:'/importacao/:filtro', page:<Importacao />},
  ]
  
  return (
    <div className="App">
      <Routes>
        {/* Componente da tela inicial */}
        <Route index element={<PageLogin/>} />
        {
          
          cookie ?
          listPage.map((value) => (
            <Route path={`${value.nome}`} element={value.page} key={value.nome}/>
          ))
          :
          <Route path="*" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column'}}><img src={Logo} alt="Logo" style={{ width: '30vh', marginBottom: '16px'}}></img><p>Ops...Usuario não identificado ou pagina não encontrada</p><Link to="/">Voltar ao Login</Link></div>} />
        }
      </Routes>
    </div>
  );
}

export default Router;
