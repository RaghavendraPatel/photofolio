import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react"
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";

export default function PhotoForm(props){
    const album = props.album;
    console.log(album)
    const photoNameRef = useRef();
    const photoUrlRef = useRef();
    const handleSubmit = (event)=>{
        event.preventDefault();
        const photoName = photoNameRef.current.value;
        const photoUrl = photoUrlRef.current.value;

        addPhoto(photoName,photoUrl);
        photoNameRef.current.value = "";
        photoUrlRef.current.value = "";
        props.toggleForm();
        toast.success("Photo added successfully.");
    }

    const addPhoto = async(photoName,photoUrl)=>{
        await addDoc(collection(db,"photos"),{
            photoName,photoUrl,album:album.id
        })
    }
    
    return(
        <div className="Form">
            <h3>Add photo to {`${album.albumName}`}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Photo Name" required name="photo-name" ref={photoNameRef}/>
                    <input type="text" placeholder="Photo URL" name="photo-url" ref={photoUrlRef}/>
                    <button>Add Photo</button>
                </div>
            </form>
        </div>
    )
}