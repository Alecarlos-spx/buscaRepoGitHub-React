import React, { useState }  from 'react';
import axios from 'axios';

import * as S from './styled';
import { useHistory } from 'react-router-dom';


export default function Home() {
    const history = useHistory();
    const  [ usuario, setUsuario] = useState('');
    const [ erro, setErro ] = useState(false);
    
    async function handlePesquisa() {

      let nome = await axios.get(`https://api.github.com/users/${usuario}`)
        .then(response => {
          const result = response.data.name;       
          return result;
        });
      


      await axios.get(`https://api.github.com/users/${usuario}/repos`)
        .then(response => {
          const repositories = response.data;
          const repositoriesName = [];
          repositories.map((repository) => {
            return repositoriesName.push({nome: repository.name, url: repository.html_url, login: repository.owner.login, nomeCompleto: nome});
          });
          localStorage.setItem('repositories', JSON.stringify(repositoriesName));
          setErro(false);
          history.push('/repositories');
        })
        .catch(err => {
          setErro(true);
        });
    }
  
    return (
      <S.HomeContainer>
          <h1>Busca de Repositórios GitHub</h1>
        <S.Content>
          <S.Input placeholder="Usuario GitHub" className="usuarioInput" value={usuario}  onChange={e => setUsuario(e.target.value)} />
          <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
        </S.Content>
        { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente!</S.ErrorMsg> : ''}
      </S.HomeContainer>
  
    );

 
  }


  