import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { useState, useContext } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateMovie } from "../../context/movieContext/movieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;

  const { dispatch } = useContext(MovieContext);

  const [updatedMovie, setUpdatedMovie] = useState({});
  // const [title, setTitle] = useState(movie.state);
  // const [year, setYear] = useState(movie.year);
  // const [limit, setLimit] = useState(movie.limit);
  // const [genre, setGenre] = useState(movie.genre);
  const [img, setImg] = useState();
  const [trailer, setTrailer] = useState();
  const [video, setVideo] = useState();
  const [progress, setProgress] = useState(0);
  const [successOnUpload, setSuccessOnUpload] = useState(false);

  console.log(updatedMovie);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };

  const uploading = (item, setItem) => {
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
          setUpdatedMovie((prev) => {
            return { ...prev, [item.label]: downloadURL };
          });
        });
      }
    );
  };

  const handleUpdate = (e, value, label) => {
    e.preventDefault();
    const item = { file: value, label: label };
    uploading(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie._id, updatedMovie, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Name</label>
            <input
              type="text"
              placeholder={movie.title}
              name={"title"}
              onChange={(e) => handleChange(e)}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name={"year"}
              onChange={(e) => handleChange(e)}
            />
            <label>limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name={"limit"}
              onChange={(e) => handleChange(e)}
            />
            <label>genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name={"genre"}
              onChange={(e) => handleChange(e)}
            />
            <div className="uploadFiles">
              <label className="label">trailer</label>
              <input
                type="file"
                placeholder={movie.trailer}
                name={trailer}
                onChange={(e) => setTrailer(e.target.files)}
              />
              <button
                className="addProductButton"
                onClick={(e) => {
                  handleUpdate(e, trailer, "trailer");
                }}
              >
                Upload
              </button>
            </div>

            <div className="uploadFiles">
              <label className="label">video</label>
              <input
                type="file"
                placeholder={movie.video}
                name={video}
                onChange={(e) => setVideo(e.target.files)}
              />
              <button
                className="addProductButton"
                onClick={(e) => {
                  handleUpdate(e, video, "video");
                }}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <input
                type="file"
                placeholder={movie.video}
                name={img}
                onChange={(e) => setImg(e.target.files)}
              />
              <button
                className="addProductButton"
                onClick={(e) => {
                  handleUpdate(e, img, "img");
                }}
              >
                Upload
              </button>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>

            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
