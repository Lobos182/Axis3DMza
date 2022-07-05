import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget';
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';




const NavBar = (props) => {
    const { getQuantity } = useContext(CartContext)
    const count = getQuantity()

    


    return (
        <div>
            <nav className="navbar container">
            <Link className='logo' to='/' >
                    <img src='/images/axis3d.jpg' width="100" height="auto" className="imgLogo" alt='logo' />
                </Link>
                <Link className='logo' to='/' >
                <h2 className='titulo'>Axis 3D Mendoza</h2></Link>
                <input type="checkbox" id="toggler" className="hamburger" />
                <label htmlFor="toggler"><i className="ri-menu-line"></i></label>
                <div className="menu">
                    <ul className="list">
                        <li><Link className='Link' to='/about'>Nosotros</Link></li>
                        <li><Link className='Link' to='/categoria/animales'>Animales</Link></li>
                        <li><Link className='Link' to='/categoria/accesorios'>Accesorios</Link></li>
                        <li><Link className='Link' to='/categoria/figuras'>Figuras</Link></li>                        
                    </ul>
                </div>
                <a href="#!">{count > 0 && <CartWidget />}</a>
            </nav>
        </div>
    );
}

export default NavBar