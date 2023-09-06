import { BsDownload } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { db } from "../../firebaseInit";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
export default function PhotoCard(props){
    console.log('first',props)
    const photo = props.photo;
    const handleClick = ()=>{
        props.setPhoto(photo);
        props.togglePopup();
    }
    const handleDelete = async() => {
        console.log('delete');
        const photoRef = doc(db, "photos", props.photo.id);
        await deleteDoc(photoRef);
        props.togglePopup();
        toast.success("Photo deleted successfully.");
    };
    return(
        <div className="img--card" onClick={handleClick}>
        <img
          src={photo.photoUrl}
          className="image"
        />
        <div className="user">
          <div className="hover--btn">
            <button
              className="download"
              style={{ marginBottom: "1rem" }}
              title="Delete"
              onClick={handleDelete}
            >
              {<AiOutlineDelete />}
            </button>
            <button className="download" title="Download">
              {<BsDownload />}
            </button>
          </div>
        </div>
        <div className="popup--footer mobile">            
          <div className="mobile--btns">
            <button
              className="mobile--download"
              style={{ marginRight: "1rem" }}
              onClick={handleDelete}
            >
              {<AiOutlineDelete />}
            </button>
            <button className="mobile--download" >
              {<BsDownload />}
            </button>
          </div>
        </div>
      </div>
    )
}