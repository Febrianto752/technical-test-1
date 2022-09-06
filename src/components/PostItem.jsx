const PostItem = (props) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Title : {props.post.title}</h5>
        <p className="card-text">
          <b>Content : </b> {props.post.body}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
