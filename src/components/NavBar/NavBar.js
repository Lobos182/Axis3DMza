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
                    <img src='./images/axis3d.jpg' width="100" height="auto" className="imgLogo" alt='logo' />
                </Link>
                <h2 className='titulo'>Axis 3D Mendoza</h2>
                <input type="checkbox" id="toggler" />
                <label for="toggler"><i className="ri-menu-line"></i></label>
                <div className="menu">
                    <ul className="list">
                        <li><a href="#!">Nosotros</a></li>
                        <li><Link className='Link' to='/categoria/animales'>Animales</Link></li>
                        <li><Link className='Link' to='/categoria/accesorios'>Accesorios</Link></li>
                        <li><Link className='Link' to='/categoria/figuras'>Figuras</Link></li>
                        <li><a href="#!">{count > 0 && <CartWidget />}</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar