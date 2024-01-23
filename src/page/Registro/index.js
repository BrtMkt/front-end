import { useParams } from "react-router-dom";
import Format from "../../components/Format";
import { useEffect, useState } from "react";
import axios from 'axios';
import BasicAlerts from "../../components/Alert";
import { utils, write, writeFile } from 'xlsx';
import "./index.css";


export default function Filtro() {
    const [values, setValues] = useState([])
    const [name, setName] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [filterShow, setFilterShow] = useState('none')
    const [alert, setAlert] = useState(false)
    const [messageAndStatus, setMessageAndStatus] = useState({})
    const [newList, setNewList] = useState({})
    const { filtro } = useParams();
    const [exportArchive, setExportArchive] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                if (filtro) {
                    const { data } = await axios.get(`${process.env.REACT_APP_URL_BASE}/${filtro}`)
                    setValues(data)
                }
            } catch (e) {
                console.log(e)
            }
        }())
    }, [filtro, alert])

    async function handleDelete(id) {
        try {
            await axios.delete(`${process.env.REACT_APP_URL_BASE}/${filtro}/${id}`)
            setAlert(true)
            setMessageAndStatus({ message: 'Excluido com sucesso', status: 'success' })
        } catch (error) {
            console.log(error)
            setAlert(true)
            setMessageAndStatus({ message: 'Error tente novamente mais tarde', status: 'error' })
        }
    }

    let titleList = {
        'Setor': [
            "nome",
            "Ação"
        ],
        'Cargo': [
            "nome",
            "Ação"
        ],
        'Departamento': [
            "nome",
            "Ação"
        ],
        'Cnae': [
            "nome",
            "codigo",
            "Ação",
        ],
        'Decisores': [
            'nome',
            'email',
            'codigoArea',
            'telefone',
            'linkedin',
            'departamento',
            'cargo',
            'empresa',
            'observação',
            'Ações'
        ],
        'Empresa': [
            'nomeEmpresa',
            'nomeFantasia',
            'documento',
            'codigoArea',
            'telefone',
            'site',
            'cnae',
            'setor',
            'filiais',
            'Ações'
        ],
    };

    function handleValue() {
        return values.map((value) => {
            const valueList = {
                'Setor': (
                    <tr key={value.id}>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '480px', textAlign: 'start' }}>{value['nome']}</p></td>
                        <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(value.id)}>
                            Deletar
                        </td>
                    </tr>
                ),
                'Cargo': (
                    <tr key={value.id}>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '480px', textAlign: 'start' }}>{value['nome']}</p></td>
                        <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(value.id)}>
                            Deletar
                        </td>
                    </tr>
                ),
                'Departamento': (
                    <tr key={value.id}>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '480px', textAlign: 'start' }}>{value['nome']}</p></td>
                        <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(value.id)}>
                            Deletar
                        </td>
                    </tr>
                ),
                'Cnae': (
                    <tr key={value.id}>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '480px', textAlign: 'start' }}>{value['nome']}</p></td>
                        <td className='td'>{value['codigo']}</td>
                        <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(value.id)}>
                            Deletar
                        </td>
                    </tr>
                ),
                'Decisores': [
                    <tr key={value.id}>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '100px', textAlign: 'start' }}>{value['nome']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['email']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['codigoArea']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['telefone']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}><a style={{ textDecoration: 'none' }} href={value['linkedin']}>Link</a></p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['departamento']?.nome}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['cargo']?.nome}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['empresa']?.nomeEmpresa}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['observacao']}</p></td>
                        <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(value.id)}>
                            Deletar
                        </td>
                    </tr>
                ],
                'Empresa': [
                    <tr key={value.id}>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '100px', textAlign: 'start' }}>{value['nomeEmpresa']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '100px', textAlign: 'start' }}>{value['nomeFantasia']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['documento']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['codigoArea']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['telefone']}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}><a style={{ textDecoration: 'none' }} href={value['site']}>Link</a></p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['cnae']?.nome}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['setor']?.nome}</p></td>
                        <td className='td'><p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0, width: '50px', textAlign: 'start' }}>{value['filiais']}</p></td>
                        <td className='td' style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(value.id)}>
                            Deletar
                        </td>
                    </tr>
                ],
            };

            return valueList[filtro]
        })
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setAlert(false);
        }, 2000);

        return () => clearTimeout(id);
    }, [alert]);

    async function handleNewList() {
        try {
            if (filtro) {
                if (newList[name] === '' || newList[nameInput] === '') {
                    delete newList[name]
                    delete newList[nameInput]
                }
                const { data } = await axios.post(`${process.env.REACT_APP_URL_BASE}/${filtro}/filtro`, newList)
                setValues(data)
                setExportArchive(true)
                setFilterShow('none')
                setNewList({})
            }
        } catch (e) {
            console.log(e)
        }
    }

    function handleExport() {
        const ws = utils.json_to_sheet(values)
        const wb = utils.book_new();

        utils.book_append_sheet(wb, ws, "sheet")

        write(wb, { bookType: 'xlsx', type: 'buffer' })
        write(wb, { bookType: 'xlsx', type: 'binary' })

        writeFile(wb, "sheet.xlsx")
    }

    return (
        <Format>
            <h5 style={{ borderBottom: 'solid 1px #0000002e', color: '#0000008c', padding: '10px' }}>Filtros {'>'} {filtro}</h5>
            {
                alert && BasicAlerts(messageAndStatus.message, messageAndStatus.status)
            }
            <div className='editarPerfil'>
                <button className="button" onClick={() => setFilterShow('flex')} style={{ padding: '1%', margin: 0, boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: 'pointer', display: filterShow === 'none' ? 'inline-block' : 'none' }}>Filter</button>
                {exportArchive && <span style={{ marginRight: '5%', display:  filterShow === 'none' ? 'inline-block' : 'none' }} onClick={() => handleExport()}>Exportar</span>}
            </div>
            <div className="filter" style={{ display: filterShow }}>
                <div>
                    <select onChange={(e) => setName(e.target.value)}>
                        <option disabled selected="selected">Escolha sua busca</option>
                        {
                            titleList[filtro].map((title) => (
                                title !== 'Ação' && title !== 'observação' &&
                                <option key={title} value={title}>{title}</option>
                            ))
                        }
                    </select>
                    <input type="text" value={newList[name]} name={name} onChange={(e) => setNewList({ ...newList, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <select onChange={(e) => setNameInput(e.target.value)}>
                        <option disabled selected="selected">Escolha sua busca</option>
                        {
                            titleList[filtro].map((title) => (
                                title !== 'Ação' &&
                                <option key={title} value={title}>{title}</option>
                            ))
                        }
                    </select>
                    <input type="text" value={newList[nameInput]} name={nameInput} onChange={(e) => setNewList({ ...newList, [e.target.name]: e.target.value })} />
                </div>
                <button className="button" onClick={() => handleNewList()} style={{ width: '80px', padding: '1%', margin: 0, boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', cursor: 'pointer', display: filterShow === 'none' ? 'none' : 'inline-block' }}>Buscar</button>
                <button className="button" onClick={() => setFilterShow('none')} style={{ width: '80px', padding: '1%', margin: 0, boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', background: 'red', cursor: 'pointer', display: filterShow === 'none' ? 'none' : 'inline-block' }}>Cancelar</button>
            </div>
            <div style={{ paddingTop: '1%' }} className='table'>
                <table className='table-true'>
                    <thead className="headerTable">
                        <tr>
                            {
                                titleList[filtro].map((title) => (
                                    <th key={title} style={{ textAlign: 'start', textTransform: 'capitalize' }}>{title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            handleValue()
                        }
                    </tbody>
                </table>
            </div>
        </Format>
    )
}