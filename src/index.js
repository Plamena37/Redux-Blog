import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPosts } from "./features/posts/postsSlice";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
