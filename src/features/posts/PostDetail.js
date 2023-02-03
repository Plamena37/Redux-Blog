import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import "./PostDetail.scss";

const PostDetail = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className="post__detail">
      <h2 className="posts__heading heading--large">{post.title}</h2>
      <p className="posts__text">{post.body}</p>
      <p className="posts__credit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostDetail;
