import React from "react";
import { useDataContext } from "../DataProvider";
import { useTimer } from "react-timer-hook";
import "../styles/Second.css";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer(
    {
      autoStart: false,
      expiryTimestamp,
      onExpire: () => alert("Lejárt az idő!"),
    }
  );

  return (
    <>
      <div className="box">
        <div className="text-center">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p className="text-center-p">
          {isRunning ? "Játék folyamatban." : "Játék indításra vár."}
        </p>
        <div className="button-group">
          <button className="btn" onClick={start}>
            Indítás
          </button>
          <button className="btn" onClick={pause}>
            Szünet
          </button>
          <button className="btn" onClick={resume}>
            Folytatás
          </button>
        </div>
      </div>
      <div className="box2">kutyafos</div>
    </>
  );
}

export const Second = () => {
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
  } = useDataContext();

  const time = new Date();
  time.setSeconds(time.getSeconds() + timer * 60);
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
};
