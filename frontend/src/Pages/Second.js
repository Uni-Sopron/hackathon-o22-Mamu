import React, {useState, useEffect} from "react";
import { useDataContext } from "../DataProvider";
import { useTimer } from "react-timer-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer(
    {
      autoStart: true,//false ,
      expiryTimestamp,
      onExpire: () => alert("Lejárt az idő!"),
    }
  );

  const [ isVisible, setIsVisible ] = useState(true); // kep + szo eltuntetesere/megjelenitesere
  const { players, roles, getSzo, kitalalando, checkTip, tip, setTip, helyesTipszam, helytelenTipSzam } = useDataContext();

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

  return (
    <>
      <div className="box">
        <div className="text-center">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p className="text-center-p">
          {isRunning ? "Játék folyamatban." : "Játék szüneteltetve / vége."}
        </p>
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
          <button className="btn" onClick={isRunning ? pause: resume}>
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
              <h2 style={{color: "white"}}>{kitalalando && kitalalando.name}</h2>
            </div>
            :
            <img src="https://toppng.com/uploads/preview/red-question-mark-png-11552242986dielb7cmf4.png" width="250" height="300" alt="elrejtett kartya"></img>
          }
          <button className="btn" onClick={()=>setIsVisible(!isVisible)}>Elrejtés/Megjelenítés</button>

          {/* játékosok utalásait nem kell letárolni */}
          <div className="input-container">
            <input
            value={tip}
            className="form__field"
            placeholder="ámodó tippje" 
            onChange={(e) => setTip(e.target.value)}
            /> 
            <button className="btn" onClick={checkTip}>OK</button>
          </div>

          <div>
            <p>Helyes: {helyesTipszam}</p>
            {/*console.log(helyesTipszam)*/}
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
