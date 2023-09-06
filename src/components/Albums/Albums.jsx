import { useEffect, useState } from "react";
import AlbumForm from "./AlbumForm";
import './album.css'
import { db } from "../../firebaseInit";
import { collection, getDocs, onSnapshot,query} from "firebase/firestore";
import AlbumCard from "./AlbumCard";

export default function Albums(props){
    const user = props.props.user;
    console.log(user)
    const [isFormVisible,setFormVisible] = useState(false);
    const [albumArray,setAlbumArray] = useState([]);
    const [editAlbum,setEditAlbum] = useState({});
    const [isEditForm,setEditForm] = useState(false);

    const toggleForm = ()=>{
        setFormVisible(prevState=>!prevState);
        if(isEditForm){
            setEditForm(false);
            setEditAlbum({});
        }
    }

    const realTimeAlbum = async()=>{
        const q = await query(collection(db,"albums"));
        await onSnapshot(q,(querySnapshot)=>{
            const albums = querySnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }))
            setAlbumArray(albums);
        })
    }

    useEffect(()=>{
        // albums()
        realTimeAlbum()
    },[])

    let elements = albumArray.map((album)=><AlbumCard album = {{album,...props.props}} setEditAlbum={setEditAlbum} setEditForm={setEditForm} setFormVisible={setFormVisible}/>)
    
    return (
        <>
            { user.id?
            <div className="Albums">
                <header>
                    <h2>Your Albums</h2>
                    <div className="add-btns">
                        <button onClick={toggleForm}>{(!isFormVisible)?"Add Album":"Cancel"}</button>
                    </div>
                </header>
                {isFormVisible && <AlbumForm props={{user,isEditForm,editAlbum,toggleForm}} />}
                <div className="album--container">
                    {elements}
                </div>
            </div>:<div className="Albums">
                <div className="no--user">
                    <h1 style={{color:'white'}}>Please Login to view your albums</h1>
                </div>
            </div>}
        </>
    );
}