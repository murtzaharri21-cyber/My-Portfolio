import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

export let smoother: any = null;

const Navbar = () => {
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          GM
        </a>
        <a
          href="mailto:murtzaharry21@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          murtzaharry21@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
