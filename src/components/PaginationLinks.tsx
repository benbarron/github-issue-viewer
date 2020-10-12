import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  pageCount: number;
  currentPage: number;
}

const PaginationLinks: FC<Props> = (props: Props) => {
  let links = [];
  for (let i = 0; i < props.pageCount; i++) {
    links.push(
      <li
        className={`page-item ${props.currentPage === i + 1 ? 'active' : null}`}
        key={i}
      >
        <Link className={`page-link `} to={`/issues/${i + 1}`}>
          {i + 1}
        </Link>
      </li>
    );
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation example">
            <ul className="pagination">{links}</ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default PaginationLinks;
