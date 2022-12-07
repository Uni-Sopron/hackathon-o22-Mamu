import React, { useState, useEffects } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../DataProvider";
import "../styles/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    timer,
    setTimer,
    roleCount
  } = useDataContext();

  const [data, setData] = useState();
  const [timerdata, setTimerdata] = useState(1);
  const [avaible, setAvaible] = useState([]);
  const [playersHasRole, setplayersHasRole] = useState([])

  const navigate = useNavigate();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(array) { array.sort(() => Math.random() - 0.5); } 

  function addPlayers() {
    /* Maximum 10 játékos */
    if (players.length <= 9 && data.length !== 0) {

      setPlayers([
        ...players,
        { name: data, point: 0, whois: 0 },
      ]);

    }

  }

  function minPlayers() {
    /* Legalább 4 játékos */
    if (players.length >= 4) {  
      
      // Játékos szerepek kiosztása
      let rolesWhichShouldBe = roleCount[players.length].sort((a, b) => 0.5 - Math.random());
      rolesWhichShouldBe.pop()
      rolesWhichShouldBe.push(3) //3 : álmodó
      rolesWhichShouldBe = rolesWhichShouldBe.sort((a, b) => 0.5 - Math.random());
      

      let updatedPlayers = [];
      for (let i = 0; i < players.length; i++) {
        console.log({ name: players[i].name, point: 0, whois: rolesWhichShouldBe[i] });
        updatedPlayers.push({ name: players[i].name, point: 0, whois: rolesWhichShouldBe[i] });
      }

      setPlayers(updatedPlayers);

      navigate("/Second");
      
    } else {
      toast.error("Minimum 4 játékos szükséges!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
    }
  }

  function timerSet() {
    /* Timer beállítása */
    if (timerdata !== 0) {
      setTimer(timerdata);
      console.log(timerdata);
    }
  }

  return (
    <>
      <div className="box">
        <span className="text-center">Játékos hozzáadása</span>
        <div className="input-container">
          <input
            type="input"
            className="form__field"
            onChange={(e) => setData(e.target.value)}
            required
          />
          <label>Játékos neve</label>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            addPlayers();
          }}
        >
          Hozzáadás
        </button>
        <div className="first__players">
          <span className="text-center-players">Játékos lista</span>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
        <button type="button" className="btn" onClick={minPlayers}>
          Játék indítása
        </button>
        <div className="first__players">
          <span className="text-center">Időzítő</span>
          <div className="input-container">
            <input
              value={timerdata}
              type="number"
              className="form__field"
              style={{
                width: "30px",
                marginLeft: "110px"
              }}
              onChange={(e) => {
                setTimerdata(e.target.value);
                timerSet();
              }}
              required
            />
            <label style={{marginLeft: "95px"}}>Hány perc</label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
