export const getListStart = () => ({
  type: "LIST_START",
});

export const getListSuccess = (list) => ({
  type: "LIST_SUCCESS",
  payload: list,
});

export const getListFailure = () => ({
  type: "LIST_FAILURE",
});

export const deleteListStart = () => ({
  type: "LIST_DELETE_START",
});

export const deleteListSuccess = (id) => ({
  type: "LIST_DELETE_SUCCESS",
  payload: id,
});

export const deleteListFailure = () => ({
  type: "LIST_DELETE_FAILURE",
});

export const createListStart = () => ({
  type: "CREATE_LIST_START",
});

export const createListSuccess = (list) => ({
  type: "CREATE_LIST_SUCCESS",
  payload: list,
});

export const createListFailure = () => ({
  type: "CREATE_LIST_FAILURE",
});

// export const updateMovieStart = () => ({
//   type: "UPDATE_MOVIE_START",
// });

// export const updateMovieSuccess = (movie) => ({
//   type: "UPDATE_MOVIE_SUCCESS",
//   payload: movie,
// });

// export const updateMovieFailure = () => ({
//   type: "UPDATE_MOVIE_FAILURE",
// });
