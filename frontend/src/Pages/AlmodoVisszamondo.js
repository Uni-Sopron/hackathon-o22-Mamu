import React, {useState} from "react";
import { useDataContext } from "../DataProvider";

export const AlmodoVisszamondo = () => {

    const { tipsDreamer, setTipsDreamer } = useDataContext();
    const [ visszamondottSzo, setVisszamondottSzo ] = useState('');
    const [ visszamondottCount, setVisszamondottCount ] = useState(0);
    const [ probalkozas, setProbalkozas ] = useState(tipsDreamer.length);

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
                <button className="btn">Tovább az aktuális eredményekhez</button>
            }
        </div>
    </div>
  );
};
