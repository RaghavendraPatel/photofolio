import { Link } from "react-router-dom"
import { deleteDoc, doc, query, collection, where, onSnapshot,getDocs} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";
export default function AlbumCard(props){
    const album = props.album.album;
    console.log('album',album)
    
    const handleEdit = ()=>{
        props.setEditAlbum(album);
        props.setEditForm(true);
        props.setFormVisible(true);
    }
    const handleDelete = async()=>{
        const albumRef = doc(db,"albums",album.id);
        await deleteDoc(albumRef);
        const q = query(collection(db,"photos"),where("album","==",album.id ));
        const querySnapshot = await getDocs(q);
        const photos = querySnapshot.docs;
        
        photos.forEach((doc)=>{
            deleteDoc(doc.ref);
        })

        toast.success("Album deleted successfully.");
    }

    return(
        <div className="card--container">
            <Link to={`/photos`}>
                <div className="AlbumCard" onClick={()=>{props.album.setAlbum({id:album.id,albumName:album.albumName})}}>
                    <img src={album.albumCover} alt="" />
                    <p>{album.albumName}</p>
                </div>
            </Link>
            <div className="album--btns">
                <div className="album--edit" onClick={handleEdit}>
                    Edit
                </div>
                <div className="album--delete"onClick={handleDelete}>
                    Delete
                </div>
            </div>
        </div>

    )
}