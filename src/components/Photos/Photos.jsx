import { useEffect, useState } from "react";
import PhotoForm from  './PhotoForm';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseInit";
import PhotoCard from "./PhotoCard";
import {TiArrowBackOutline} from 'react-icons/ti'
import { useNavigate } from "react-router-dom";
import PhotoPopupCard from "./PhotoPopupCard";
export default function Photos(props){
    const album = props.album;
    const user = props.user;
    const [isFormVisible,setFormVisible] = useState(false);
    const [photoArray, setPhotoArray] = useState([]);
    const [popup,setPopup] = useState(false);
    const [photo,setPhoto] = useState({});

    const handleNext = ()=>{
        const photoIndex = photoArray.findIndex((ph)=>ph.id === photo.id);
        if(photoIndex === photoArray.length-1){
            setPhoto(photoArray[0]);
        }else{
            setPhoto(photoArray[photoIndex+1]);
        }
    }

    const handlePrev = ()=>{
        const photoIndex = photoArray.findIndex((ph)=>ph.id === photo.id);
        if(photoIndex === 0){
            setPhoto(photoArray[photoArray.length-1]);
        }else{
            setPhoto(photoArray[photoIndex-1]);
        }
    }


    const navigate = useNavigate()

    const togglePopup = ()=>{
        setPopup(prevState=>!prevState);
    }

    const setPhotoData = (photo)=>{
        setPhoto(photo);
        togglePopup();
    }

    const toggleForm = ()=>{
        setFormVisible(prevState=>!prevState)
    }

    const getPhotos = async()=>{
        if(!album.id){
            const q = query(collection(db,"photos"));
            onSnapshot(q,(querySnapshot)=>{
                const photos = querySnapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setPhotoArray(photos);
            })
            return;
        }
        const q =  query(collection(db,"photos"),where("album","==",album.id ));
        onSnapshot(q,(querySnapshot)=>{
            const photos = querySnapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }));
            setPhotoArray(photos);
        })
    }

    useEffect(()=>{
        getPhotos();
        console.log(photoArray);
    },[]);

    let elements = photoArray.map((photo)=><PhotoCard photo = {photo} setPhoto={setPhoto} togglePopup = {togglePopup}/>)

    return(
        <>    
        { (user.id)?
        <div className="Photos">
             <header>
                <div style={{display:"flex"}}>
                    <div className="back" onClick={()=>navigate('/albums')}>
                        {<TiArrowBackOutline/>}
                    </div>
                    <h3>{album.id?`${album.albumName}'s Photos`:"Your Photos"}</h3>
                </div>
                <div className="add-btns">
                    <button onClick={toggleForm}>{(!isFormVisible)?"Add Photos":"Cancel"}</button>
                </div>
            </header>
            {isFormVisible && <PhotoForm album = {album} toggleForm={toggleForm}/>}
            <div className="photo--container" id="photos">
                {elements}
            </div>
            {popup && <PhotoPopupCard togglePopup={togglePopup} photo={photo} handleNext={handleNext} handlePrev={handlePrev}/>}
        </div>:<div className="Photos">
            <div className="no--user">
                <h1 style={{color:'white'}}>Please Login to view your photos</h1>
            </div>
        </div>}
        </>
    )
}