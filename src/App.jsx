import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
const LoggedInUserKey = "loggedInUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in:", username, password);
    const credentials = { username, password };
    try {
      const user = await loginService.login(credentials);
      console.log(user);
      window.localStorage.setItem(LoggedInUserKey, JSON.stringify(user));
      setUser(user);
      console.log("logged in successfully");
      setNotificationType("alert");
      setNotificationMsg(`Login successful!`);
      removeNotification();
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setNotificationType("error");
      setNotificationMsg(`Incorrect Username or Password. Please try again.`);
      removeNotification();
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem(LoggedInUserKey);
    setNotificationType("alert");
    setNotificationMsg(`User ${user.name} logged out`);
    removeNotification();
    setUser(null);
  };

  const createBlog = async (blogDetails) => {
    blogRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(blogDetails);
      console.log(returnedBlog);
      console.log("Blog posted successfully");
      setNotificationType("alert");
      setNotificationMsg(
        `Added new blog: ${blogDetails.title} by ${blogDetails.author}`
      );
      removeNotification();
    } catch (error) {
      console.log(error);
      setNotificationType("error");
      setNotificationMsg(`Unable to create new blog`);
      removeNotification();
    }
  };

  const handleLikes = async (blog) => {
    try {
      console.log("liking this post");
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      //Replace the old blog with the new blog on the frontend
      console.log(returnedBlog);
      const updatedBlogs = blogs.map((b) =>
        b.id === returnedBlog.id ? returnedBlog : b
      );
      setBlogs(updatedBlogs);
      console.log("Updated likes successfully");
      setNotificationType("alert");
      setNotificationMsg(
        `You liked ${updatedBlog.title} by ${updatedBlog.author}`
      );
      removeNotification();
    } catch (error) {
      console.log(error);
      setNotificationType("error");
      setNotificationMsg(`Error udpating likes`);
      removeNotification();
    }
  };

  const removeNotification = (timer = 5000) => {
    setTimeout(() => {
      setNotificationMsg("");
    }, timer);
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <Notification message={notificationMsg} type={notificationType} />
        <div>
          Username{" "}
          <input
            type="text"
            name="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };
  if (!user) {
    return loginForm();
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMsg} type={notificationType} />

      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
      ))}

      <div>
        <Togglable buttonLabel="Create a Blog" ref={blogRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
