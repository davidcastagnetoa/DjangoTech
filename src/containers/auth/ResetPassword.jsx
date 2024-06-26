import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// UI
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Label } from "../../components/ui/label.jsx";
import Layout from "../../hocs/Layout.js";
import { Loader2 } from "lucide-react";
// REDUX
import { connect } from "react-redux";
import { reset_password } from "../../redux/actions/auth.js";
import { Link } from "react-router-dom";

const debugMode = false;

const ResetPassword = ({ reset_password, loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  // * Actualiza los datos
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // * Envia los datos
  const onSubmit = (e) => {
    e.preventDefault();
    console.info("Datos a pasar Reset Password", formData);
    reset_password(formData);
    setRequestSent(true);
  };

  // * Redirecciona al hom
  if (requestSent && !loading) {
    return <Navigate to="/" />;
  }

  // ! Remove on production
  debugMode ? (loading = true) : (loading = false);

  return (
    <Layout>
      <div className="my-6 sm:mx-auto sm:w-full sm:max-w-lg ">
        <Card>
          {/* Header */}
          <CardHeader className="mt-5 space-y-1.5 items-center">
            <CardTitle className="text-2xl">Reset your Password</CardTitle>
            <CardDescription>Enter your email and we'll help you reset it a snap.</CardDescription>
          </CardHeader>
          {/* Form */}
          <CardContent>
            <form onSubmit={(e) => onSubmit(e)} className="space-y-4" method="POST">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="pt-4">
                {loading ? (
                  <Button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/70"
                  >
                    Continue
                  </Button>
                )}
              </div>
              <div>
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium"
                >
                  <Link to="/signin">Back to Login</Link>
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <div className="mt-6 w-full"></div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, {
  reset_password,
})(ResetPassword);
