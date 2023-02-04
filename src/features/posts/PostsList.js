import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PostsExcerpt from "./PostsExcerpt";
import "./PostsList.scss";

const PostsList = () => {
  // const effectRan = useRef(false);

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  /* useEffect(() => {
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
  */

  let content;
  if (postStatus === "loading") {
    content = (
      <Stack spacing={3}>
        <Skeleton variant="rounded" width={1200} height={250} />
        <Skeleton variant="rounded" width={1200} height={250} />
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

  return <section className="layout__container posts__list">{content}</section>;
};
export default PostsList;
