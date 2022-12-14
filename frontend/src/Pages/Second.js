import React, { useState, useEffect } from "react";
import { useDataContext } from "../DataProvider";
import { useTimer } from "react-timer-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer(
    {
      autoStart: true,//false ,
      expiryTimestamp,
      onExpire: () => alert("Lejárt az idő!"),
    }
  );

  const [isVisible, setIsVisible] = useState(true); // kep + szo eltuntetesere/megjelenitesere
  const { players, roles, getSzo, kitalalando, checkTip, tip, setTip, helyesTipSzam, setHelyesTipSzam, helytelenTipSzam, setHelytelenTipSzam, isLastTip, setIsLastTip, forduloCount, szerepKiosztas } = useDataContext();

  const navigate = useNavigate();

  function showRoles() {
    toast.info(
      `${players.map(
        (player, index) =>
          player.name + ": " + roles[0][players[index].whois] + "\n"
      )}`,
      {
        position: "top-left",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      }
    );
  }

  useEffect(() => {
    getSzo()
  }, []); // egyszer fut le, első rendernél

  useEffect(() => {
    setIsLastTip(true);
  }, [isRunning]);

  /*
  useEffect(() => {
    setHelyesTipSzam(0);
    setHelytelenTipSzam(0);
    szerepKiosztas(); // itt nem jó
  }, [forduloCount]); // kövi fordulónál nullázzuk a pontokat
*/

  return (
    <>
      <div className="box">
        <div className="text-center">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p className="text-center-p">
          {isRunning ? "Játék folyamatban." : "Játék szüneteltetve / vége."}
        </p>
        <p>{players.length}/{forduloCount}.forduló</p>
        <div className="button-group">
          {/*
          <button className="btn" onClick={start}>
            Indítás
          </button>
          
            {/*
          <button className="btn" onClick={pause}>
            Szünet
          </button>
          */}
          <button className="btn" onClick={isRunning ? pause : resume}>
            Szünet/Folytatás
          </button>
          <button
            className="btn"
            onClick={() => {
              showRoles();
            }}
          >
            Szerepek
          </button>

          {
            isVisible ?
              <div>
                {kitalalando && <img src={kitalalando.pic} width="250" height="300" alt="kartya"></img>}
                <h2 style={{ color: "white" }}>{kitalalando && kitalalando.name}</h2>
              </div>
              :
              <img src="https://toppng.com/uploads/preview/red-question-mark-png-11552242986dielb7cmf4.png" width="250" height="300" alt="elrejtett kartya"></img>
          }
          <button className="btn" onClick={() => setIsVisible(!isVisible)}>Elrejtés/Megjelenítés</button>

          {(isRunning || isLastTip) ?
            <div className="input-container">
              <input
                value={tip}
                className="form__field"
                placeholder="álmodó tippje"
                onChange={(e) => setTip(e.target.value)}
              />
              <button className="btn" onClick={checkTip}>OK</button>
            </div>
            :
            <button className="btn" onClick={() => navigate('/Almodo')}>Tovább</button>
          }

          <div>
            <p>Helyes: {helyesTipSzam}</p>
            <p>Helytelen: {helytelenTipSzam}</p>
          </div>

        </div>
      </div>
      <ToastContainer />

    </>
  );
}

export const Second = () => {
  const { timer } = useDataContext();
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer * 60);

  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
};
