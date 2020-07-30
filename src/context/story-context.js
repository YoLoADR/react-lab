import React, { useReducer, createContext } from 'react';

export const StoryContext = createContext();

const initialState = {
  stories: []
};

function reducer (state, action) {
    switch (action.type) {
        case 'FETCH_STORIES': {
          return {
            ...state,
            stories: action.payload,
          };
        }
        case 'CREATE_STORIES': {
          return {
            ...state,
            stories: [...state.stories, action.payload]
          };
        }
        case 'FETCH_STORY': {
            return {
              ...state,
              stories: action.payload,
            };
          }
        case 'UPDATE_STORY': {
            const story = action.payload;
            return {
                ...state,
                stories: state.stories.map(item =>
                item._id === story._id ? story : item,
                ),
            };
        }
        case 'DELETE_STORY': {
            const { _id } = action.payload;
            return {
              ...state,
              stories: state.stories.filter(item => item._id !== _id)
            }
          }
        default: return state;
    }
}

export const StoryContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <StoryContext.Provider value={[state, dispatch]}>
      {children}
    </StoryContext.Provider>
  );
};