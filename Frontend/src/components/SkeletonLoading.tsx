import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoading = ({ count, style, height, circle, border, width }) => {
  return (
    <SkeletonTheme baseColor="#525252" highlightColor="#737373">
      <div style={style}>
        <Skeleton
          borderRadius={border}
          width={width}
          count={count}
          height={height}
          circle={circle}
        />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoading;
