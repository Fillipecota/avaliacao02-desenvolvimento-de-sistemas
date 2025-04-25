'use client'
import axios from 'axios'
import { useEffect, useState } from 'react';
import ButtonCustom from '@/components/ButtonCustom';
import { TextField } from '@mui/material';
import { v4 as uuid } from 'uuid';


type post = {
  id: string;
  text: string;
  checked: boolean;
}



export default function MarketList() {
  const [lista, setlista] = useState<any[]>([]);
  const [content, setContent] = useState<string>('');
  useEffect(() => {
    loadItens();
  }, [])


  async function loadItens() {
    const response = await axios.get("http://localhost:3001/posts");
 
    setlista(response.data)
    // BUSCA AS INFORMAÇÕES NA API FAKE
    // SALVA O VALOR NO ESTADO
  }

  async function handleAddItem() {

    const post = {
      id: uuid,
      text:String,
      checked: true
    }
    await axios.post('http://localhost:3001/lista', lista);
    await loadItens();
    setContent('');
    // CRIAR O OBJETO DO ITEM
    // CHAMA A API PARA ADICIONAR O ITEM
    // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
  }


  async function handleRemoveItem(id: string) {
    
    // FILTRA O ESTADO E REMOVE O ITEM
    // CHAMA A API PARA REMOVER O ITEM
    // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
  }

  async function handleUpdateItem(id: string) {
    // CRIA O OBJETO DO ITEM
      // CHAMA A API PARA ATUALIZAR O ITEM

      // CARREGA OS PRODUTOS NOVAMENTE // loadItens();
      await loadItens();
  }

  return (

    <div className="carregarTarefas()">
      <div className="container">
        <h1>ToDo List</h1>
        <div className="grupo-input">
          <TextField className='content' id="outlined-basic" label="lista" variant="outlined" />
          < ButtonCustom />
        </div>
        <ul>
      
      </ul>
      </div>
    </div>
  );
}

