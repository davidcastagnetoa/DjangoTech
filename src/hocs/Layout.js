import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/navigations/NavBar.js";
import { Footer } from "../components/navigations/Footer.js";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth.js";
import { connect } from "react-redux";

const Layout = (props) => {
  useEffect(() => {
    props.refresh();
    props.check_authenticated();
    props.load_user();
  }, []);

  return (
    <div className="bg-muted/40 ">
      <NavBar />
      <ToastContainer autoClose={2000} position="top-center" />
      {props.children}
      <Footer />
    </div>
  );
};

export default connect(null, {
  check_authenticated,
  load_user,
  refresh,
})(Layout);
