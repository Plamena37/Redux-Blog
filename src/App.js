import "./index.scss";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserDetail from "./features/users/UserDetail";
import Layout from "./components/Layout";
import PostDetail from "./features/posts/PostDetail";
import Error from "./components/Error";
import { Routes, Route, Navigate } from "react-router-dom";

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

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserDetail />} />
        </Route>

        {/* Catch all*/}
        {/* <Route path="*" element={<Navigate to={"/"} replace />} /> */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
