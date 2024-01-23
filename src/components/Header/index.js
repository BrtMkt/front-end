import './index.css'
import { Link } from "react-router-dom";
import { getCookies } from "../Cookies";
import Logo from '../../assests/img/bruta.svg'
import { useState } from 'react';

const nivel = getCookies('nivel')

export default function Header() {
    const [ actionGestao, setActionGestao ] = useState('none')
    const [ actionImportacao, setActionImportacao ] = useState('none')
    const [ actionFiltros, setActionFiltros ] = useState('none')
    const listMenu = {
        'Gestão': [
            'Perfil',
            nivel === 'admin' ? 'Gerenciamento' : ''
        ],
        'Importação': [
            'Setor',
            'Cargo',
            'Departamento',
            'Decisores',
            'Empresa',
            'Cnae',
        ],
        'Filtros': [
            'Setor',
            'Cargo',
            'Departamento',
            'Decisores',
            'Empresa',
            'Cnae',
        ]
    };

    function handleLogout() {
        return
    }

    function handleShow(name){
        if(actionGestao === 'none' && name === 'gestao'){
            setActionGestao('contents')
            setActionImportacao('none') 
            setActionFiltros('none')
        }else if(actionGestao === 'contents' && name === 'gestao'){
            setActionGestao('none') 
        }
        if(actionImportacao === 'none' && name === 'importacao'){
            setActionImportacao('contents')
            setActionGestao('none')
            setActionFiltros('none')
        }else if(actionImportacao === 'contents' && name === 'importacao'){
            setActionImportacao('none') 
        }
        if(actionFiltros === 'none' && name === 'filtros'){
            setActionFiltros('contents')
            setActionImportacao('none')
            setActionGestao('none')
        }else if(actionFiltros === 'contents' && name === 'filtros'){
            setActionFiltros('none') 
        }
    }

    return (
        <header className="header">
            <div className='logo'>
                <img src={Logo} alt='Logo' style={{ width: '10vw'}}/>
            </div>
            <nav className='nav'>
                <ul className="ul">
                    <ul style={{ padding: '14px 0px 0px 0px' }}>
                        <li className='li opcao' style={{ borderTop: 'solid 1px rgba(255, 255, 255, 0.318)', cursor: 'pointer' }} onClick={() => handleShow('gestao')}><p className='p'>Gestão</p></li>
                        <ul className="ul action" style={{ display: actionGestao }}>
                            {
                                listMenu['Gestão'].map((value) => (
                                    <li key={value} className="li opcao" style={{ background: '#e5464c'}}><Link to={`/${value}`} className='link'>{value}</Link></li>
                                ))
                            }
                        </ul>
                    </ul>
                    <ul style={{ padding: '0px 0px 0px 0px' }}>
                        <li className='li opcao' style={{ borderTop: 'solid 1px rgba(255, 255, 255, 0.318)', cursor: 'pointer'}} onClick={() => handleShow('importacao')}><p className='p'>Importação</p></li>
                        <ul className="ul action" style={{ display: actionImportacao}}>
                            {
                                listMenu['Importação'].map((value) => (
                                    <li key={value} className="li opcao" style={{ background: '#e5464c'}}><Link to={`/importacao/${value}`} className='link'>{value}</Link></li>
                                ))
                            }
                        </ul>
                    </ul>
                    <ul style={{ padding: '0px 0px 14px 0px' }}>
                        <li className='li opcao' style={{ borderTop: 'solid 1px rgba(255, 255, 255, 0.318)', cursor: 'pointer'}} onClick={() => handleShow('filtros')}><p className='p'>Registros</p></li>
                        <ul className="ul action" style={{ display: actionFiltros}}>
                            {
                                listMenu['Filtros'].map((value) => (
                                    <li key={value} className="li opcao" style={{ background: '#e5464c'}}><Link to={`/filtro/${value}`} className='link'>{value}</Link></li>
                                ))
                            }
                        </ul>
                    </ul>
                    <li style={{ marginLeft: '20px', color: 'white', fontWeight: '700'}} onClick={handleLogout}>Sair</li>        
                </ul>
            </nav>
        </header>
    )
}