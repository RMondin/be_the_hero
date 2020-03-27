import React, { useState } from 'react';
import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [titulo, setTiulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();


    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            titulo,
            descricao,
            valor,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');
        }
        catch (err) {
            alert("Erro ao cadastrar novo incidente, tente novamente.");
        }



    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link class="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                    Voltar para Home
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e => setTiulo(e.target.value)} />
                    <textarea placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} />
                    <input placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}