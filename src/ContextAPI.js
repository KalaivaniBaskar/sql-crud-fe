import { createContext, useState, useContext } from "react";

const studentContext = createContext(); 

export const CtxProvider = ({children}) => {
    const [student, setStudent] = useState({}); 
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable : true,
        theme: 'dark'
    } 
    const BASE_URL = 'https://sql-crud.onrender.com'
    // const BASE_URL = 'http://localhost:5000'
    return(
        <studentContext.Provider value={{student, setStudent, toastOptions, BASE_URL}}>
            {children}
        </studentContext.Provider>
    )
}

export const useCTX = () => {
    return useContext(studentContext);
}