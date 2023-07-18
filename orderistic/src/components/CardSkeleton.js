import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function CardSkeleton({ cards }) {
  return Array(cards)
    .fill()
    .map((item, i) => (
      <SkeletonTheme highlightColor="#D3D3D3">
        <div className="card-skeleton" key={i}>
          <div className="right-col">
            <Skeleton count={1} style={{ height: "205px" }} />
          </div>
        </div>
      </SkeletonTheme>
    ));
}
