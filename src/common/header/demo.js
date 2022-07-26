import { Button } from '@material-ui/core';
import React, { Component, Fragment, useEffect } from 'react';
import './Header.css'
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Demo from './demo';
import MuiTabs from './MuiTab';




const Header = (props) =>{

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isLoggedIn ,setLoggedIn] = React.useState(false)
    

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

    async function logoutUser() {
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/auth/logout",{
                method:"POST",
                headers:{
                'Accept':"application/json",
                'Content-Type' : 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('access-token')}`
            }
            })

            //const result = await rawResponse.json()
            
            if(rawResponse.ok){
                sessionStorage.removeItem("access-token")
                sessionStorage.removeItem("user-details")
                userIsLoggedOut();
                
            }else{
                const error = new Error();
                error.message = "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)
            
        }
        
        
    }

    if(isLoggedIn === false){
        return (  <Fragment>
            <div className='header'>
                <img className='logo' src = {logo} ></img>              
                <Button onClick={openModal} variant="contained" className='login'>Login</Button>
                
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
      
    }else{
        return(<Fragment>
            <div className='header'>
                <img className='logo' src = {logo} ></img>              
                <Button onClick={logoutUser} variant="contained" className='login'> {isLoggedIn ? "Logout" : "Login"} </Button>
                {
                    props.showBookShowButton && isLoggedIn
                    ? <Button variant="contained" color="primary" className='book-show'>Book Show</Button>:""
                }
                
            </div>
        </Fragment>)
    }
 
}

export default Header;