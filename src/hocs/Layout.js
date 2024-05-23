import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "../components/navigations/NavBar.js";
import { Footer } from "../components/navigations/Footer.js";

const Layout = (props) => {
  return (
    <div className="bg-muted/40">
      <NavBar />
      <ToastContainer autoClose={2000} position="top-center" />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
