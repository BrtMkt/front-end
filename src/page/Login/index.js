import "./index.css";
import Logo from '../../assests/img/bruta.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BasicAlerts from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { setCookies } from "../../components/Cookies";

export default function PageLogin() {
    const [values, setValues] = useState({})
    const [messageAndStatus, setMessageAndStatus] = useState({})
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const id = setTimeout(() => {
            setAlert(false);
        }, 2000);

        return () => clearTimeout(id);
    }, [alert]);

    async function handleLogin() {
        try{
            const { data } = await axios.post(`${process.env.REACT_APP_URL_LOGIN}`, values)

            if (data && data.access_token) {
                setCookies('token', data.access_token);
                setCookies('email', `${values['email']}`);
                setCookies('nivel', data.nivel);
                setCookies('id', data.id);
                setAlert(true)
                setMessageAndStatus({ message: 'Logado com sucesso', status: 'success' })
                navigate("/home");
                window.location.reload(true)
            } else {
                setAlert(true)
                setMessageAndStatus({ message: 'Tente novamente email ou senha errados', status: 'error' })
            }
        }catch(e){
            console.log(e)
            setAlert(true)
            setMessageAndStatus({message: 'Tente novamente email ou senha errado', status: 'error'})
        }
    }

    return (
        <div className="body">
            <div className="tela">
                <img src={Logo} alt="Logo Bruta" className="img" />
                {
                    alert && BasicAlerts(messageAndStatus.message, messageAndStatus.status)
                }
                <div className="form">
                    <div className="label-input">
                        <labe className="label">E-mail</labe>
                        <input className="input" type="text" name="email" value={values['email']} onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="label-input">
                        <labe className="label">Senha</labe>
                        <input className="input" type="password" name="senha" value={values['senha']} onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                    </div>
                </div>
                <button className="button" onClick={() => handleLogin()}>Entrar</button>
            </div>
        </div>
    )
}