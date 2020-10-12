import React, { FC, Fragment, useContext } from 'react';
import { RouteChildrenProps } from 'react-router';
import { IssueContext } from '../context/IssueContext';
import { Issue, IssueState } from '../types';
import IssueCard from './IssueCard';
import PaginationLinks from './PaginationLinks';

interface Props extends RouteChildrenProps<{ page: string | undefined }> {}

const IssueList: FC<Props> = (props: Props) => {
  const issueContext: IssueState = useContext(IssueContext);
  const pageCount = Math.ceil(issueContext.issues.length / 10);
  const currentPage = Number(props.match?.params.page);
  const start = (currentPage - 1) * 10;
  const end = start + 10;

  return (
    <Fragment>
      <div>
        {issueContext.issues.slice(start, end).map((issue: Issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
        {!issueContext.loading && (
          <div className="d-flex justify-content-center">
            <PaginationLinks currentPage={currentPage} pageCount={pageCount} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default IssueList;
