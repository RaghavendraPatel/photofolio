import { useEffect, useRef, useState } from "react"

import {db} from '../../firebaseInit'
import { doc,addDoc,collection, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AlbumForm(props){
    const {user,isEditForm,editAlbum,toggleForm} = props.props;
    //input ref
    const albumNameRef = useRef();
    const albumCoverRef = useRef();
    const albumIcon ="data:image/png;base64,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";

    useEffect(()=>{
        if(isEditForm){
            albumNameRef.current.value = editAlbum.albumName;
            albumCoverRef.current.value = editAlbum.albumCover;
        }
    },[isEditForm,editAlbum])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isEditForm){
            const albumName = albumNameRef.current.value;
            const albumCover = (albumCoverRef.current.value === "") ? albumIcon : albumCoverRef.current.value;
            editAlbumFunc(albumName,albumCover);
            toggleForm();
            toast.success("Album edited successfully.");
        }else{
            const albumName = albumNameRef.current.value;
            const albumCover = (albumCoverRef.current.value === "") ? albumIcon : albumCoverRef.current.value;
            addAlbum(albumName,albumCover,user.id)
            albumNameRef.current.value = "";
            albumCoverRef.current.value = "";
            toggleForm();
            toast.success("Album added successfully.");
        }
    }

    const editAlbumFunc = async(albumName,albumCover)=>{
        const albumRef = doc(db,"albums",editAlbum.id);
        await updateDoc(albumRef,{
            albumName,albumCover
        })
    }


    const addAlbum = async(albumName,albumCover,user)=>{
        await addDoc(collection(db,"albums"),{
            albumName , albumCover, user
        })
        toast.success("Album added successfully.");
    }

    return(
        <div className="Form">
            <h3>{isEditForm?"Edit Album":"Create a new Album"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Album Name" required name="album-name" ref={albumNameRef}/>
                    <input type="text" placeholder="Cover Image" name="cover-image" ref={albumCoverRef}/>
                    <button>
                        {isEditForm?"Edit":"Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}