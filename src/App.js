import "./index.scss";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./components/Layout";
import PostDetail from "./features/posts/PostDetail";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<PostDetail />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
