import { Box , Tab } from "@mui/material";
import { TabContext ,TabList , TabPanel } from "@mui/lab";
import React, { Component } from 'react';
import { useState } from "react";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';





const MuiTabs = (props) =>{

    const [value , setValue] = useState('1')
    const [signUpState , setSignUpState] = useState({
        first_name : '',
        last_name : '',
        email_address : '',
        mobile_number : '',
        password : '',
    })

    const [loginState , setLoginState] = useState({
        username : '',
        pass : ''
    })
    
    const [signUpStatus , setSignUpStatus] = useState(false)

    let first_name = signUpState.first_name;
    let last_name = signUpState.last_name;
    let email_address = signUpState.email_address;
    let mobile_number = signUpState.mobile_number;
    let password = signUpState.password;
    let username = loginState.username;
    let pass = loginState.pass;

    const signUpSuccesfull = () =>{
        setSignUpStatus(true);
    }

    const loginChangedHandler = (e) => {
        const state = loginState;
        state[e.target.name] = e.target.value;
        setLoginState({...state});
    }

    const handleLoginSubmit = (e) =>{
        e.preventDefault();
        loginHandler()
        setLoginState({
            username : '',
            pass : ''
        })

    }
    async function loginHandler(){

        try {
            const params = window.btoa(`${username}:${pass}`)
            const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login",{
                method:"POST",
                headers:{
                'Accept':"application/json;charset=UTF-8",
                'Content-Type' : 'application/json;charset=UTF-8',
                authorization : `Basic ${params}`
            }
            })

            const result = await rawResponse.json()
            
            if(rawResponse.ok){
                
                window.sessionStorage.setItem('user-details',JSON.stringify(result));
                window.sessionStorage.setItem('access-token',rawResponse.headers.get('access-token'));
                props.changeToLogout();
                props.onRequestClose();
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)
            
        }
        
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const inputChangedHandler = (e) => {
        const state = signUpState;
        state[e.target.name] = e.target.value;
        setSignUpState({...state});
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        signUpHandler(signUpState);
        setSignUpState({
        first_name : '',
        last_name : '',
        email_address : '',
        mobile_number : '',
        password : '',
        });

    }

    async function signUpHandler(newSubscriber){
              
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/signup" , {
            method:"POST",
            headers:{
            'Accept':"application/json;charset=UTF-8",
            'Content-Type' : 'application/json;charset=UTF-8'
            },body:JSON.stringify(newSubscriber)
            })

            const result = rawResponse.json();
            if(rawResponse.ok){
                console.log("Success")
                signUpSuccesfull();
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }   
        } catch (error) {
            alert(`Error: ${error.message}`)
        }
    }


    return (
        <Box>
            <TabContext value = {value}>
                <Box sx = {{borderBottom: 1, borderColor: 'pink'}}>
                    <TabList variant="fullWidth" aria-label="Tabs example" onChange={handleChange}>
                        <Tab label = 'Login' value = '1' />
                        <Tab label = 'Register' value = '2' />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ValidatorForm className='login-form-container' onSubmit={handleLoginSubmit}>
                        <TextValidator
                            id ='username'
                            label = 'Username*'
                            type = 'text'
                            name = 'username'
                            validators={['required']}
                            errorMessages={['Username cannot be empty']}
                            onChange = {loginChangedHandler}
                            value = {username}
                        >
                        </TextValidator><br/>
                        <TextValidator
                            id ='pass'
                            validators={['required']}
                            errorMessages={['Password cannot be empty']}
                            label="Password*"
                            name="pass"
                            type="password"
                            value = {pass}
                            onChange = {loginChangedHandler}
                        >
                        </TextValidator><br/><br/>
                        {
                            sessionStorage.getItem('access-token') !== null &&
                            <p>Login Successful!</p>
                        }<br/>
                        <Button type='submit' style={{left:'32%',color:'white',backgroundColor:'rgb(83, 102, 249)'}}>Login</Button>
                    </ValidatorForm>
                </TabPanel>
                <TabPanel value="2">
                    <ValidatorForm className='signUp-form-container' onSubmit={handleSignUpSubmit}>
                        <TextValidator
                                id ='first_name'
                                label = 'First Name *'
                                type = 'text'
                                name = 'first_name'
                                validators={['required']}
                                errorMessages={'required'}
                                onChange={inputChangedHandler}
                                value = {first_name}

                        >
                        </TextValidator>
                        <TextValidator
                            id ='last_name'
                            label = 'Last Name *'
                            type = 'text'
                            name = 'last_name'
                            validators={['required']}
                            errorMessages={'required'}
                            onChange={inputChangedHandler}
                            value = {last_name}
                        >
                        </TextValidator>
                        <TextValidator
                            id ='email_address'
                            label = 'Email *'
                            type = 'text'
                            name = 'email_address'
                            validators={['required' , 'isEmail']}
                            errorMessages={['required','only email allowed']}
                            onChange={inputChangedHandler}
                            value = {email_address}
                        >
                        </TextValidator>
                        <TextValidator
                            id ='password'
                            label = 'Password *'
                            type = 'password'
                            name = 'password'
                            validators={['required']}
                            errorMessages={'required'}
                            onChange={inputChangedHandler}
                            value = {password}
                        >
                        </TextValidator>
                        <TextValidator
                            id ='mobile_number'
                            label = 'Contact No *'
                            type = 'number'
                            name = 'mobile_number'
                            validators={['required']}
                            errorMessages={'required'}
                            onChange={inputChangedHandler}
                            value = {mobile_number}
                        >
                        </TextValidator><br/><br/>
                        {signUpStatus === true &&
                            <p>"Registration Successful. Please Login!"</p>
                        }<br/>
                        <Button type="submit" style={{left:'30%',color:'white',backgroundColor:'rgb(83, 102, 249)'}}>Register</Button>
                    </ValidatorForm>
                </TabPanel>
            </TabContext>
        </Box>
    )

}

export default MuiTabs;