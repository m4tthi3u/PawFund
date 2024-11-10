import React from "react";
import "./style.scss";

const Loading = () => {
  return (
    /* From Uiverse.io by lenin55 */
    <div className="loading-wraper">
      <div className="ui-loader loader-blk">
        <svg viewBox="22 22 44 44" className="multiColor-loader">
          <circle
            cx={44}
            cy={44}
            r="20.2"
            fill="none"
            strokeWidth="3.6"
            className="loader-circle loader-circle-animation"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
