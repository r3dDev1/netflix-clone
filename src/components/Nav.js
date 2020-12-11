import React, {useEffect, useState} from 'react';
import '../css/Nav.css';

function Nav() {

    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            // 100 pixels
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        // before firing the next eventlistener, remove the previous one.
        // basically call eventlistener and then remove it after
        // this way you don't have n eventlisteners
        return () => {
            window.removeEventListener('scroll');
        }
    },[])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className='nav__logo' src='https://cordcutting.com/wp-content/uploads/2015/06/netflix-logo.png' alt='Netflix logo' />
            <img className='nav__avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt='User avatar' /> 
        </div>
    )
}

export default Nav
