import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// import MainPage from "./pages/main/MainPage";
// import LoginPage from "./pages/login/Login";
// import ViewPage from "./pages/view/ViewPage";

const MainPage = React.lazy(() => import("./pages/main/MainPage"));
const LoginPage = React.lazy(() => import("./pages/login/Login"));
const ViewPage = React.lazy(() => import("./pages/view/ViewPage"));

function App() {
  return (
    <React.Suspense fallback={<div>...Loading</div>}>
      <Switch>
        <PrivateRoute exact path="/main"  >
          <MainPage />
        </PrivateRoute>
        {/* <Route exact path="/main" render={(routeProps) => <MainPage {...routeProps} />} /> */}
        <PrivateRoute exact path="/view">
          <ViewPage />
        </PrivateRoute>
        <Route path="/" render={() => <LoginPage />} />
      </Switch>
    </React.Suspense>
  );
}

export default App;
