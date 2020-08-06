import React, { useState, useContext } from "react";
import StoryDataService from "../service/StoryDataService";
import { StoryContext } from '../context/story-context';
import { useAuth0 } from "@auth0/auth0-react";

const AddStory = () => {
  
  const [state, dispatch] = useContext(StoryContext);
  const [story, setStory] = useState(state.story);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();
  // Fonction pour suivre les valeurs de l'entrée et définir cet état pour les modifications.
  const handleInputChange = event => {
    const { name, value } = event.target;
    setStory({ ...story, [name]: value });
  };

  const saveStory = async () => {
    var payload = {
      title: story.title,
      description: story.description,
      token : await getAccessTokenSilently(),
      user
    };

    try {
      const response = await StoryDataService.create(payload)
      dispatch({
        type: 'CREATE_STORIES',
        payload: response.data,
      });
      setStory({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        completed: response.data.completed
      });
      setSubmitted(true);
      const responseData = await response.json();
      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const newStory = () => {
    setStory(state.story);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newStory}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={story.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={story.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          {/* Pour le return, nous vérifions l'état soumis, s'il est vrai, nous montrons le bouton Ajouter pour créer à nouveau un nouveau tutoriel. Sinon, un formulaire avec le bouton Soumettre s'affiche. */}
          <button onClick={saveStory} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStory;