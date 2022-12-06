import React from "react";
import { useDataContext } from "../DataProvider";
import { useTimer } from "react-timer-hook";
import "../styles/Second.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer(
    {
      autoStart: false,
      expiryTimestamp,
      onExpire: () => alert("Lejárt az idő!"),
    }
  );
  const { players, timer, roles } = useDataContext();

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
          <button
            className="btn"
            onClick={() => {
              showRoles();
            }}
          >
            Szerepek
          </button>
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
