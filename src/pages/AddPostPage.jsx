import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUser } from "../redux/slices/usersSlice";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { addPosts } from "../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectAllUser)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const options = users.map((user) => ({ value: user.id, label: user.name }));
  const [author, setAuthor] = useState({ value: "", label: "" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let canSave = [title, author.value, content].every(Boolean);

  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      document.querySelector(".loading").classList.remove("visually-hidden");
      await dispatch(
        addPosts({ title, body: content, userId: Number(author.value) })
      );
      document.querySelector(".loading").classList.add("visually-hidden");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="my-3 text-center">Create New Post</h2>
        <form onSubmit={onSubmitForm}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="post title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <CreatableSelect
              isClearable
              defaultValue={"2"}
              options={options}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setAuthor(selectedOption);
                } else {
                  setAuthor({ value: "", label: "" });
                }
              }}
              placeholder="choose author..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <input
              type="text"
              className="form-control"
              id="content"
              aria-describedby="emailHelp"
              value={content}
              placeholder="your content post..."
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success" disabled={!canSave}>
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPostPage;
