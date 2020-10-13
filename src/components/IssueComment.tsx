import React, { FC, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { Comment } from '../types';

interface Props {
  comment: Comment;
}

const IssueComment: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-10 offset-1">
          <div className="issue-comment card">
            <div className="card-header d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src={props.comment.user.avatar_url}
                  className="user-avatar"
                />
                <p className="user-login">{props.comment.user.login}</p>
              </div>
              <div>
                <p style={{ fontSize: 14 }}>
                  {new Date(props.comment.created_at).toLocaleDateString() +
                    ' ' +
                    new Date(props.comment.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="card-body">
              <ReactMarkdown source={props.comment.body} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IssueComment;
