import { useEffect, useState } from 'react';
import Format from '../../components/Format';
import BasicAlerts from '../../components/Alert';
import './index.css'
import { getCookies } from '../../components/Cookies';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Perfil() {
    const cookie = getCookies('token')
    const userId = getCookies('id')
    const [values, setValues] = useState({})
    const [messageAndStatus, setMessageAndStatus] = useState({})
    const [alert, setAlert] = useState(false)
    const [activeForm, setActiveForm] = useState(true)
    const [alterPass, setAlterPass] = useState('none')
    const [statusButton, setStatusButton] = useState('inline-block')
    const { rota } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (rota === "AddUser") {
            setActiveForm(false)
            setAlterPass('flex')
            setStatusButton('none')
        }
    }, [rota])

    function handleEditPerfil() {
        if (activeForm === true) {
            setActiveForm(false)
        } else {
            setActiveForm(true)
        }
    }

    async function handleSaveUpdate() {
        try {
            if (rota === "AddUser") {
                await axios.post(`${process.env.REACT_APP_ACTION_USER}`, values)
                setAlert(true)
                setMessageAndStatus({ message: 'Cadastro adicionado com sucesso', status: 'success' })
                navigate("/gerenciamento");
                window.location.reload(true)
            } else if (rota === "Perfil") {
                await axios.patch(`${process.env.REACT_APP_ACTION_USER}/${userId}`, values)
                setAlert(true)
                setMessageAndStatus({ message: 'Perfil atualizado com sucesso', status: 'success' })
            }
        } catch (error) {
            setAlert(true)
            setMessageAndStatus({ message: 'Error tente novamente mais tarde', status: 'error' })
        }
        return
    }


    function handleAlterSenha() {
        if (alterPass === 'none' && statusButton === 'inline-block') {
            setAlterPass('flex')
            setStatusButton('none')
        }
    }

    function handleCancelamento() {
        if (alterPass === 'flex' | statusButton === 'none' | activeForm === false) {
            setAlterPass('none')
            setStatusButton('inline-block')
            setActiveForm(true)
            setAlert(true)
            setMessageAndStatus({ message: 'Operação cancelada com sucesso', status: 'success' })
        }
    }

    useEffect(() => {
        if (rota === 'Perfil') {
            (async function () {
                if (cookie) {
                    const { data } = await axios.get(`${process.env.REACT_APP_ACTION_USER}/${userId}`)
                    setValues({ nome: data.nome, email: data.email, nivel: data.nivel })
                }
            }());
        }
    }, [cookie, alert, rota, userId])

    useEffect(() => {
        const id = setTimeout(() => {
            setAlert(false);
        }, 2000);

        return () => clearTimeout(id);
    }, [alert]);

    return (
        <Format>
            <h5 style={{ borderBottom: 'solid 1px #0000002e', color: '#0000008c', padding: '10px' }}>Gestão {'>'} Perfil</h5>
            <div className="tela-Perfil">
                <div className='subTelaForm'>
                    <div className='editarPerfil'>
                        <button className="button" style={{ width: '20%', display: statusButton, cursor: 'pointer' }} onClick={() => handleEditPerfil()}>Editar Perfil</button>
                    </div>
                    {
                        alert && BasicAlerts(messageAndStatus.message, messageAndStatus.status)
                    }
                    <div className="form">
                        <div className="label-input">
                            <labe className="label">Nome</labe>
                            <input disabled={activeForm} className="input" type="text" name="nome" value={values['nome']} onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="label-input">
                            <labe className="label">E-mail</labe>
                            <input disabled={activeForm} className="input" type="text" name="email" value={values['email']} onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                        </div>
                        <button className="button" style={{ width: '20%', display: statusButton, background: activeForm ? 'gray' : '' }} onClick={() => handleAlterSenha()} disabled={activeForm}>Alterar Senha</button>
                        <div className="label-input" style={{ display: alterPass }}>
                            <labe className="label">Senha</labe>
                            <input className="input" type="password" name="senha" value={values['senha']} onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="label-input">
                            <labe className="label">Nivel</labe>
                            <select disabled={activeForm} className="input" name='nivel' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                                {values.nivel ? <option value={values.nivel}>{values.nivel}</option> : <option value="operador">operador</option>}
                                <option value={values.nivel === 'admin' ? 'operador' : 'admin'}>{values.nivel === 'admin' ? 'operador' : 'admin'}</option>
                            </select>
                        </div>
                    </div>
                    <div className='buttonFooter'>
                        <button className="button" onClick={() => handleSaveUpdate()} style={{ display: activeForm ? 'none' : 'inline-block' }}>Salvar</button>
                        {!rota === "AddUser" && <button className="button" onClick={() => handleCancelamento()} style={{ display: activeForm ? 'none' : 'inline-block', background: 'red' }}>Cancelar</button>}
                    </div>
                </div>
            </div>
        </Format>
    )
}