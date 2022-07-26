import { Button } from '@material-ui/core';
import React, { Component, Fragment, useEffect } from 'react';
import './Header.css'
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Demo from './demo';
import MuiTabs from './MuiTab';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';




const Header = (props) =>{

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isLoggedIn ,setLoggedIn] = React.useState(sessionStorage.getItem("access-token") == null ? false : true)
    const {id} = useParams();
    

    const customStyles = {
        content: {
          height:'60%',
          width:'30%',
          position:'absolute',
          top:'20%',
          left : '35%',
          display:'flex',
          justifyContent : 'center'
        },
      };

    function userIsLoggedIn(){
        if(sessionStorage.getItem('access-token')!==null){
            setLoggedIn(true);
        } 
    }

    function userIsLoggedOut(){
        if(sessionStorage.getItem('access-token')===null){
            setLoggedIn(false);
        } 
    }

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function logoutUser() {
        sessionStorage.clear()
        userIsLoggedOut()
    }

    return (  <Fragment>
            <div className='header'>
                <img className='logo' src = {logo} ></img>       
                {!isLoggedIn ? 
                    <Button onClick={openModal} variant="contained" className='login'>Login</Button>      
                    :<Button onClick={logoutUser} variant="contained" className='login'>Logout</Button>
                }{props.showBookShowButton &&isLoggedIn ? 
                    <Link to={"/bookshow/" + id}>
                        <Button variant="contained" color="primary" className='book-show'>Book Show</Button>
                    </Link>
                    :""
                }
                    <Modal
                            isOpen={modalIsOpen}                   
                            onRequestClose={closeModal}   
                            style={customStyles}                   
                            contentLabel="Example Modal"
                            ariaHideApp={false}
                    >                            
                    <MuiTabs onRequestClose={() =>closeModal()} changeToLogout = {() =>userIsLoggedIn()}/>
                    </Modal>               
            </div>
        </Fragment>)
    
    
 
}

export default Header;