import { useState, createContext } from "react";

export const AuthContext = createContext();


const AuthContextProvider = (props) => {

    let is_login = localStorage.getItem('x-csrf-token') != null ? true : false;
    const [isLogin, setLogin] = useState(is_login);
    
    return (
        <AuthContext.Provider value={{
            isLogin: isLogin,
            setLogin: setLogin
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;