import React, { useState, useEffect, useContext } from "react";
import StoryDataService from "../service/StoryDataService";
import { Link } from "react-router-dom";
import { StoryContext } from '../context/story-context';

const StoriesList = () => {
  const [state, dispatch] = useContext(StoryContext);
  const [currentStory, setCurrentStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveStories();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveStories = () => {
    
    StoryDataService.getAll()
      .then(response => {
        dispatch({
          type: 'FETCH_STORIES',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
        console.log("FETCH_STORIES", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveStories();
    setCurrentStory(null);
    setCurrentIndex(-1);
  };

  const setActiveStory = (story, index) => {
    setCurrentStory(story);
    setCurrentIndex(index);
  };

  const removeAllStories = () => {
    StoryDataService.removeAll()
      .then(response => {
        dispatch({
          type: 'DELETE_STORIES'
        });
        console.log('DELETE_STORIES', response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    StoryDataService.findByTitle(searchTitle)
      .then(response => {
        dispatch({
          type: 'FETCH_STORIES',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
        console.log('FETCH_STORIES', response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Stories List</h4>

        <ul className="list-group">
          {state.stories &&
            state.stories.map((story, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveStory(story, index)}
                key={index}
              >
                {story.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllStories}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentStory ? (
          <div>
            <h4>Story</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentStory.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentStory.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentStory.completed ? "Published" : "Pending"}
            </div>
            {/* Si vous cliquez sur le bouton Modifier d'un didacticiel, l'application vous dirigera vers la page du didacticiel. 
            Nous utilisons React Router Link pour accéder à cette page avec url: / stories /: id. */}
            <Link
              to={"/stories/" + currentStory._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Story...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesList;