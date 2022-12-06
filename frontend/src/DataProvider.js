import React, { createContext, useState, useContext } from 'react'

const DataContext = createContext()
export const DataProvider = ({ children }) => {
    const [kartyak, setKartyak] = useState([])
    const [tipsDreamer, setTipsDreamer] = useState([])
    const [tipsPlayers, setTipsPlayers] = useState([])
    const [players, setPlayers] = useState([]) // [{name:player1, point:0, whatis:{}}]
    const [timer, setTimer] = useState(0);

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