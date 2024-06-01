import React, { useEffect, useState } from "react";
import Layout from "../../hocs/Layout.js";
import { Button } from "../../components/ui/button.jsx";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth.js";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const debugMode = false;

const Activate = ({ activate, loading }) => {
  const params = useParams();

  const [activated, setActivated] = useState(false);

  const activateAccount = () => {
    const uid = params.uid;
    const token = params.token;
    console.log("Activate Data required: ", {
      uid,
      token,
    });
    activate({ uid, token });
    setActivated(true);
  };

  debugMode ? (loading = true) : (loading = false);
  if (activated && !loading) return <Navigate to="/" />;

  return (
    <Layout>
      <div className="max-w-7xl max-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <Button
              disabled
              className="inline-flex items-center mt-12 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={activateAccount}
              className="inline-flex items-center mt-12 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90"
            >
              Activate account
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, {
  activate,
})(Activate);
