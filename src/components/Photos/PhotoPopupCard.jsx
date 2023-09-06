import React, { useEffect } from "react";
import { ImCross } from "react-icons/im";
import { db } from "../../firebaseInit";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const PhotoPopupCard = (props) => {
    let imgWidth = 0;
    let imgHeight = 0;
    useEffect(() => {
        const image = document.createElement('img');
        image.src = props.photo.photoUrl;
        image.onload = () => {
            imgWidth = image.width;
            imgHeight = image.height;
        };
    }, []);
    const handleDelete = async() => {
        console.log('delete');
        const photoRef = doc(db, "photos", props.photo.id);
        await deleteDoc(photoRef);
        props.togglePopup();
        toast.success("Photo deleted successfully.");
    };
    return (
        <div className="popup--card">
            <div className="popup--container">
                <button
                    onClick={() => {
                        props.togglePopup();
                    }}
                    className="popup--close"
                    >
                    <ImCross />
                </button>
                <img
                    src={props.photo.photoUrl}
                    className={imgWidth / imgHeight > 1.3 ? "landscape" : "portrait"}
                />
                <div className="popup--footer">
                    <div className="popup--control">
                        <button className="popup--download" onClick={props.handlePrev}>Prev</button>
                        <button className="popup--download" onClick={props.handleNext}>Next</button>
                    </div>
                    <button
                        className="popup--download"
                        style={{ marginLeft: "auto", marginRight: "1rem" }}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button className="popup--download">
                    Download
                    </button>
                </div>
            </div>
        </div>
    )
}
export default PhotoPopupCard;