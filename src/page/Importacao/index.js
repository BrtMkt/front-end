import { useState } from "react";
import Format from "../../components/Format";
import "./index.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import BasicAlerts from "../../components/Alert";

export default function Importacao() {
    const [alert, setAlert] = useState(false);
    const [messageAndStatus, setMessageAndStatus] = useState({});
    const [value, setValue] = useState({});
    const [preview, setPreview] = useState('');
    const { filtro } = useParams();

    async function handleSaveUpdate() {
        try {
            var formData = new FormData();
        
            formData.append('arquivo', value.arquivo);
            formData.append('fileName', value.arquivo.name);
            formData.append('nomeService', value.nome);

            await axios.post(`${process.env.REACT_APP_URL_BASE}/import-or-export`, formData)
            setAlert(true)
            setMessageAndStatus({message: 'Planilha enviada com sucesso', status: 'success'})
        } catch (e) {
            console.log(e)
            setAlert(true)
            setMessageAndStatus({message: 'Tente novamente erro ao enviar planilha', status: 'error'})
        }
    }

    function handleValueAndViewDoc(e) {        
        setValue({ ...value, arquivo: e.target.files[0], nome: filtro.toLowerCase() })
        setPreview(e.target.files[0].name)
    }

    function template() {
        return (
            <div className="form-import">
                <div className="label-input">
                    <labe className="label" >Importação de</labe>
                    <input className="input" type="text" name="nome" value={filtro} disabled />
                </div>
                <div>
                    <label for="arquivo" className="label-import">
                        <span>Insera seu arquivo clicando ou arraste</span>
                        <input type="file" name="arquivo" id="arquivo" onChange={(e) => handleValueAndViewDoc(e)} style={{ display: "none" }}></input>
                    </label>
                    {preview && <div id="arquivo">{preview}</div>}
                </div>
                <button className="button" onClick={() => handleSaveUpdate()}>Salvar</button>
            </div>
        )
    }

    return (
        <Format>
            <h5 style={{ borderBottom: 'solid 1px #0000002e', color: '#0000008c', padding: '10px' }}>Importacao {'>'} {filtro}</h5>
            {
                alert && BasicAlerts(messageAndStatus.message, messageAndStatus.status)
            }
            {
                template()
            }
        </Format>
    )
}