import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = async (ID, newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const newUrl = baseUrl.concat(`/${ID}`);

  return axios
    .put(newUrl, newBlog, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
const remove = async (ID) => {
  const config = { headers: { Authorization: token } };
  const newUrl = baseUrl.concat(`/${ID}`);

  return axios.delete(newUrl, config).then((response) => {
    return response.data;
  });
};
export default { getAll, create, setToken, update, remove };
