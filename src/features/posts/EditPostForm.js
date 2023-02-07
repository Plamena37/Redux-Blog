import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        enqueueSnackbar("Post was saved!", {
          preventDuplicate: true,
          variant: "success",
        });
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
        enqueueSnackbar(err.message, {
          preventDuplicate: true,
          variant: "error",
        });
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      enqueueSnackbar("Post was deleted!", {
        preventDuplicate: true,
        variant: "success",
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
      enqueueSnackbar(err.message, {
        preventDuplicate: true,
        variant: "error",
      });
    } finally {
      setRequestStatus("idle");
    }
  };

  const dialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this post? Press "Yes" for further action
          or "No" to go back.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={onDeletePostClicked} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ThemeProvider theme={theme}>
      <section className="layout__container form__section">
        <div className="form__section__heading">
          <h2>Edit Post</h2>
          <AutoFixHighIcon className="form__section__heading--icon" />
        </div>
        <form className="form">
          <TextField
            id="postTitle"
            name="postTitle"
            type="text"
            label="Post Title"
            value={title}
            onChange={onTitleChanged}
            // variant="standard"
            InputLabelProps={{
              shrink: true,
              style: {
                color: "#009e8b",
                fontSize: "1.2rem",
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
              shrink: true,
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
              shrink: true,
              style: {
                color: "#009e8b",
                fontSize: "1.2rem",
              },
            }}
          />
          <div className="btn__container">
            <button
              type="button"
              className="btn btn--save"
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
              Save Post
            </button>
            <button
              className="btn btn--delete"
              type="button"
              onClick={handleClickOpen}
            >
              Delete Post
            </button>
            {dialog}
          </div>
        </form>
      </section>
    </ThemeProvider>
  );
};

export default EditPostForm;
