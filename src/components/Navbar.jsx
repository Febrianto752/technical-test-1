import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Technical Test
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
