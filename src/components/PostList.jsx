import PostItem from "./PostItem";

const PostList = (props) => {
  return (
    <div className="row">
      {props.posts.map((post) => {
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
