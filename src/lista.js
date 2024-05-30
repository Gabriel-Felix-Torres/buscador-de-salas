import React, { useState, useEffect } from "react";
import { FormContext } from "./context/FormContext";
import { useContext } from "react";
import axios from "axios";

const Lista = () => {
  const { dados, setDados } = useContext(FormContext);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axios.get(`${apiUrl}
        
        
        `); 

        setSalas(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (!loading) {
    return (
      <div>
        <div>
          <p>
            Olá {dados.nome}, suas disciplinas do curso {dados.curso} do{" "}
            {dados.semestre}° Semestre:
          </p>
          {salas.map((sala, index) => {
            return (
              <div key={index} style= {{border: '1px dashed black'}}>
                <p>Disciplina: {sala.disciplina}</p>
                <p>Professor: {sala.professor} </p>
                <p>Sala: {sala.sala}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Carregando</div>;
  }
};

export default Lista;
