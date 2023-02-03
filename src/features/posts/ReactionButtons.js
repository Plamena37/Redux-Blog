import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";
import CoffeeIcon from "@mui/icons-material/Coffee";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import "./ReactionButtons.scss";

const reactionEmoji = {
  thumbsUp: <RecommendRoundedIcon className="icon" />,
  wow: <SentimentSatisfiedAltRoundedIcon className="icon" />,
  heart: <FavoriteBorderRoundedIcon className="icon" />,
  rocket: <RocketLaunchRoundedIcon className="icon" />,
  coffee: <CoffeeIcon className="icon icon--coffee" />,
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className="icons__container">{reactionButtons}</div>;
};

export default ReactionButtons;
