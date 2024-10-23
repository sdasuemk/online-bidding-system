import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doSignOut } from "../services/services";
import { signOutUserSuccess } from "../redux/slices/userSlice";
import "./header.css";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const onSignOut = async () => {
    try {
      const { data } = await doSignOut();

      dispatch(signOutUserSuccess(data));
      nevigate("/sign-in");
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      // setLoading(false);
    }
  };
  const handleSignOut = () => {
    onSignOut();
  };

  console.log("currentUser", currentUser);

  return (
    <header className="header">
      <div className="header-content">
        {/* <Link to="/"> */}
        <h1 className="header-title">
          <span className="" style={{ color: "slategray" }}>
            Online
          </span>
          <span className="" style={{ color: "slateblue" }}>
            Bidding
          </span>
        </h1>
        {/*  </Link> */}
        <ul className="nav-links">
          <Link to="/">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/create-listing">
            <li className="nav-item">Auction Management</li>
          </Link>
          <Link
            to={currentUser ? "/" : "/sign-in"}
            onClick={currentUser ? handleSignOut : undefined}
          >
            <li className="nav-item">{currentUser ? "Sign out" : "Sign in"}</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
