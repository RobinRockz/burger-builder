import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css';

const navigationItems = (props) => {

    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            {props.isAuthenticated 
                ? <NavigationItem link='/orders'>Orders</NavigationItem>
                : null}
            {props.isAuthenticated 
                ? <NavigationItem link='/logout'>Logout</NavigationItem> 
                : <NavigationItem link='/login'>Authenticate</NavigationItem>
             }
        </ul>
    );
}

export default navigationItems;