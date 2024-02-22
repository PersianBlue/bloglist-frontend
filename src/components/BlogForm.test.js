import "@testing-library/jest-dom";
import "./BlogForm.jsx";
import React from "react";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm.jsx";
// import Blog from "./Blog.jsx";

const url = "amazon.com";
const title = "A better way to search";
const author = "Mark Zuckerberg";
const blog = { url, title, author };
const createBlog = jest.fn();
let container;

beforeEach(() => {
  container = render(<BlogForm createBlog={createBlog} />).container;
});

test.only("createBlog called with correct details when new blog created", async () => {
  const user = userEvent.setup();
  const urlField = screen.getByPlaceholderText("Url");
  const titleField = screen.getByPlaceholderText("Title");
  const authorField = screen.getByPlaceholderText("Author");
  await user.type(titleField, title);
  await user.type(urlField, url);
  await user.type(authorField, author);
  const submitButton = screen.getByText("Create blog");
  await user.click(submitButton);
  //mock.calls returns an array of arrays, each containing an element. In this case the element passed on is a blogDetails object.
  //[ [{url: url, author: author, title: title}]]
  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls[0][0].author).toBe(author);
  expect(createBlog.mock.calls[0][0].url).toBe(url);
  expect(createBlog.mock.calls[0][0].title).toBe(title);
});
/*
5.16: Blog List Tests, step 4
Make a test for the new blog form. The test should check, that the form calls the 
event handler it received as props with the right details when a new blog is created.
//have the user input a given url, title and author into the input fields
//check that createBlog is called with the same url title and author
*/
