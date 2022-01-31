import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState()
    const [currentNetwork, setCurrentNetwork] = useState()
    const [ownedTigers, setOwnedTigers] = useState([])
    const [listedTigers, setListedTigers] = useState([])
    const [tigerInfo, setTigerInfo] = useState(Array.from({length: 5555},()=> Array.from({length: 2}, () => "")));

    const value = {
        user, setUser, 
        currentNetwork, setCurrentNetwork,
        ownedTigers, setOwnedTigers,
        listedTigers, setListedTigers,
        tigerInfo, setTigerInfo,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
