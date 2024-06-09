import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
// UI
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Label } from "../../components/ui/label.jsx";
import Layout from "../../hocs/Layout.js";
import { Loader2 } from "lucide-react";
// REDUX
import { connect } from "react-redux";
import { reset_password_confirm } from "../../redux/actions/auth.js";

const debugMode = false;

const ResetPasswordConfirm = ({ reset_password_confirm, loading, isAuthenticated }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();

  const [requestSent, setRequestSent] = useState(false);

  // * Estado para los datos
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

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
    const uid = params.uid;
    const token = params.token;
    reset_password_confirm({ uid, token, new_password, re_new_password });
    if (new_password === re_new_password) setRequestSent(true);
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
            <CardTitle className="text-2xl">Set new Password</CardTitle>
            <CardDescription>
              <div className="flex justify-center">Your password is reset!</div>
              <div className="flex justify-center">Choose a new one below to complete the process</div>
            </CardDescription>
          </CardHeader>
          {/* Form */}
          <CardContent>
            <form onSubmit={(e) => onSubmit(e)} className="space-y-4" method="POST">
              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                  <Input
                    type="password"
                    name="new_password"
                    id="new_password"
                    value={new_password}
                    onChange={(e) => onChange(e)}
                    autoComplete="Password"
                    required
                    placeholder="Password"
                  />
                </div>
              </div>

              {/*Repeat Password */}
              <div>
                <Label htmlFor="password">Confirm Password</Label>
                <div className="mt-1">
                  <Input
                    type="password"
                    name="re_new_password"
                    id="re_new_password"
                    value={re_new_password}
                    onChange={(e) => onChange(e)}
                    autoComplete="current-password"
                    required
                    placeholder="Confirm password"
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
  reset_password_confirm,
})(ResetPasswordConfirm);
