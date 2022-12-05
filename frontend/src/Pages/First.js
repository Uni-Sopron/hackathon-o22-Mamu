import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../DataProvider";

export const First = () => {
  const {
    kartyak,
    setKartyak,
    tipsDreamer,
    setTipsDreamer,
    tipsPlayers,
    setTipsPlayers,
    players,
    setPlayers,
  } = useDataContext();

  const [data, setData] = useState();

  const navigate = useNavigate();

  function addPlayers() {
    /* Maximum 10 játékos */
    if (players.length < 10) {
      setPlayers([...players, data]);
    }
  }

  function minPlayers() {
    /* Legalább 4 játékos */
    if (players.length >= 4) {
      navigate("/Second");
    }
  }

  console.log(players);
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setData({
            name: event.target.value,
            whois: "",
          });
        }}
      />
      <button onClick={addPlayers}>Add</button>
      <button onClick={minPlayers}>Start</button>
      <div>
        {players.map((player, index) => (
          <p>{player.name}</p>
        ))}
      </div>
    </div>
  );
};
