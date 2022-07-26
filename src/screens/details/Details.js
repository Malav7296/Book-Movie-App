import React, { Component, useState ,useEffect } from 'react';
import Header from '../../common/header/Header';
import { Typography , ImageList , ImageListItem , ImageListItemBar } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import YouTube from 'react-youtube'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './Details.css'


const Details = (props) =>{

    const [movie,setMovie] = useState({
        genres: [],
        trailer_url: "",
        artists: []
    })

    const [starIcons , setstarIcons] = useState([{
        id: 1,
        stateId: "star1",
        color: "black"
    },
    {
        id: 2,
        stateId: "star2",
        color: "black"
    },
    {
        id: 3,
        stateId: "star3",
        color: "black"
    },
    {
        id: 4,
        stateId: "star4",
        color: "black"
    },
    {
        id: 5,
        stateId: "star5",
        color: "black"
    }])


    const opts = {
        height: '300',
        width: '700',
        playerVars: {
            autoplay: 1
        }
    }

    const starClickHandler = (id) => {
        let starIconList = [];
        for (let star of starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        };

        setstarIcons(starIconList)
    }

    const artistClickHandler = (url) => {
        window.location = url;
    }

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    

    useEffect(()=>{
        getMovieDetails()
    },[])

    const {id} = useParams()

    async function getMovieDetails(){
        try {
        
            const rawResponse = await fetch(props.baseUrl + "movies/" + id,{
                method:"GET",
                headers:{
                    "Accept" : "application/json;charset=UTF-8",
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            })
    
            const result = await rawResponse.json()
            
            
            if(rawResponse.ok){
                setMovie(result)
            }else{
                const error = new Error();
                error.message = result.message || "Something went wrong"
            }
            
        } catch (error) {
            alert(`Error: ${error.message}`)
            
        }

    }


    return(

        
        <div className="details" style={{textAlign: 'left'}}>
            <Header showBookShowButton ={true} ></Header>
            <div className="back">
                <Typography>
                    <Link to="/">  &#60; Back to Home</Link>
                </Typography>
            </div>

            <div className="flex-containerDetails" style={{display: 'flex'}}>
                <div className="leftDetails">
                    <img src={movie.poster_url} alt={movie.title} />
                </div>

                <div className="middleDetails">
                    <div>
                        <Typography variant="h4" component="h2">{movie.title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {movie.genres.join(', ')}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {movie.duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {movie.critics_rating}  </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        
                        <YouTube
                            videoId={movie.trailer_url.split("?v=")[1]}
                            opts={opts}
                            onReady={_onReady}       
                        />
                    </div>
                </div>

                <div className="rightDetails">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    {starIcons.map(star => (
                        <StarBorderIcon
                            className={star.color}
                            key={"star" + star.id}
                            onClick={() => starClickHandler(star.id)}
                        />
                    ))}

                    <div className="bold marginBottom16 marginTop16">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <ImageList rowHeight={160} cols={2}>
                            {movie.artists != null && movie.artists.map(artist => (
                                <ImageListItem
                                    className="gridTile"
                                    onClick={() => artistClickHandler(artist.wiki_url)}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <ImageListItemBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>

            </div>

            
        </div>    
    )
}

export default Details;