import React, { useState, useEffect} from "react";
import { BsDownload, BsPlus } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { db } from "../../firebaseInit";
import { addDoc } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function ImageCard(props) {
  const Navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [albumPopup, setAlbumPopup] = useState(false);
  const [albumArray, setAlbumArray] = useState([]);
  const imgWidth = props.result.width;
  const imgHeight = props.result.height;
  let albumList;
  const [albumsList, setAlbumsList] = useState([]);

  const download = () => {
    const link = document.createElement("a");
    link.href = props.result.links.download;
    link.download = props.result.user.first_name;
    link.target = "_blank";
    link.click();
  };

  const getAlbum = async () => {
    const albumSnapshot = await getDocs(collection(db, "albums"));
    const albums = albumSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlbumArray(albums);
  };

  const addToAlbum = async (id) => {
    await addDoc(collection(db, "photos"), {
      photoName: props.result.user.username,
      photoUrl: props.result.urls.full,
      album: id,
    });
    toast.success("Photo added successfully");
    setAlbumPopup(false);
  };

  const displayAlbums = () => {
    if (albumArray.length > 0) {
      albumList = albumArray.map((album) => (
        <li onClick={() => addToAlbum(album.id)}>{album.albumName}</li>
      ));
      setAlbumsList(albumList);
    }
  };
  const addBtn = () => {
    if (!props.user.id) {
      toast.error("Loggin to add photo to album");
    } else {
      displayAlbums();
      setAlbumPopup(true);
    }
  };

  useEffect(() => {
    if (props.user.id) {
      getAlbum();
    }
  }, [props.user.id]);

  return (
    <>
      <div className={albumPopup ? "popup--small--container" : "popup--hidden"}>
        <div className="popup--small">
          <h3>Add To Album</h3>
          <ul className="popup--albumlist">{(albumsList.length>0)?albumsList:<li onClick={()=>{Navigate('/albums')}}>No Albums found, Create album to add to album</li>}</ul>
          <button
            className="popup--close"
            onClick={() => {
              setAlbumPopup(false);
            }}
          >
            <ImCross />
          </button>
        </div>
      </div>
      <div className={popup ? "popup--card" : "popup--hidden"}>
        <div className="popup--container">
          <div className="popup--header">
            <a
              href={props.result.user.social.portfolio_url}
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <div className="popup--user">
                <img
                  src={props.result.user.profile_image.large}
                  className="user--img"
                />
                <div style={{ paddingTop: "5px" }}>
                  <p className="user--name">{`${props.result.user.first_name} ${
                    props.result.user.last_name === null
                      ? ""
                      : props.result.user.last_name
                  }`}</p>
                  <p className="user--userName">{props.result.user.username}</p>
                </div>
              </div>
            </a>
            <button
              className="popup--close"
              onClick={() => {
                setPopup(false);
              }}
            >
              <ImCross />
            </button>
          </div>
          <img
            src={props.result.urls.full}
            className={imgWidth / imgHeight > 1.3 ? "landscape" : "portrait"}
          />
          {/* <p className='img--desc'>{props.result.description}</p> */}
          <div className="popup--footer">
            <div className="likes">
              <p>Likes</p>
              <p style={{ color: "grey" }}>{props.result.likes}</p>
            </div>
            <div className="downloads">
              <p>Downloads</p>
              <p>--</p>
            </div>
            <button
              className="popup--download"
              style={{ marginLeft: "auto", marginRight: "1rem" }}
              onClick={addBtn}
            >
              Add to album
            </button>
            <button className="popup--download" onClick={download}>
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="img--card">
        <div className="popup--header mobile" style={{ marginTop: "15px" }}>
          <a
            href={props.result.user.social.portfolio_url}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <div className="popup--user">
              <img
                src={props.result.user.profile_image.large}
                className="user--img"
              />
              <div style={{ paddingTop: "5px" }}>
                <p className="user--name">{`${props.result.user.first_name} ${
                  props.result.user.last_name === null
                    ? ""
                    : props.result.user.last_name
                }`}</p>
                <p className="user--userName">{props.result.user.username}</p>
              </div>
            </div>
          </a>
        </div>
        <img
          src={props.result.urls.small}
          key={props.result.id}
          className="image"
          onClick={() => {
            setPopup(true);
          }}
        />
        <div className="user">
          <img
            src={props.result.user.profile_image.large}
            className="user--img"
          />
          <div style={{ paddingTop: "5px" }}>
            <p className="user--name">{`${props.result.user.first_name} ${
              props.result.user.last_name === null
                ? ""
                : props.result.user.last_name
            }`}</p>
            <p className="user--userName">{props.result.user.username}</p>
          </div>
          <div className="hover--btn">
            <button
              className="download"
              onClick={addBtn}
              style={{ marginBottom: "1rem" }}
              title="Add to album"
            >
              {<BsPlus />}
            </button>
            <button className="download" onClick={download} title="Download">
              {<BsDownload />}
            </button>
          </div>
        </div>
        {/* <p className="img--desc">{result.description}</p> */}
        <div className="popup--footer mobile">
          <div className="likes">
            <p>Likes</p>
            <p style={{ color: "grey" }}>{props.result.likes}</p>
          </div>
          <div className="downloads">
            <p>Downloads</p>
            <p>--</p>
          </div>
          <div className="mobile--btns">
            <button
              className="mobile--download"
              onClick={addBtn}
              style={{ marginRight: "1rem" }}
            >
              {<BsPlus />}
            </button>
            <button className="mobile--download" onClick={download}>
              {<BsDownload />}
            </button>
          </div>
          {/* <a href={props.result.links.download} target="_blank"><button className="popup--download" download>Download</button></a> */}
        </div>
      </div>
    </>
  );
}

export default ImageCard;
