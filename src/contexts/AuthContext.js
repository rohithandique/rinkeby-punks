import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState()
    const [currentNetwork, setCurrentNetwork] = useState()
    const [ownedPunks, setOwnedPunks] = useState([])
    const [listedPunks, setListedPunks] = useState([])
    const [mintedPunks, setMintedPunks] = useState([])
    const [punkPrice, setPunkPrice] = useState();

    const value = {
        user, setUser, 
        currentNetwork, setCurrentNetwork,
        ownedPunks, setOwnedPunks,
        listedPunks, setListedPunks,
        mintedPunks, setMintedPunks,
        punkPrice, setPunkPrice
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
