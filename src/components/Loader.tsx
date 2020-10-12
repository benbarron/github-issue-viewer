import React, { FC, Fragment, useContext } from 'react';
import { IssueContext } from '../context/IssueContext';
import { IssueState } from '../types';
import * as spinners from 'react-spinners';

interface Props {}

const Loader: FC<Props> = (props: Props) => {
  const issueContext: IssueState = useContext(IssueContext);

  return (
    <Fragment>
      <div className="spinner-wrapper container">
        <div className="spinner">
          <spinners.MoonLoader
            color={'#123abc'}
            loading={issueContext.loading}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;
