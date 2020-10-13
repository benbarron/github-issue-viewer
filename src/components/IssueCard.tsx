import React, { FC, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Issue } from '../types';

interface Props extends RouteComponentProps {
  issue: Issue;
}

const IssueCard: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h6>
              <Link to={`/issue/${props.issue.id}`}>
                #{props.issue.number} - {props.issue.title}
              </Link>
            </h6>
            <p>
              {props.issue.state === 'open' ? (
                <span className="badge badge-success">Open</span>
              ) : (
                <span className="badge badge-danger">Closed</span>
              )}
            </p>
          </div>
          <p className="date">
            {'Created at: ' +
              new Date(props.issue.created_at).toLocaleDateString() +
              ' ' +
              new Date(props.issue.created_at).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(IssueCard);
