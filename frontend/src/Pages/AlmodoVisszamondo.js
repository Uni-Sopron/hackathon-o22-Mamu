import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../DataProvider";

export const AlmodoVisszamondo = () => {

    const { tipsDreamer, setTipsDreamer, helyesTipSzam, helytelenTipSzam, players, setPlayers } = useDataContext();
    const [ visszamondottSzo, setVisszamondottSzo ] = useState('');
    const [ visszamondottCount, setVisszamondottCount ] = useState(0);
    const [ probalkozas, setProbalkozas ] = useState(tipsDreamer.length);

    const navigate = useNavigate();

    function checkVisszamondas() {
        if(probalkozas !== 0) {
            setProbalkozas(probalkozas-1)
            if(tipsDreamer.includes(visszamondottSzo)) {
                setVisszamondottCount(visszamondottCount+1);
                let index = tipsDreamer.indexOf(visszamondottSzo);
                let list = tipsDreamer;
                list.splice(index, 1);
                setTipsDreamer(list);

            }
        } else {
            /*
            // tipsDreamer-ből kidobásra kerül a visszamondott szó, ez azért nem jó
            if(visszamondottCount !== tipsDreamer.length) {
                console.log("Visszamondtál mindent!")
            }
            */
            if (tipsDreamer.length === 0) {
                console.log("Visszamondtál mindent");
            }
        }
    }

    function pontSzamitas() {
        let updatePlayerPoints = [];

        for (let i = 0; i < players.length; i++) 
        {
            if (players[i].whois === 0) // tündér
            {
                updatePlayerPoints.push({name: players[i].name, point: helyesTipSzam, whois: players[i].whois})
            }

            else if (players[i].whois === 1) // mumus
            {
                updatePlayerPoints.push({name: players[i].name, point: helytelenTipSzam, whois: players[i].whois})
            }

            else if (players[i].whois === 2)  //álommanó
            { 
                if (helyesTipSzam === helytelenTipSzam) {
                    updatePlayerPoints.push({name: players[i].name, point: helyesTipSzam+2, whois: players[i].whois})
                }

                else if (helyesTipSzam - helytelenTipSzam === 1 || helyesTipSzam - helytelenTipSzam === - 1) {
                    if (helyesTipSzam > helytelenTipSzam) {
                        updatePlayerPoints.push({name: players[i].name, point: helyesTipSzam, whois: players[i].whois})
                    } else {
                        updatePlayerPoints.push({name: players[i].name, point: helytelenTipSzam, whois: players[i].whois})
                    }
                }

                else if (helyesTipSzam - helytelenTipSzam > 2 || helyesTipSzam - helytelenTipSzam < -2) 
                {
                    if (helyesTipSzam < helytelenTipSzam) {
                        updatePlayerPoints.push({name: players[i].name, point: helyesTipSzam, whois: players[i].whois})
                    } else {
                        updatePlayerPoints.push({name: players[i].name, point: helytelenTipSzam, whois: players[i].whois})
                    }
                }
            }

            else if (players[i].whois === 3)  // álmodó
            {
                updatePlayerPoints.push({name: players[i].name, point: helyesTipSzam, whois: players[i].whois})

                // +2-t kap ha mindent visszamondott!!
            }
           
        }
        setPlayers(updatePlayerPoints)
        
        navigate('/Eredmenyek')
    }

  return (
    <div className="box">
        <div className="container">
        <h1 className="white">Álmodó, kérlek mondd vissza a kártyákat!</h1>
            <p>Lehetőségek száma: {probalkozas}</p>
            <p>Helyesen visszamondva: {visszamondottCount}</p>
            {probalkozas !== 0 ?
                <div className="input-container">
                    <input
                    value={visszamondottSzo}
                    className="form__field"
                    placeholder="szó"
                    onChange={(e) => setVisszamondottSzo(e.target.value)}
                    />
                    <button className="btn" onClick={checkVisszamondas}>OK</button>
                </div>
                :
                <button className="btn" onClick={pontSzamitas}>Tovább az aktuális eredményekhez</button>
            }
        </div>
    </div>
  );
};
