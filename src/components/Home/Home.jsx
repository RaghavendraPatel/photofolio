import axios from "axios";
import React, {useState,useEffect} from "react";
import UnsplashAPI from "../../UnsplashApi";
import "./home.css";
import {BiSearchAlt} from "react-icons/bi"
import ImageCard from "./ImageCard";

export default function Home(props){

    const [heroImage,setHeroImage] = useState("");
    const [imgData,setImgData] = useState([]);
    const [homeImgData,setHomeImgData] = useState([]);
    const [searchWord,setSearchWord] = useState("");
    const clientId = UnsplashAPI.API.clientId;
    const APIurl = UnsplashAPI.API.url;
    const url =`${APIurl}search/photos?per_page=30&query=${searchWord}&client_id=${clientId}`;
    
    // Fetch
    useEffect(()=>{
        const url = `${APIurl}/photos/random?collections=11649432&orientation=landscape&client_id=${clientId}`
        console.log(url)
        axios.get(url)
            .then((data) => {
                setHeroImage(data.data.urls.raw)
            });
        const defaultURL =`${APIurl}/photos?per_page=30&order_by=popular&client_id=${clientId}`
        axios.get(defaultURL)
            .then((data) =>{
                setHomeImgData(data.data)
            })
    },[]);

    const handleChange = (event)=>{
        setSearchWord(event.target.value)
        if(event.target.value===""){
            setImgData([])
        }
    }
    const handleKeyPress = (event)=>{
        if (event.key === 'Enter' || event.key === 'NumpadEnter')
            document.getElementById("submit").click();  
    }
    const handleSubmit = ()=>{
        axios.get(url)
            .then((data) => {
                setImgData(data.data.results)
            });
    }

    const elements = imgData.map( (result,idx) => <ImageCard result = {result} user={props.user} key={idx}/>)
    const defaultElements = homeImgData.map((result,idx) => <ImageCard result = {result} user={props.user} key ={idx}/>)
    
    return(
        <div className="Home">
            <div className ="carosoll">
                <h1><b>Welcome, {props.user.id?props.user.name:"Guest"}</b></h1>
                <img src = {heroImage} className="hero--img"/>
                <div className = "search">
                    <input type = "text" onChange={handleChange} onKeyPress={handleKeyPress} name="search" placeholder="Search" value = {searchWord}/>
                    <div onClick={handleSubmit} id = "submit" type = "submit" className="search--btn">{<BiSearchAlt />}</div>
                </div>
            </div>
            <section id = "photos">
                {imgData.length === 0 && defaultElements}
                {elements}
            </section>
        </div>
    )
}