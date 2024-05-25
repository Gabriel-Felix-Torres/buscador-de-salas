import { Children, createContext, useContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [dados, setDados] = useState({
    nome: "",
    curso: "",
    semestre: ""
  });

  return (
    <FormContext.Provider value={{ dados, setDados }}>
      {children}
    </FormContext.Provider>
  );
};
