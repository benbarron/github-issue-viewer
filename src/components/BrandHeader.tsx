import React, { FC, Fragment } from 'react';

interface Props {}

const BrandHeader: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <div id="header">
        <div className="header-left">
          <img
            src="/images/wmt-global-tech.png"
            className="brand-image"
            alt="WMT Global Tech"
          />
        </div>
        <div className="header-right">
          <h3 className="header-first">WMT Tech Intervew</h3>
          <h5 className="header-second">Github Issue Viewer</h5>
        </div>
      </div>
    </Fragment>
  );
};

export default BrandHeader;
