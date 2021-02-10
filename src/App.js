import React from "react";
import { Route, Switch } from "react-router-dom";

const MainPage = React.lazy(() => import("./pages/main/MainPage"));
const LoginPage = React.lazy(() => import("./pages/login/Login"));
const ViewPage = React.lazy(() => import("./pages/view/ViewPage"));

function App() {
  return (
    <React.Suspense fallback={<div>...Loading</div>}>
      <Switch>
        <Route path="/main" render={() => <MainPage />} />
        <Route path="/view" render={() => <ViewPage />} />
        <Route path="/" render={() => <LoginPage />} />
      </Switch>
    </React.Suspense>
  );
}

export default App;
