import React, { useContext, useState } from 'react';
import axios from 'axios';
const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();


export const useAuth = () => {
    return useContext(AuthContext)

}

export const useAuthUpdate = () => {
    
return useContext(AuthUpdateContext)



}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false)
    const checkAuth = () => {

        axios.get('/user/validate', { withCredentials: true })
            .then(res => {

                if (res.status !== 401) 
                {setAuth(true)
            }
                else{
                    setAuth(false);
                    
                }
            })
            .catch(err => { console.log(err);     
                setAuth(false);
            })

    }

    checkAuth()

    return (
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={checkAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>


    )
}
