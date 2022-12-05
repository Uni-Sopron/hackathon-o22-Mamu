import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDataContext } from '../DataProvider'

const First = () => {
    const {
        kartyak,
        setKartyak,
        tipsDreamer,
        setTipsDreamer,
        tipsPlayers,
        setTipsPlayers,
        players,
        setPlayers
    } = useDataContext()
    const [data, setData] = useState()
    
    console.log(players)
    return (
        <div>
            <input type="text" onChange={(event) => { 
                setData({
                    name: event.target.value,
                    whois: ""
                });
             }} />
             <button onClick={()=>{setPlayers([... players, data])}}>Add</button>
            <Link to="/Second"><button>Start</button></Link>
        </div>
    );
}

export default First