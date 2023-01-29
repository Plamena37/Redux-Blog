import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const effectRan = useRef(false);
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    // Fix for running useEffect twice
    if (effectRan.current === false) {
      if (postStatus === "idle") {
        dispatch(fetchPosts());
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    {
      /* content = <p>Loading...</p>; */
    }
    content = (
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={500} height={100} />
        <Skeleton variant="rounded" width={500} height={100} />
      </Stack>
    );
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
