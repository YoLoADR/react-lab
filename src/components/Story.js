import React, { useState, useEffect } from "react";
import StoryDataService from "../service/StoryDataService";

const Story = props => {
  const initialStoryState = {
    _id: null,
    title: "",
    description: "",
    completed: false
  };
  const [currentStory, setCurrentStory] = useState(initialStoryState);
  const [message, setMessage] = useState("");

  const getStory = _id => {
    StoryDataService.get(_id)
      .then(response => {
        setCurrentStory(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
      console.log("props.match.params._id", props.match.params._id)
    getStory(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentStory({ ...currentStory, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      title: currentStory.title,
      description: currentStory.description,
      completed: status
    };

    StoryDataService.update(currentStory._id, data)
      .then(response => {
        setCurrentStory({ ...currentStory, completed: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateStory = () => {
    console.log("currentStory", currentStory);
    
    var data = {
        title: currentStory.title,
        // description: currentStory.description,
        // completed: currentStory.completed
    };

    StoryDataService.update(currentStory._id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The story was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteStory = () => {
    StoryDataService.remove(currentStory._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/stories");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentStory ? (
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
                value={currentStory.title}
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
                value={currentStory.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentStory.completed ? "Published" : "Pending"}
            </div>
          </form>

          {currentStory.completed ? (
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