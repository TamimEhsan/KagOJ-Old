import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Main from "./components/inner/Main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./action/auth";

import Auth from "./components/homepage/Auth";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./sass/styles.scss";


import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/Navigation/Navbar";
import Home from "./pages/landing-page";

var showToast;
var setLoading;
const showToast2 = (message, type) => {
  console.log(message, type);
  if (type === "success") toast.success(message, {});
  else if (type === "error") toast.error(message, {});
  else {
    toast.dark(message, {});
  }
};
function App() {
  const history = useHistory();
  const [loading, setL] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth(dispatch);
  }, []);

  setLoading = setL;
  showToast = (message) => {
    toast.dark(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <BrowserRouter history={history}>
      <div>
        <Dialog open={loading}>
          <DialogContent>
            <Loader type="Oval" color="#00BFFF" height={100} width={100} />
          </DialogContent>
        </Dialog>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar />
        {!auth ? (
          
          <Switch className="container-sm">
            {/* <Route path="/about" component={AboutUs} />
            <Route path="/privacy" component={Privacy} /> */}
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch className="container-sm">
            {/* <Route path="/about" component={AboutUs} />
            <Route path="/privacy" component={Privacy} /> */}
            <Route path="/" component={Main} />
          </Switch>
        )}
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
export { showToast, showToast2, setLoading };
