import { useState } from "react";
import PostItem from "./PostItem";

const PostList = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div className="row">
      {posts.map((post) => {
        return (
          <div key={post.id} className="col-12 col-sm-6 col-lg-4 mb-3">
            <PostItem post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
