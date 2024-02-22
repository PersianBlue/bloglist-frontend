import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    if (!url.startsWith("https")) {
      setUrl("https://".concat(url));
    }
    const blogDetails = { url, title, author };
    createBlog(blogDetails);
    setUrl("");
    setTitle("");
    setAuthor("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title{" "}
          <input
            type="text"
            name="Title"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />{" "}
        </div>
        <div>
          Author{" "}
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author"
          />
        </div>
        <div>
          Url{" "}
          <input
            type="text"
            className="urlField"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Url"
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
export default BlogForm;
