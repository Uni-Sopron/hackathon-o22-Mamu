import React, { createContext, useState, useContext } from 'react'

const DataContext = createContext()
export const DataProvider = ({ children }) => {
    const [kartyak, setKartyak] = useState([])
    const [tipsDreamer, setTipsDreamer] = useState([])
    const [tipsPlayers, setTipsPlayers] = useState([])
    const [players, setPlayers] = useState([]) // [{name:player1, point:0, whatis:{}}]
    const [timer, setTimer] = useState(1);
    const [roles, setRoles] = useState([{0: 'Tündér', 1: 'Mumus', 2: 'Álommanó', 3: 'Álmodó'}])
    const [roleCount, setroleCount] = useState({3:[0,1,2], 4: [1,1,2,2], 5: [0,0,1,2,2], 6: [0,0,0,1,1,2], 7: [0,0,0,1,1,2,2], 8: [0,0,0,0,1,1,1,2], 9: [0,0,0,0,1,1,1,2,2]})

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