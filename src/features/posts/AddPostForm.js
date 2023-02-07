import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import "./PostForms.scss";

const theme = createTheme({
  palette: {
    primary: {
      // light: "#009e8b",
      main: "#009e8b",
      // dark: "#009e8b",
    },
  },
});

const AddPostForm = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        enqueueSnackbar("Post published!", {
          preventDuplicate: true,
          variant: "success",
        });
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
        enqueueSnackbar(err.message, {
          preventDuplicate: true,
          variant: "error",
        });
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  // const usersOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ));

  return (
    <ThemeProvider theme={theme}>
      <section className="layout__container form__section">
        <div className="form__section__heading">
          <h2>Add a New Post</h2>
          <PostAddIcon className="form__section__heading--icon" />
        </div>

        <form className="form">
          <TextField
            type="text"
            id="postTitle"
            name="postTitle"
            label="Post Title"
            value={title}
            onChange={onTitleChanged}
            // variant="filled"
            InputLabelProps={{
              style: {
                color: "#009e8b",
              },
            }}
          />

          <TextField
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
            select
            label="Author"
            // variant="filled"
            InputLabelProps={{
              style: {
                color: "#009e8b",
                fontSize: "1.2rem",
              },
            }}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            label="Content"
            multiline
            rows={4}
            // variant="standard"
            InputLabelProps={{
              style: {
                color: "#009e8b",
                fontSize: "1.2rem",
              },
            }}
          />

          <button
            className="btn btn--save"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
        </form>
      </section>
    </ThemeProvider>
  );
};
export default AddPostForm;
