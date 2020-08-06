import http from "../http-common";

const getAll = (token) => {
  return http.get("/user-story", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const get = payload => {
  return http.get(`/user-story/${payload._id}`, {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  });
};


const create = payload => {
  const newStory = { title: payload.title, description: payload.description}
  return http.post("/user-story", newStory , {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  });
};

const update = (payload) => {
  const story = {
    title: payload.title,
    description: payload.description,
    completed: payload.completed,
  }
  return http.patch(`/user-story/${payload._id}`, story, {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  });
};

const remove = payload => {
  return http.delete(`/user-story/${payload._id}`, {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  });
};

const removeAll = token => {
  return http.delete(`/user-story`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const findByTitle = payload => {
  return http.get(`/user-story?title=${payload.title}`, {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  });
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};