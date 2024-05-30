import React, { useState, useEffect } from "react";
import { FormContext } from "./context/FormContext";
import { useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


const Lista = () => {
  const { dados, setDados } = useContext(FormContext);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [voltar, setVoltar] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  let nomecurso =
    dados.curso == "tads"
      ? "Tecnólogo em Análise e Desenvolvimento de Sistemas"
      : "Sistemas de Informação";


  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const response = await axios.get(`${apiUrl}/disciplina`, {
          params: {
            curso: dados.curso,
            semestre: dados.semestre,
          },
        });

        setSalas(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (voltar) {
    return <Navigate to="/buscador-de-salas" />
  }

  if (!loading) {
    if (error) {
      return (
        <div>
          <h1 className="titulo">Suas salas e disciplinas</h1>
          <p className="txt">Não foi possível encontrar suas salas!</p>
          <button onClick={() => setVoltar(true)} type="button" className="btn">
            Voltar
          </button>
        </div>
      );
    } else if (salas.length === 0) {
      return (
        <div>
          <h1 className="titulo">Suas salas e disciplinas</h1>
          <p className="txt">
            Não foram encontradas as informações para o {dados.semestre}°
            semestre do curso: {nomecurso}
          </p>

          <div className="btn-voltar">
            <button onClick={() => setVoltar(true)} type="button" className="btn">
              Voltar
            </button>
          </div>
        </div>
      );
    } else
      return (
        <div>
          <h1 className="titulo">Suas salas e disciplinas</h1>
          <p className="txt">
            Olá {dados.nome}, suas disciplinas do curso {nomecurso} do{" "}
            {dados.semestre}° Semestre:
          </p>
          <div className="salas">
            {salas.map((sala, index) => {
              return (
                <div className="info" key={index}>
                  <section className="card">
                    <h3>{sala.sala}</h3>
                    <span>{sala.disciplina}</span>
                    <span>Professor(a): {sala.professor} </span>
                  </section>
                </div>
              );
            })}
          </div>
          <div className="btn-voltar">
            <button onClick={() => setVoltar(true)}type="button" className="btn">
              Voltar
            </button>
          </div>
        </div>
      );
  } else {
    return (
      <div>
        <h1 className="titulo">Suas salas e disciplinas</h1>
        <p className="txt">Buscando informações...</p>
        <div className="btn-voltar">
          <button onClick={() => setVoltar(true)} type="button" className="btn">
            Voltar
          </button>
        </div>
      </div>
    );
  }
};

export default Lista;
