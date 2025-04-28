'use client'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { Button } from '@mui/material';

type item = {
  id: string;
  text: string;
  checked: boolean;
}
// funçâo para poder criar a lista e criar uma tarefa
export default function ListaTarefa() {
  const [lista, setlista] = useState<any>([])
  const [tarefa, settarefa] = useState<string>('');
  // inicialização da pag e restauração
  useEffect(() => {
    loadlista();
  }, [])
  // função para criar uma lista
  async function handleCreatlista(event: FormEvent) {
    event.preventDefault()
    const novalista: item = {
      id: uuid(),
      text: tarefa,
      checked: false,

    }
    await axios.post('http://localhost:3001/itens', novalista);
    loadlista();
    settarefa('');
  }
  // função fazer o recaregar a lista
  async function loadlista() {
    const response = await axios.get('http://localhost:3001/itens');
    setlista(response.data)
  }
  // função para concluir lista
  async function concluir(id: string) {
    await axios.patch(`http://localhost:3001/itens/${id}`, { "checked": true }
    )
    loadlista()
  }
  // função para deletar lista
  async function deletar(id: string) {
    await axios.delete(`http://localhost:3001/itens/${id}`)
    loadlista()
  }



  return (
    <div className="conteiner">
      <div className="content">
        <header className="main">
          <h1>ListaTarefa</h1>
        </header>
      </div>
      <div className='cont'>
        <form className='form-input'>
          <input
            type="texto"
            placeholder='informe a tarefa'
            value={tarefa}
            onChange={(e) => settarefa(e.target.value)} />
          <Button variant="contained" color="success" onClick={handleCreatlista}>
            listar  
          </Button>
        </form>
      </div>
      <div className='form-list'>
        {lista.map((item: any) => (
          <li key={item.id}>
            <button className='botao' onClick={() => concluir(item.id)}>concluir</button>
            <button className='botao' onClick={() => deletar(item.id)}>deletar</button>
            <span className={`${item.checked && `cocluidas`}`}>
              {item.text}
            </span>
          </li>
        ))}
      </div>
    </div >
  );
}