import React from "react";
import { useDataContext } from "../DataProvider";

export const Eredmenyek = () => {
  const { players, roles, forduloCount } = useDataContext();

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

        <button className="btn">Tovább a következő fordulóra</button>
   
      </div>

    </div>
  );
};
