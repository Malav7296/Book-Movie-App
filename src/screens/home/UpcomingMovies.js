import React, { Component, useEffect, useState } from 'react';
import { ImageList , ImageListItem , ImageListItemBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  });

const UpcomingMovies = (props) => {

    const [movies , setMovies] = useState([]);
    const { classes } = props;

    useEffect(()=>{
        loadUpcomingMovies()
    },[])

    async function loadUpcomingMovies(){
        try {
        
            const rawResponse = await fetch("http://localhost:8085/api/v1/movies?page=1&limit=6&status=PUBLISHED",{
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
        
        <div className='classes.root'>
            <ImageList cols={5} className={classes.gridList}>
                {movies.map(movie => (
                <ImageListItem key={movie.poster_url} className='classes.title'>
                    <img src={movie.poster_url} alt={movie.title}/>
                    <ImageListItemBar
                    title={movie.title}
                    />
                </ImageListItem>
                ))}
            </ImageList>

        </div>
    )
}

UpcomingMovies.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(UpcomingMovies);