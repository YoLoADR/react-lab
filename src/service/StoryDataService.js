import http from "../http-common";

const getAll = () => {
  return http.get("/user-story");
};

const get = id => {
  return http.get(`/user-story/${id}`);
};

const create = data => {
  return http.post("/user-story", data);
};

const update = (id, data) => {
  console.log("update data", data);
  console.log("update id", id);
  return http.patch(`/user-story/${id}`, data);
};

const remove = id => {
  return http.delete(`/user-story/${id}`);
};

const removeAll = () => {
  return http.delete(`/user-story`);
};

const findByTitle = title => {
  return http.get(`/user-story?title=${title}`);
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