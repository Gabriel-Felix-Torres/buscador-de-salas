import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate, Outlet } from "react-router-dom";
import * as Yup from "yup";
import { FormContext } from "./context/FormContext";

const NameForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const {dados, setDados} = useContext(FormContext) // Estado para armazenar os valores do formulário

  if (submitted) {
    console.log(dados);
    // Se o formulário foi enviado com sucesso, redirecione para a página de sucesso com os valores do formulário como props
    return <Navigate to="/lista" />;
  }

  return (
    <div className="formjs">
      <Formik
        initialValues={{
          nome: "",
          curso: "",
          semestre: "",
        }}
        validationSchema={Yup.object({
          nome: Yup.string().required("Nome é obrigatório!"),
          curso: Yup.string().required("Selecione o curso!"),
          semestre: Yup.string().required("Selecione o semestre!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            setDados(values);
          }, 300);
        }}
      >
        {(formik) => (
          <Form className="form">
            <fieldset />

            <label htmlFor="nome" className="subT">
              NOME:
            </label>
            <br />
            <Field type="text" name="nome" id="nome" className="esc_texto" />
            {formik.errors.nome && formik.touched.nome ? (
              <div className="error-message">{formik.errors.nome}</div>
            ) : null}
            <br />
            <label className="subT">Selecione o Curso:</label>
            <div className="select">
              <Field as="select" name="curso" id="curso">
                <option value="">Selecione...</option>
                <option value="sis">SIS- Sistemas de informação</option>
                <option value="tads">
                  TADS- Técnólogo em análise desenvolvimento de sistemas
                </option>
              </Field>
              {formik.errors.curso && formik.touched.curso ? (
                <div className="error-message">{formik.errors.curso}</div>
              ) : null}
            </div>
            <br />
            <label className="subT">Selecione o período:</label>
            <div className="select">
              <Field as="select" name="semestre" id="semestre">
                <option value="">Selecione...</option>
                {formik.values.curso == "sis"
                  ? [...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}° Semestre
                      </option>
                    ))
                  : formik.values.curso == "tads"
                  ? [...Array(5)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}° Semestre
                      </option>
                    ))
                  : []}
              </Field>
              {formik.errors.semestre && formik.touched.semestre ? (
                <div className="error-message">{formik.errors.semestre}</div>
              ) : null}
            </div>

            <div className="area">
              <button type="submit" className="btn">
                Enviar
              </button>
            </div>
            <fieldset />
          </Form>
        )}
      </Formik>
      <Outlet />
    </div>
  );

};

export default NameForm;
