import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Header = () => {
    const dispatch = useAppDispatch();
    const displayName = useAppSelector(state => state.auth.displayName);

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/dashboard">
                        <h1>Expensify</h1>
                    </Link>
                    <div>                    
                        <span className="header__name">{displayName}</span>
                        <button className="button button--link" onClick={dispatch(startLogout)}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;