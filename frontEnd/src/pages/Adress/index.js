import React, { useState, useEffect } from 'react';
import InputMask from "react-input-mask";
import './style.css'
import { FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import Logo from '../../assets/BuscaCep.png';
export default function Adress() {
    const [cep, setCep] = useState('')
    const [adress, setAdress] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        api.apiAdress.get(`/adress/index?page=${currentPage}`).then(response => {
            setAdress(response.data.sort((a, b) => a - b))
        })
    }, [currentPage])

    async function saveAdress(adress) {
        try {
            let adressSave = {
                district: adress.bairro,
                cep: Number(adress.cep.replace(/[^0-9]/g, '')),
                municipality: adress.localidade,
                public_place: adress.logradouro
            }
            await api.apiAdress.post('/adress/create', adressSave)
            setCurrentPage(0)
        } catch (err) {
            console.log(err)
        }
    }
    async function deleteAdress(id) {
        try {

            await api.apiAdress.delete(`/adress/delete/${id}`)
            setAdress(adress.filter(adress => adress.id !== id));
            if (adress.length === 1) setCurrentPage(1)
        } catch (err) {
            console.log(err)
        }
    }
    async function buscaCep(event) {
        event.preventDefault();
        try {
            const formatCep = String(cep.replace(/[^0-9]/g, ''))
            let adressAPI = await api.viaCep.get(`${formatCep}/json/`)
            await saveAdress(adressAPI.data)
            setAdress([...adress, ...adressAPI]);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="adress-conteiner">
            <header>
                <img src={Logo} alt="logo" />
                <form onSubmit={buscaCep} className="form">
                    <label>CEP:</label>
                    <InputMask mask="99999-999" placeholder="XXXXX-XXX" value={cep}
                        onChange={e => setCep(e.target.value)}
                        type="text"
                    />
                    <button className="button" type='submit'>Pesquisar</button>
                </form>
            </header>
            <h1>Endereços Pesquisados</h1>
            <ul>
                {
                    adress?.map((adress) => (
                        <li key={adress.id}>
                            <strong>Cep:</strong>
                            <p>{adress.cep}</p>

                            <strong>Bairro:</strong>
                            <p>{adress.district}</p>

                            <strong>Municipio:</strong>
                            <p>{adress.municipality}</p>

                            <strong>Rua:</strong>
                            <p>{adress.public_place}</p>

                            <button onClick={() => deleteAdress(adress.id)} type="button">
                                <FiTrash2 size={18} color="#a8a8b3" />
                            </button>
                        </li>
                    )
                    )}
            </ul>
            <footer>
                <button className="buttonNextPage" onClick={() => setCurrentPage(page => currentPage === 1 ? 1 : page - 1)}><FiArrowLeft size={20} /></button>
                <p>{currentPage}</p>
                <button className="buttonNextPage" onClick={() => setCurrentPage(page => adress.length === 0 ? 1 : page + 1)}><FiArrowRight size={20} /></button>
            </footer>
        </div>
    );
}