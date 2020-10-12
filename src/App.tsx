import React, { Fragment, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { IssueContext } from './context/IssueContext';
import BrandHeader from './components/BrandHeader';
import IssueList from './components/IssueList';
import ViewIssue from './components/ViewIssue';
import Loader from './components/Loader';

const App = () => {
  const issueContext: any = useContext(IssueContext);

  useEffect(() => {
    issueContext.fetch();
  }, []);

  return (
    <Fragment>
      <div className="container mb-5">
        <BrandHeader />
        <Loader />
        <Router>
          <Switch>
            <Route exact={true} path="/issues/:page" component={IssueList} />
            <Route exact={true} path="/issue/:id" component={ViewIssue} />
            <Redirect to="/issues/1" />
          </Switch>
        </Router>
      </div>
    </Fragment>
  );
};

export default App;
