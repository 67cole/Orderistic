import React from "react";
import { Col } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function CardSkeleton({ cards }) {
  return Array(cards)
    .fill()
    .map((item, i) => (
      <SkeletonTheme highlightColor="#D3D3D3" key={i}>
        <Col key={i}>
          <div className="card-skeleton" key={i}>
            <Skeleton
              key={i}
              count={1}
              style={{ height: "205px", width: "583px" }}
            />
          </div>
        </Col>
      </SkeletonTheme>
    ));
}
