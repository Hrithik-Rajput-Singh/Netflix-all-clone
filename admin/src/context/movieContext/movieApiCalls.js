import axios from "axios";
import {
  getMovieStart,
  getMovieSuccess,
  getMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailure,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
} from "./MovieAction";

export const getMovie = async (dispatch) => {
  dispatch(getMovieStart());
  try {
    const respo = await axios.get("/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(getMovieSuccess(respo.data));
  } catch (err) {
    dispatch(getMovieFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete("/movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

export const createMovie = async (item, dispatch) => {
  dispatch(createMovieStart());
  try {
    const respo = await axios.post("/movies/", item, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(createMovieSuccess(respo.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

export const updateMovie = async (id, item, dispatch) => {
  dispatch(createMovieStart());
  try {
    const respo = await axios.put("/movies/" + id, item, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(createMovieSuccess(respo.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};
