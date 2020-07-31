import React, { useState, useEffect, useContext } from "react";
import StoryDataService from "../service/StoryDataService";
import { StoryContext } from '../context/story-context';

const Story = props => {
  const [state, dispatch] = useContext(StoryContext);
  const [currentStory, setCurrentStory] = useState(state.story);
  const [message, setMessage] = useState("");

  const getStory = _id => {
    StoryDataService.get(_id)
      .then(response => {
        dispatch({
          type: 'FETCH_STORY',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
        console.log('FETCH_STORY', response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStory(props.match.params.id);
  }, [currentStory, props.match.params.id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    // Dispatch without API call
    dispatch({
      type: 'FETCH_STORY',
      payload: { ...state.story, [name]: value }
    });
    console.log('FETCH_STORY');
  };

  const updatePublished = status => {
    var data = {
      title: state.story.title,
      description: state.story.description,
      completed: status
    };

    StoryDataService.update(state.story._id, data)
      .then(response => {
        setCurrentStory({ ...state.story, completed: status });
        dispatch({
          type: 'UPDATE_STORY',
          payload: response.data,
        });
        console.log('UPDATE_STORY', response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateStory = () => {
    
    var data = {
        title: state.story.title,
        description: currentStory.description,
        completed: currentStory.completed
    };

    StoryDataService.update(state.story._id, data)
      .then(response => {
        dispatch({
          type: 'UPDATE_STORY',
          payload: response.data,
        });
        console.log('UPDATE_STORY', response.data);
        setMessage("The story was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteStory = () => {
    StoryDataService.remove(state.story._id)
      .then(response => {
        dispatch({
          type: 'DELETE_STORY',
          payload: response.data,
        });
        console.log('DELETE_STORY', response.data);
        props.history.push("/stories");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
      {state.story ? (
        <div className="edit-form">
          <h4>Story</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={state.story.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={state.story.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {state.story.completed ? "Published" : "Pending"}
            </div>
          </form>

          {state.story.completed ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteStory}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateStory}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Story...</p>
        </div>
      )}
    </div>
  );
};

export default Story;