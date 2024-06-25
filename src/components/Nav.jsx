import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/product">Product</NavLink>
      </li>
    </ul>
  );
}

export default Nav;
