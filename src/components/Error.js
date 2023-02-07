import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  return (
    <section className="error">
      <div className="error__heading layout__container">
        <h2>Something went wrong</h2>
        <ErrorOutlineIcon className="error__heading--icon" />
      </div>
      <p className="error__message">
        Go to{" "}
        <Link to={"/"} className="error__message__link">
          Home
        </Link>
      </p>
    </section>
  );
};

export default Error;
