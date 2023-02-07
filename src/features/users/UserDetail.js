import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
import Person4Icon from "@mui/icons-material/Person4";
import "./UserDetail.scss";

const UserDetail = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id} className="user__post__link">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section className="layout__container section__user">
      <div className="section__user__heading">
        <h2>{user?.name}</h2>
        <Person4Icon className="section__user__heading--icon" />
      </div>
      <ol className="user__post">{postTitles}</ol>
    </section>
  );
};

export default UserDetail;
