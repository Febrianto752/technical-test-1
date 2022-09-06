import Navbar from "../components/Navbar";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  selectAllPost,
  getStatus,
  getErrorMessage,
} from "../redux/slices/postsSlice";

import PostList from "../components/PostList";
import { selectAllUser } from "../redux/slices/usersSlice";
import { Link } from "react-router-dom";

const PostListPage = () => {
  const postsStatus = useSelector(getStatus);
  let allPost = useSelector(selectAllPost)
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
  const postsErrorMessage = useSelector(getErrorMessage);
  const users = useSelector(selectAllUser)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const [author, setAuthor] = useState({ value: "", label: "" });
  const [posts, setPosts] = useState(null);
  const options = users.map((user) => ({ value: user.id, label: user.name }));

  let renderedPostList = null;
  if (postsStatus === "pending") {
    renderedPostList = <div>Loading...</div>;
  } else if (postsStatus === "succeded") {
    if (!posts) {
      setPosts(allPost);
      renderedPostList = <PostList posts={allPost} />;
    }

    renderedPostList = <PostList posts={posts} />;
  } else if (postsStatus === "failed") {
    renderedPostList = <div>{postsErrorMessage}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2
          title="all post"
          className="text-center mb-5 mx-auto"
          // style={{ cursor: "pointer", maxWidth: "fit-content" }}
        >
          Post List
        </h2>
        <div className="row justify-content-between">
          <div className="col-12 col-sm-4">
            <Link
              to="/posts/add"
              className="btn btn-success d-inline-flex align-items-center"
            >
              <IoIosAddCircle
                style={{ transform: "scale(1.2)" }}
                className="me-2"
              />
              New Post
            </Link>
          </div>
          <div className="col-12 col-sm-5 col-lg-3 d-flex justify-content-md-end mt-3 mt-sm-0 align-items-center">
            <CreatableSelect
              isClearable
              className="w-100 shadow-sm"
              placeholder="filter posts by author..."
              options={options}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  // console.log(selectedOption); // output : {value: '...', label: '...'}
                  setAuthor(selectedOption);
                  setPosts(
                    allPost.filter(
                      (post) => post.userId === Number(selectedOption.value)
                    )
                  );
                } else {
                  setPosts(allPost);
                  setAuthor({ value: "", label: "" });
                }
              }}
            />
          </div>
        </div>
        <hr />
        <main>
          <div className="mb-3">
            {author.value ? (
              <span>Post list by author : {author.label}</span>
            ) : (
              <span>All Post {author.value}</span>
            )}
          </div>

          {renderedPostList}
        </main>
      </div>
    </>
  );
};

export default PostListPage;
