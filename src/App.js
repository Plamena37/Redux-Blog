import "./index.scss";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

const App = () => {
  return (
    <div>
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default App;
