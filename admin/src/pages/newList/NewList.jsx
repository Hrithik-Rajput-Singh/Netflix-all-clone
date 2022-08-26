import { useState, useContext } from "react";
import "./newList.css";
import { getMovie } from "../../context/movieContext/movieApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { useEffect } from "react";
import { createList } from "../../context/listContext/ListApiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const [list, setList] = useState({});
  const history = useHistory();
  useEffect(() => {
    getMovie(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    const d = e.target.selectedOptions;
    //to correct html
    let value = Array.from(d, (option) => option.value); // if you will log d you will get html element so to get option we do these
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="POPULAR MOVIE"
            name="title"
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
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Content</label>
          <select
            multiple
            name="content"
            onChange={handleSelect}
            style={{ height: "220px" }}
          >
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
