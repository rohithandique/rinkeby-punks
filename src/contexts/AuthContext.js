import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState()
    const [currentNetwork, setCurrentNetwork] = useState()
    const [ownedPunks, setOwnedPunks] = useState([])
    const [listedTigers, setListedTigers] = useState([])
    const [mintedTigers, setMintedTigers] = useState([])
    const [tigerInfo, setTigerInfo] = useState(Array.from({length: 5555},()=> Array.from({length: 2}, () => "")));

    const value = {
        user, setUser, 
        currentNetwork, setCurrentNetwork,
        ownedPunks, setOwnedPunks,
        listedTigers, setListedTigers,
        mintedTigers, setMintedTigers,
        tigerInfo, setTigerInfo,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
