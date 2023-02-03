import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import "./PostsExcerpt.scss";

let PostsExcerpt = ({ post }) => {
  return (
    <article className="posts__excerpt">
      <h2 className="posts__excerpt__heading">
        {post.title.substring(0, 50)}
        {post.title.length > 60 ? "..." : ""}
      </h2>
      <p className="posts__excerpt__text">{post.body.substring(0, 75)}...</p>
      <p className="posts__excerpt__credit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

PostsExcerpt = React.memo(PostsExcerpt);

export default PostsExcerpt;
