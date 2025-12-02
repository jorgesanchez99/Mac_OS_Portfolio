import dayjs from "dayjs";
import {useState, useEffect} from "react";
import {navIcons, navLinks} from "#constants";
import useWindowStore from "#store/window.js";


const NavBar = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());
    const {openWindow} = useWindowStore();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo"/>
                <p className="font-bold">Jorge's Portfolio</p>

                <ul>
                    {navLinks.map(({id, name,type}) => (
                        <li key={id} onClick={()=> openWindow(type)}>
                            <p> {name}</p>
                        </li>
                    ))}
                </ul>

            </div>

            <div>
                <ul>{navIcons.map(({id, img}) => (
                    <li key={id}>
                        <img src={img} className="icon-hover"
                             alt={`icon-${id}`}/>
                    </li>
                ))}
                </ul>

                {/* Formato: "ddd MMM D h:mm A" -> 'ddd' día abreviado (Mon), 'MMM' mes abreviado (Jan),
                'D' día del mes, 'h:mm A' hora 12h con AM/PM */}
                 <time> {currentTime.format("ddd MMM D h:mm A")}</time>

            </div>


        </nav>
    )
}
export default NavBar
