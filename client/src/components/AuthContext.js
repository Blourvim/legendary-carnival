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
        console.log('the check auth works')
        axios.get(url + '/user/validate', { withCredentials: true })
            .then(res => {
                        console.log('the check auth works 2')

                if (res.status !== 401) 
                {setAuth(true)}
                else{
                    setAuth(false);console.log('auth has failed')
                    
                }
            })
            .catch(err => { console.log(err);        console.log('the check auth works error')
        })

    }
    checkAuth()

    return (
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={auth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>


    )
}
