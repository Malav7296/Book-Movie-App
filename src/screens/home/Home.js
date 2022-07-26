import { Fragment } from 'react';
import Header from '../../common/header/Header';
import './Home.css'
import { Card, CardContent , FormControl , Typography , InputLabel , Input , Select , MenuItem , Checkbox , ListItemText , TextField , Button} from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import { ImageList , ImageListItem , ImageListItemBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

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
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },  
    formControl: {
        margin: theme.spacing(2),
        minWidth: 240,
        maxWidth: 240
    },
    
  });


const Home = (props) => {
    
    const navigate = useNavigate();
    const { classes } = props;
    const [movies , setMovies] = useState([]);
    const [releasedMovies , setReleasedMovies] = useState([]);
    const [movieName , setMovieName] = useState("")
    const [genres , setGenres ]= useState([])
    const [genresList , setGenresList] = useState([])
    const [artists , setArtists] = useState([])
    const [artistsList , setArtistsList] = useState([])
    const [releaseDateStart , setReleaseDateStart] = useState("")
    const [releaseDateEnd , setReleaseDateEnd] = useState("")

    useEffect(()=>{
        loadUpcomingMovies()
        loadReleasedMovies()
        fetchGenres()
        fetchArtist()
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
                setReleasedMovies(result.movies)
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)
            
        }
    }
    
    const movieNameChangeHandler = (event) => {
        setMovieName(event.target.value);
    }

    const genreSelectHandler = (event) => {
        setGenres(event.target.value);
    }

    const artistSelectHandler = (event) => {
        setArtists(event.target.value);
    }

    const releaseDateStartHandler = (event) => {
        setReleaseDateStart(event.target.value);
    }

    const releaseDateEndHandler = (event) => {
        setReleaseDateEnd(event.target.value);
    }

    const movieClickHandler = (movieId) => {
        navigate('/movie/' + movieId);
    }
    
    async function filterApplyHandler(){
        let queryString = "?status=RELEASED";
        if (movieName !== "") {
            queryString += "&title=" + movieName;
        }
        if (genres.length > 0) {
            queryString += "&genres=" + genres.toString()
        }
        if (artists.length > 0) {
            queryString += "&artists=" + artists.toString()
        }
        if (releaseDateStart !== "") {
            queryString += "&start_date=" + releaseDateStart;
        }
        if (releaseDateEnd !== "") {
            queryString += "&end_date=" + releaseDateEnd;
        }
        
        try {
            
            const rawResponse = await fetch(props.baseUrl + "movies" + encodeURI(queryString),{
                method:"GET",
                headers:{
                    "Accept" : "application/json;charset=UTF-8",
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            })
    
            const result = await rawResponse.json()        
            
            if(rawResponse.ok){
                setReleasedMovies(result.movies)
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)     
        }   
    }


    //fetch Genres
    async function fetchGenres(){
        try {
        
            const rawResponse = await fetch("http://localhost:8085/api/v1/genres",{
                method:"GET",
                headers:{
                    "Accept" : "application/json;charset=UTF-8",
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            })
    
            const result = await rawResponse.json()        
            
            if(rawResponse.ok){
                setGenresList(result.genres)
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)     
        }
    }

    //fetch Artists
    async function fetchArtist(){
        try {
        
            const rawResponse = await fetch("http://localhost:8085/api/v1/artists?page=1",{
                method:"GET",
                headers:{
                    "Accept" : "application/json;charset=UTF-8",
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            })
    
            const result = await rawResponse.json()        
            
            if(rawResponse.ok){
                setArtistsList(result.artists)
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)
            
        }

    }
    

    return <Fragment>
        <Header></Header>
        <h3 className='upcoming-movies-header'>Upcoming movies</h3>
        <div className='classes.root'>
            <ImageList cols={5} className={classes.gridList}>
                {movies.map(movie => (
                <ImageListItem key={movie.poster_url} className='classes.title'>
                    <img src={movie.poster_url} alt={movie.title} />
                    <ImageListItemBar
                    title={movie.title}
                    />
                </ImageListItem>
                ))}
            </ImageList>

        </div>
        <div style={{display:'flex'}}>

            <div style={{width: '76%' , margin: '16px'}}>
                <Fragment>
                    <ImageList rowHeight={350} cols={4} className={classes.gridListMain}>
                        {releasedMovies.map(movie => (
                            <ImageListItem onClick={() => movieClickHandler(movie.id)} key={movie.poster_url} className='classes.title' style={{margin:'15px'}}>
                                <img src={movie.poster_url} alt={movie.title} />
                                <ImageListItemBar
                                    title={movie.title}
                                    subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Fragment>
            </div>

            <div style={{width: '24%' , margin: '16px'}}>
                <Fragment>
                    <Card>
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                                </Typography>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" onChange={movieNameChangeHandler} />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox-genre" />}
                                    renderValue={selected => selected.join(',')}
                                    value={genres}
                                    onChange={genreSelectHandler}
                                >
                                    {genresList.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(',')}
                                    value={artists}
                                    onChange={artistSelectHandler}
                                >
                                    {artistsList.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateStart"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateStartHandler}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateEnd"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateEndHandler}
                                />
                            </FormControl>
                            <br /><br />

                            <FormControl className={classes.formControl}>
                                    <Button onClick={() =>filterApplyHandler()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
                            </FormControl>

                        </CardContent>
                    </Card>
                </Fragment>
            </div>
        </div>
    </Fragment>
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Home);