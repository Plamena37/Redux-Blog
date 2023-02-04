import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./UsersList.scss";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id} className="users__list__link">
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section className="layout__container section__users">
      <div className="section__users__heading">
        <h2>Users</h2>
        <PeopleAltIcon className="section__users__heading--icon" />
      </div>

      <ul className="users__list">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
