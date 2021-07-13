import React, { useEffect, useState } from 'react';

import * as S from './styled';

import { useHistory } from 'react-router-dom';


function Repositories() {
    const history = useHistory();

    const [ repositories, setRepositories ] = useState([]);


    useEffect(() => {
        let repositoriesName = localStorage.getItem('repositories');
        if(repositoriesName != null){
            repositoriesName = JSON.parse(repositoriesName);
            setRepositories(repositoriesName);

            localStorage.clear();
        }else{
            history.push('/');
        }
    }, []);

    return (
        <S.Container>
            <S.Title>  Repositorios de { repositories.map((repository, index) => {

                if(index === 0){
                    return (
                        <span key={index}>{repository.nomeCompleto}</span>
                    )
                }
                })}
                  
            </S.Title>
            <S.List>
                { repositories.map((repository, index) => {
                    return (
                        <S.ListItem key={index}>{repository.nome} - <S.ListUrls href={repository.url} target="_blank">{repository.url}</S.ListUrls> </S.ListItem>
                    )
                })}
            </S.List>
            <S.LinkHome to="/"  >Voltar</S.LinkHome>
        </S.Container>
    );
}

export default Repositories;