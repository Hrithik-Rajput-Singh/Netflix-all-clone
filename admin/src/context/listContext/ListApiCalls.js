import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListFailure,
  getListStart,
  getListSuccess,
} from "./ListAction";

export const getList = async (dispatch) => {
  dispatch(getListStart());
  try {
    const respo = await axios.get("/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(getListSuccess(respo.data));
  } catch (err) {
    dispatch(getListFailure());
  }
};

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const respo = await axios.post("/lists/", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
    dispatch(createListSuccess(respo.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

// export const updateMovie = async (id, item, dispatch) => {
//   dispatch(createMovieStart());
//   try {
//     const respo = await axios.put("/movies/" + id, item, {
//       headers: {
//         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//       },
//     });
//     //+ JSON.parse(localStorage.getItem("user")).accessToken        we are taking JWT ACCESS KEY direct from local storage
//     dispatch(createMovieSuccess(respo.data));
//   } catch (err) {
//     dispatch(createMovieFailure());
//   }
// };
