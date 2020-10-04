


const initialState = {
  user: 1,
  location:"St. Clair Shores",
  scrollIndex:0,
};

// Reducers (Modifies The State And Returns A New State)
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    // Increase Counter
    case 'REDUX_ADD': {
      const key = 5;
      return {
        // State
        ...state,
        // Redux Store
        user: state.user+1,

      }
    }
    case 'REDUX_LOCATION': {
      const key = 5;
      return {
        // State
        ...state,
        // Redux Store
        location: action.locate,

      }
    }
    case 'REDUX_SCROLL': {
      const key = 5;
      return {
        // State
        ...state,
        // Redux Store
        scrollIndex: action.scrolled,

      }
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default counterReducer;
