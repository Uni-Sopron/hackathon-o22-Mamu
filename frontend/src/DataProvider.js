import React, { createContext, useState, useContext } from 'react'

const DataContext = createContext()
export const DataProvider = ({ children }) => {
    const [valaszthatoKartyak, setValaszthatoKartyak] = useState({
        "kutya":"https://kutyabarathelyek.hu/images/images/2048x2048/12924428885f33e16fd79d4.jpg",
        "fa":"https://cdn.shopify.com/s/files/1/0550/6816/4318/files/eletfa2_480x480.jpg?v=1635007499",
        "szék":"https://cdn.pixabay.com/photo/2020/10/02/01/59/chair-5620065_960_720.png",
        "papagáj":"https://cdn.pixabay.com/photo/2018/09/13/08/51/drawing-parrot-3674123_960_720.png",
        "számítógép":"https://jf-staeulalia.pt/img/other/34/collection-computer-pictures-6.jpg",
        "telefon":"https://img.freepik.com/premium-vector/retro-phone-vintage-object-vector-sketch-illustration_231873-7314.jpg?w=740",
        "kard":"https://st.depositphotos.com/2907565/4122/v/450/depositphotos_41225075-stock-illustration-cartoon-sword-vector-illustration.jpg",
        "tündér":"https://st.depositphotos.com/1001418/2554/v/600/depositphotos_25545921-stock-illustration-beautiful-fairy.jpg",
        "korona":"https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/308013802_461542329350783_2506487906083457494_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S4TqsqU-RjwAX-eMq69&_nc_ht=scontent-vie1-1.xx&oh=00_AfC0K1-cyMAFYhBv_pSYAOrGmUIOJtf0A3u4YrD9WAxN9A&oe=63920525",
        "érme":"https://player.hu/uploads/2016/11/2000-1-1.jpg",
        "egér":"https://cdn.pixabay.com/photo/2020/11/05/20/49/mouse-5716180_960_720.jpg",
        "ház":"https://i0.wp.com/babafalva.hu/wp-content/uploads/2019/08/house-3167502_1920.png?fit=696%2C696&ssl=1",
        "harcos":"https://media.istockphoto.com/vectors/fighter-vector-id476457587?k=6&m=476457587&s=170667a&w=0&h=SHIX_DZe_N4TEobBLuzD6y4NtUPoetoPiTLwgd8ZCoE=",
        "papa":"https://media.istockphoto.com/vectors/boy-and-grandpa-reading-vector-id517097603?k=6&m=517097603&s=170667a&w=0&h=Ukex_jjSXskvgq2z040empKoOIqp1Kjg49m8HpYrP5o="
        } ) // amíg backend nincs behúzva
    const [kartyak, setKartyak] = useState([]) // eddigi kitalalando feladvanyok
    const [kitalalando, setKitalalando] = useState({}) // aktualis feladvany; {"name":"kutya", "pic":"..."}
    const [tipsDreamer, setTipsDreamer] = useState([]) // almodo tippjei
    const [tip, setTip] = useState("");
    const [players, setPlayers] = useState([]) // [{name:player1, point:0, whois:{}}]
    const [timer, setTimer] = useState(1);
    const [roles, setRoles] = useState([{0: 'Tündér', 1: 'Mumus', 2: 'Álommanó', 3: 'Álmodó'}])
    const [roleCount, setroleCount] = useState({4:[0, 1, 2, 2], 5:[0,0,1,2,2], 6:[0,0,0,1,1,2], 7:[0,0,0,1,1,2,2], 8:[0,0,0,0,1,1,1,2],9:[0,0,0,0,1,1,1,2,2], 10:[0,0,0,0,0,1,1,1,1,2]}) // ezek kozul barmelyik kimaradhat, az lesz az almodo (3) !
    const [helyesTipSzam, setHelyesTipSzam] = useState(0);
    const [helytelenTipSzam, setHelytelenTipSzam] = useState(0);
    const [isLastTip, setIsLastTip] = useState(false); // idozito lejarta utan true
    const [forduloCount, setForduloCount] = useState(1); // fordulo szama, ahol tart a jatek

    function getSzo() {
        const keys = Object.keys(valaszthatoKartyak);
        if (keys.length > 0) {
            const index = Math.floor(keys.length * Math.random());
            const key = keys[index];
            const value = valaszthatoKartyak[key];
            setKitalalando({"name":key, "pic":value});
        }
    }

    function checkTip() {
        if (kitalalando.name === tip) {
            setHelyesTipSzam(helyesTipSzam+1);
        } else {
            setHelytelenTipSzam(helytelenTipSzam+1);
        }

        // hozzaadjuk az almodo tipp listajahoz
        // Tényleges szót adjuk hozzá, vagy a tippjét??
        // setTipsDreamer([...tipsDreamer, kitalalando.name]);
        setTipsDreamer([...tipsDreamer, tip]);

        // uj kep + szo
        getSzo();

        setTip("");

        /*
        console.log('helyes: ' + helyesTipSzam);
        console.log('helytelen: ' + helytelenTipSzam);
        console.log('tippek: ' + tipsDreamer);
        */
       
        isLastTip && setIsLastTip(false);

    }

    const datas = {
        kartyak,
        setKartyak,
        tipsDreamer,
        setTipsDreamer,
        players,
        setPlayers,
        timer,
        setTimer,
        roles,
        roleCount,
        getSzo,
        kitalalando,
        checkTip,
        tip,
        setTip,
        helytelenTipSzam,
        helyesTipSzam,
        isLastTip,
        setIsLastTip,
        forduloCount,
        setForduloCount,
        setHelyesTipSzam,
        setHelytelenTipSzam
    }    
    
    return (
        <DataContext.Provider value={datas}>
            { children }
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext)
    return context
}