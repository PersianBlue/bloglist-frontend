import { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, handleLikes, handleDelete, viewingUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const details = () => {
    return (
      <div>
        <p>Likes: {blog.likes} </p>
        <button onClick={() => handleLikes(blog)}>Like post</button>
        <p>
          Url:{" "}
          <a href={blog.url} target={"_blank"} rel="nooopener noreferrer">
            {blog.url}
          </a>
        </p>
        <p>User: {blog.user.name}</p>

        {viewingUser.name == blog.user.name ? (
          <button onClick={() => handleDelete(blog)}>Remove blog</button>
        ) : (
          ""
        )}
      </div>
    );
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {"by"} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}{" "}
      </button>
      {showDetails ? details() : ""}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  viewingUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
