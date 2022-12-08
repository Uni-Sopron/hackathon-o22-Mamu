import React, { useState } from "react";
import { useDataContext } from "../DataProvider";
import { useNavigate } from "react-router-dom";

export const Eredmenyek = () => {
  const { players, roles, forduloCount, setForduloCount, szerepKiosztas, setHelyesTipSzam, setHelytelenTipSzam, setTipsDreamer, setPlayers, setTimer } = useDataContext();

  const navigate = useNavigate();

  function kovetkezoFordulo() {
    if (forduloCount !== players.length) {
        setForduloCount(forduloCount+1)
        szerepKiosztas();
        setHelyesTipSzam(0);
        setHelytelenTipSzam(0);
        setTipsDreamer([]);
        navigate('/Second');
    }
  }

  function jatekVege() {
    navigate('/First')
    setHelyesTipSzam(0);
    setHelytelenTipSzam(0);
    setTipsDreamer([]);
    setPlayers([]);
    setForduloCount(0);
    setTimer(1);
  }

  return (
    <div className="box">
      <div className="container">
        <h1 className="white">Aktuális forduló eredménye ({players.length}/{forduloCount}.forduló)</h1>

              {/* players.map((player, index) => (
                <p className='white' key={index}>{index+1}.forduló</p>
              )) */}
     
              {players.map((player, index) => (
                <p className='white' key={index}>{player.name}: {player.point} pont ({roles[0][player.whois]})</p>
              ))}

        {
            (forduloCount === players.length) ?
                <div>
                    <p className="white">Játék vége</p>
                    <button className="btn" onClick={jatekVege}>Új játék</button>
                </div>
                :
            <button className="btn" onClick={kovetkezoFordulo}>Tovább a következő fordulóra</button>
        }
   
      </div>
    </div>
  );
};
