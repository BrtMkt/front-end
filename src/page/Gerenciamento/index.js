import { useEffect, useState } from 'react'
import Format from '../../components/Format'
import { getCookies } from '../../components/Cookies';
import axios from 'axios';
import "./index.css"
import BasicAlerts from '../../components/Alert';
import Table from '../../components/Table';
import { Link } from 'react-router-dom';

export default function Gerenciamento() {
    const cookie = getCookies('token')
    const userId = getCookies('id')
    const [value, setValue] = useState([])
    const [nivel, setNivel] = useState({})
    const [alert, setAlert] = useState(false)
    const [messageAndStatus, setMessageAndStatus] = useState({})

    async function handleDelete(id) {
        try {
            await axios.delete(`${process.env.REACT_APP_ACTION_USER}/${id}`)
            setAlert(true)
            setMessageAndStatus({ message: 'Excluido com sucesso', status: 'success' })
        } catch (error) {
            console.log(error)
            setAlert(true)
            setMessageAndStatus({ message: 'Error tente novamente mais tarde', status: 'error' })
        }
    }

    useEffect(() => {
        (async function () {
            if (nivel && nivel.nivel) {
                try {
                    await axios.patch(`${process.env.REACT_APP_ACTION_USER}/${nivel.id}`, {
                        nivel: nivel['nivel']
                    })
                    setValue(value.filter((user) => user.id !== nivel.id))
                    setAlert(true)
                    setMessageAndStatus({ message: 'Atualizado com sucesso', status: 'success' })
                } catch (error) {
                    console.log(error)
                    setAlert(true)
                    setMessageAndStatus({ message: 'Error tente novamente mais tarde', status: 'error' })
                }
            }
        }())
    }, [nivel, value])

    useEffect(() => {
        (async function () {
            if (cookie) {
                const { data } = await axios.get(process.env.REACT_APP_ACTION_USER)
                setValue(data)
            }
        }());
    }, [cookie, alert])

    useEffect(() => {
        const id = setTimeout(() => {
            setAlert(false);
        }, 2000);

        return () => clearTimeout(id);
    }, [alert]);

    return (
        <Format>
            <div>
                <h5 style={{ borderBottom: 'solid 1px #0000002e', color: '#0000008c', padding: '10px' }}>Gestão {'>'} Gerenciamento</h5>
                {
                    alert && BasicAlerts(messageAndStatus.message, messageAndStatus.status)
                }
                <div className='editarPerfil'>
                    <button className="button" style={{ padding: '1%', margin: 0, boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: 'pointer' }}><Link to='/AddUser' style={{ color: 'white', textDecoration: 'none'}}>Adicionar Usuario</Link> </button>
                </div>
                <Table
                    th={['nome', 'email', 'nivel', 'ação']}
                >
                    <tbody className="bodyTable">
                        {value.map((user) => (
                            <tr key={user.id}>
                                <td className='td' style={{ display: 'flex', justifyContent: 'center' }}>{user.nome} {userId === user.id ? <div style={{ fontStyle: 'italic' }}>(sua conta)</div> : ''}</td>
                                <td className='td'>{user.email}</td>
                                <td className='td'>
                                    <select name='nivel' onChange={(e) => setNivel({ [e.target.name]: e.target.value, id: user.id })}>
                                        <option value={user.nivel}>{user.nivel}</option>
                                        <option value={user.nivel === 'admin' ? 'operador' : 'admin'}>{user.nivel === 'admin' ? 'operador' : 'admin'}</option>
                                    </select>
                                </td>
                                <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(user.id)}>
                                    Deletar
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </Format >
    )
}