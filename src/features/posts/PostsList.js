import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  // const effectRan = useRef(false);

  const orderedPostIds = useSelector(selectPostIds);
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
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={500} height={250} />
        <Skeleton variant="rounded" width={500} height={250} />
        <Skeleton variant="rounded" width={500} height={250} />
      </Stack>
    );
  } else if (postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      {/* <h2>Posts</h2> */}
      {content}
    </section>
  );
};
export default PostsList;
