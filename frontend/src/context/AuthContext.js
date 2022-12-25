import { useState, createContext } from "react";

export const AuthContext = createContext();


const AuthContextProvider = (props) => {

    const [user, setUser] = useState({
        login: false,
        role: null
    });
    
    return (
        <AuthContext.Provider value={{
            user: user,
            setUser: setUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;