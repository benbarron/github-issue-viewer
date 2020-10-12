import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import {
  RouteChildrenProps,
  RouteComponentProps,
  withRouter,
} from 'react-router';
import { IssueContext } from '../context/IssueContext';
import { Issue, IssueState } from '../types';

interface Props extends RouteComponentProps<{ id: string | undefined }> {}

const ViewIssue: FC<Props> = (props: Props) => {
  const issueContext: IssueState = useContext(IssueContext);
  const issueId = Number(props.match?.params.id);
  const [issue, setIssue] = useState<Issue>();

  useEffect(() => {
    setIssue(issueContext.issues.find((issue) => issue.id == issueId));
  });

  if (!issue) {
    return <Fragment></Fragment>;
  }

  return (
    <div className="issue-viewer">
      <div className="row mt-4">
        <div className="col">
          <h3>
            <span className="issue-number">#{issue.number}</span> {issue.title}
          </h3>
          <p>
            <span className="mr-3">
              Created by {issue.user.login} on{' '}
              {new Date(issue.created_at).toLocaleDateString()}
            </span>
            {issue.state === 'open' ? (
              <span className="badge badge-success">Open</span>
            ) : (
              <span className="badge badge-danger">Closed</span>
            )}
          </p>
          <div className="card">
            <div className="card-header d-flex">
              <img src={issue.user.avatar_url} className="user-avatar" />
              <p>{issue.user.login}</p>
            </div>
            <div className="card-body">
              <p>{issue.body}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button
            onClick={props.history.goBack}
            className="btn btn-sm btn-outline-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ViewIssue);
