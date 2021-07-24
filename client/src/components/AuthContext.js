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

        const url = "http://localhost:4000"
        axios.get(url + '/user/validate', { withCredentials: true })
            .then(res => {

                if (res.status !== 401) 
                {setAuth(true)
                console.log("auth set to true")}
                else{
                    console.log("auth set to false")
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
