import { useState, useContext } from "react";
import "./newProduct.css";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createMovie } from "../../context/movieContext/movieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const { dispatch } = useContext(MovieContext);
  let history = useHistory();

  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const uploading = (items) => {
    items.forEach((item) => {
      let filename = new Date().getTime() + item.label + item.file[0].name;
      const storageRef = ref(storage, `/items/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file[0]);

      //setTransfer
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUpload((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploading([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovie(movie, dispatch);
    history.push("/");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Poster Image</label>
          <input
            type="file"
            name="img"
            onChange={(e) => setImg(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>ThumbNail Image</label>
          <input
            type="file"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Write Movie Name"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>description</label>
          <input
            type="text"
            placeholder="write description..."
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="write Genre..."
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Movie Of Year</label>
          <input
            type="text"
            placeholder="write Duration..."
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="age Limit..."
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is series ?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files)}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files)}
          />
        </div>

        {upload === 5 ? (
          <button
            className="addProductButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSubmit}
          >
            Create
          </button>
        ) : progress === 0 ? (
          <>
            <button className="addProductButton" onClick={handleUpload}>
              Upload
            </button>
          </>
        ) : (
          <>
            <h4 style={{ color: progress === 0 ? "black" : "green" }}>
              {`uploadin file ${upload} of 5 ......`} :{progress}
            </h4>
          </>
        )}
      </form>
    </div>
  );
}
