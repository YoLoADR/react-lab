import React, { useState } from "react";
import StoryDataService from "../service/StoryDataService";

const AddStory = () => {
  const initialStoryState = {
    id: null,
    title: "",
    description: "",
    completed: false
  };
  const [story, setStory] = useState(initialStoryState);
  const [submitted, setSubmitted] = useState(false);

  // Fonction pour suivre les valeurs de l'entrée et définir cet état pour les modifications.
  const handleInputChange = event => {
    const { name, value } = event.target;
    setStory({ ...story, [name]: value });
  };

  const saveStory = () => {
    var data = {
      title: story.title,
      description: story.description
    };
    //fonction pour obtenir l'état du tutoriel et envoyer la requête POST à ​​l'API Web
    StoryDataService.create(data)
      .then(response => {
        setStory({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          completed: response.data.completed
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newStory = () => {
    setStory(initialStoryState);
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