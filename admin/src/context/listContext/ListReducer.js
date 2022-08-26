const ListReducer = (state, action) => {
  switch (action.type) {
    case "LIST_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };

    case "LIST_SUCCESS":
      return {
        lists: action.payload,
        isFetching: false,
        error: false,
      };

    case "LIST_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };

    case "LIST_DELETE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "LIST_DELETE_SUCCESS":
      return {
        lists: state.lists.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        error: false,
      };

    case "LIST_DELETE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "CREATE_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "CREATE_LIST_SUCCESS":
      return {
        lists: [...state.lists, action.Payload],
        isFetching: false,
        error: false,
      };

    case "CREATE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // case "UPDATE_MOVIE_START":
    //   return {
    //     ...state,
    //     isFetching: true,
    //     error: false,
    //   };

    // case "UPDATE_MOVIE_SUCCESS":
    //   return {
    //     movies: state.movies.forEach((element, index) => {
    //       if (element.id === action.payload.id) {
    //         state.movies[index] = action.payload;
    //       }
    //     }),
    //     isFetching: false,
    //     error: false,
    //   };

    // case "UPDATE_MOVIE_FAILURE":
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: true,
    //   };

    default:
      return { ...state };
  }
};

export default ListReducer;
