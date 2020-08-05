import React, { useState, useEffect, useContext } from "react";
import StoryDataService from "../service/StoryDataService";
import { StoryContext } from '../context/story-context';
import { useAuth0 } from "@auth0/auth0-react";

const Story = props => {
  const [state, dispatch] = useContext(StoryContext);
  const [currentStory, setCurrentStory] = useState(state.story);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const getStory = async (_id) => {
    try {
      const newToken = await getAccessTokenSilently();
      const payload = {
          _id,
          token : newToken
        }
      const response = await StoryDataService.get(payload);
      dispatch({
        type: 'FETCH_STORY',
        payload: response.data.data || response.data, // in case pagination is disabled
      });
      setToken(newToken)
      console.log('FETCH_STORY', response.data);
    } catch (error) {
      setMessage(error.message);
    }
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

  const updatePublished = async (status) => {

    var payload = {
      title: state.story.title,
      description: state.story.description,
      completed: status,
      _id: state.story._id,
      token
  };

    try {
      const response = await StoryDataService.update(payload)
      setCurrentStory({ ...state.story, completed: status });
      dispatch({
        type: 'UPDATE_STORY',
        payload: response.data,
      });
      console.log('UPDATE_STORY', response.data);
      setMessage("The story was updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateStory = async () => {
    
    var payload = {
        title: state.story.title,
        description: state.story.description,
        completed: currentStory.completed,
        _id: state.story._id,
        token
    };

    try {
      const response = await StoryDataService.update(payload)
      dispatch({
        type: 'UPDATE_STORY',
        payload: response.data,
      });
      console.log('UPDATE_STORY', response.data);
      setMessage("The story was updated successfully!");
      props.history.push("/stories");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStory = async () => {
    try {
      const payload = {
          _id : state.story._id,
          token
        }
      const response = await StoryDataService.remove(payload);
      dispatch({
        type: 'DELETE_STORY',
        payload: response.data,
      });
      props.history.push("/stories");
    } catch (error) {
      setMessage(error.message);
    }
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