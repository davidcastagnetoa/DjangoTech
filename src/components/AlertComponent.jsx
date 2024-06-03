import { Fragment } from "react";
import { connect } from "react-redux";
import { CheckCircleIcon, Terminal, XIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.jsx";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./ui/toast.jsx";

const AlertComponent = ({ alert }) => {
  const displayAlert = () => {
    if (alert !== null) {
      return (
        <ToastProvider>
          <Toast variant={alert.alertType}>
            <div className="flex flex-row items-center gap">
              {alert.alertType == "destructive" ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <XIcon className="h-4 w-4" />
              )}
              <div className="grid gap-1 ml-4">
                {alert.title && <ToastTitle>{alert.title}</ToastTitle>}
                {alert.msg && <ToastDescription>{alert.msg}</ToastDescription>}
              </div>
            </div>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    } else {
      return <Fragment></Fragment>;
    }
  };

  return <Fragment>{displayAlert()}</Fragment>;
};

const mapStateToProps = (state) => ({
  alert: state.Alert.alert,
});

export default connect(mapStateToProps)(AlertComponent);
