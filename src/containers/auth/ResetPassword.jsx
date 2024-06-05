import React, { useEffect, useState } from "react";
// UI
import { Navigate } from "react-router";
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Switch } from "../../components/ui/switch.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Label } from "../../components/ui/label.jsx";
import Layout from "../../hocs/Layout.js";
import { Loader2 } from "lucide-react";
// REDUX
import { connect } from "react-redux";
import { signin } from "../../redux/actions/auth.js";
import { Link } from "react-router-dom";

const debugMode = false;

const ResetPassword = ({ signin, loading, isAuthenticated }) => {
  const [activated, setActivated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { email } = formData;

  // * Actualiza los datos
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // * Actualiza el estado de autentificación
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      setActivated(true);
    }
  }, [isAuthenticated]);

  // * Envia los datos
  const onSubmit = (e) => {
    e.preventDefault();
    console.info("Datos a pasar Sign In", formData);
  };

  // ! Remove on production
  debugMode ? (loading = true) : (loading = false);

  return (
    <Layout>
      <div>reset password form</div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  signin,
})(ResetPassword);
