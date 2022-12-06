import React, { createContext, useState, useContext } from 'react'

const DataContext = createContext()
export const DataProvider = ({ children }) => {
    const [kartyak, setKartyak] = useState([])
    const [tipsDreamer, setTipsDreamer] = useState([])
    const [tipsPlayers, setTipsPlayers] = useState([])
    const [players, setPlayers] = useState([]) // [{name:player1, point:0, whatis:{}}]
    const [timer, setTimer] = useState(1);
    const [roles, setRoles] = useState([{0: 'Tündér', 1: 'Mumus', 2: 'Álommanó', 3: 'Álmodó'}])

    const datas = {
        kartyak,
        setKartyak,
        tipsDreamer,
        setTipsDreamer,
        tipsPlayers,
        setTipsPlayers,
        players,
        setPlayers,
        timer,
        setTimer,
        roles,
    }    
    
    return (
        <DataContext.Provider value={datas}>
            { children }
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext)
    return context
}