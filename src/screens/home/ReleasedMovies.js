import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { ImageList , ImageListItem , ImageListItemBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Home.css'

const styles = theme => ({
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    }
  });

const ReleasedMovies = (props) => {

    const [movies , setMovies] = useState([]);
    const { classes } = props;

    useEffect(()=>{
        loadReleasedMovies()
    },[])

    async function loadReleasedMovies(){
        try {
        
            const rawResponse = await fetch("http://localhost:8085/api/v1/movies?page=1&status=RELEASED",{
                method:"GET",
                headers:{
                    "Accept" : "application/json;charset=UTF-8",
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            })
    
            const result = await rawResponse.json()        
            
            if(rawResponse.ok){
                setMovies(result.movies)
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)
            
        }
    

    }
    

    return(
        
        <Fragment>
            <ImageList rowHeight={350} cols={4} className={classes.gridListMain}>
                {movies.map(movie => (
                <ImageListItem key={movie.poster_url} className='classes.title' style={{margin:'15px'}}>
                    <img src={movie.poster_url} alt={movie.title}/>
                    <ImageListItemBar
                        title={movie.title}
                        subtitle={`Release Date ${movie.release_date}`}
                    />
                </ImageListItem>
                ))}
            </ImageList>

        </Fragment>
    )
}

ReleasedMovies.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(ReleasedMovies);