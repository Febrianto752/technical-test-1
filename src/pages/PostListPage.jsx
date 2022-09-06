import Navbar from "../components/Navbar";
import Select from "react-select";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPost,
  getStatus,
  getErrorMessage,
} from "../redux/slices/postsSlice";

import PostList from "../components/PostList";

const PostListPage = () => {
  const postsStatus = useSelector(getStatus);
  let posts = useSelector(selectAllPost);
  const postsErrorMessage = useSelector(getErrorMessage);

  const [author, setAuthor] = useState("");

  const options = [
    { value: 1, label: "Jhoin" },
    { value: 2, label: "Fberin" },
    { value: 3, label: "leo" },
  ];

  let renderedPostList = null;
  if (postsStatus === "pending") {
    renderedPostList = <div>Loading...</div>;
  } else if (postsStatus === "succeded") {
    renderedPostList = <PostList posts={posts} />;
  } else if (postsStatus === "failed") {
    renderedPostList = <div>{postsErrorMessage}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2 className="text-center mb-5">Post List</h2>
        <div className="row justify-content-between">
          <div className="col-12 col-sm-4">
            <button className="btn btn-success d-flex align-items-center">
              <IoIosAddCircle
                style={{ transform: "scale(1.2)" }}
                className="me-2"
              />
              New Post
            </button>
          </div>
          <div className="col-12 col-sm-5 col-lg-3 d-flex justify-content-md-end mt-3 mt-sm-0 align-items-center">
            {/* <span>Filter Post By Author : &nbsp;</span> */}
            <Select
              className="w-100"
              options={options}
              value={author}
              onChange={(selectedOptionValue) => setAuthor(selectedOptionValue)}
              placeholder="filter posts by author..."
            />
          </div>
        </div>
        <hr />
        <main>{renderedPostList}</main>
      </div>
    </>
  );
};

export default PostListPage;
