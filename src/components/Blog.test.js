import "@testing-library/jest-dom";
import "./Blog.jsx";
import React from "react";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog.jsx";

const blog = {
  url: "https://www.google.com",
  author: "Jack the ripper",
  title: "How to kill a mockingbird",
  user: {
    name: "administrator",
  },
  likes: 0,
};
const handleLikes = jest.fn();
const handleDelete = jest.fn();
const viewingUser = { name: "administrator" };

beforeEach(() => {
  const container = render(
    <Blog
      blog={blog}
      handleLikes={handleLikes}
      handleDelete={handleDelete}
      viewingUser={viewingUser}
    />
  ).container;
});
test("blog renders title and author but not url or likes", () => {
  const title = screen.queryByText("How to kill a mockingbird");
  const author = screen.queryByText("Jack the ripper");
  const url = screen.queryByText("https://www.google.com");
  const likes = screen.queryByText("Likes:");
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();

  cleanup();
});

test("blog's url and likes shown when view is clicked", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const url = screen.queryByText("https://www.google.com");
  const likes = screen.queryByText("Likes:");
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
  cleanup();
});

test("likesHandler called twice if button clicked twice", async () => {
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("Like blog");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(handleLikes.mock.calls).toHaveLength(2);
  cleanup();
});
