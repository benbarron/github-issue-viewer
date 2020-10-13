import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IssueContext } from '../context/IssueContext';
import { Comment, Issue, IssueState } from '../types';
import IssueComment from './IssueComment';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

interface Props extends RouteComponentProps<{ id: string | undefined }> {}

const ViewIssue: FC<Props> = (props: Props) => {
  const issueContext: IssueState = useContext(IssueContext);
  const issueId = Number(props.match?.params.id);
  const [issue, setIssue] = useState<Issue>();
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    setIssue(issueContext.issues.find((issue) => issue.id == issueId));
  });

  useEffect(() => {
    if (issue) {
      axios
        .get(String(issue?.comments_url))
        .then((res) => setComments(res.data))
        .catch((err) => console.log(err));
    }
  }, [issue]);

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
              {<ReactMarkdown source={issue.body} />}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          {comments?.map((comment) => (
            <IssueComment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <div className="row mt-5">
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
