const MovieReducer = (state, action) => {
  switch (action.type) {
    case "MOVIE_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };

    case "MOVIE_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };

    case "MOVIE_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };

    case "DELETE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        error: false,
      };

    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "CREATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "CREATE_MOVIE_SUCCESS":
      return {
        movies: [...state.movies, action.Payload],
        isFetching: false,
        error: false,
      };

    case "CREATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "UPDATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "UPDATE_MOVIE_SUCCESS":
      return {
        movies: state.movies.forEach((element, index) => {
          if (element.id === action.payload.id) {
            state.movies[index] = action.payload;
          }
        }),
        isFetching: false,
        error: false,
      };

    case "UPDATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default MovieReducer;
