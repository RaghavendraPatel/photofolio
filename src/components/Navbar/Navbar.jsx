//css
import './Navbar.css'

import { useState } from 'react';
import { Link } from "react-router-dom";
//icons
import {GiHamburgerMenu} from 'react-icons/gi'
import { ImCross} from "react-icons/im";
import {TbLogout} from "react-icons/tb"

export default function Navbar(props){

    const [showItems,setShowItems] = useState(false);

    const handleToggle = () =>{
        setShowItems(prevState=>!prevState)
    }

    const user = props.user.user;
    return(
        <div className="Navbar">
            <Link to = "/">
                <div className="nav--logo">
                    {/* <img src = "" width = "50px"/> */}
                    <p className="nav--text"><b>p</b>hoto<b>F</b>olio</p>
                </div>
            </Link>
            <div className={showItems?"nav--item mobile-nav--item":"nav--item"}>
                <ul>
                        <Link to="/" onClick={handleToggle}><li>Home</li></Link>
                        <Link to="/albums" onClick={handleToggle}><li>Albums</li></Link>
                        <Link to="/photos" onClick={handleToggle}><li>Photos</li></Link>
                </ul>
            </div>
            <div className={showItems?"nav--user mobile-nav--user":"nav--user"}>
                {
                    !user.id
                        ?
                    <div className='nav--user-btns'>
                        <button className="Login" onClick={props.toggle.toggleLogin}>Login</button>
                        <button className="Signup" onClick={props.toggle.toggleSignup}>Sign Up</button>
                    </div>
                        :
                    <div className="nav--user--info" style={{display:'flex',alignItems:'center',gap:'1rem',textTransform:'capitalize'}}>
                        <p>{user.name}</p>
                        <TbLogout onClick={props.logout}/>
                    </div>
                }
            </div>
            <div className="hamburger" onClick={handleToggle}>{showItems?<ImCross/>:<GiHamburgerMenu />}</div>
        </div>
    );
}
