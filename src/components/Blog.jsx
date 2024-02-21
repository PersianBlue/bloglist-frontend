import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleLikes = (event) => {
    console.log("liking this post");
  };

  const details = () => {
    return (
      <div>
        <p>Likes: {blog.likes} </p>
        <button onClick={(event) => handleLikes(event)}>Like post</button>
        <p>
          Url:{" "}
          <a href={blog.url} target={"_blank"}>
            {blog.url}
          </a>
        </p>
        <p>User: {blog.user.name}</p>
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

export default Blog;
