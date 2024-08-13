/* eslint-disable */
import React from "react";
import { useParams } from "react-router-dom";
import { Meta } from "../../components/Meta";
export const ViewRequest = () => {
  const { id } = useParams();
  return (
    <>
      <Meta title={`Request - ${id}`} />
      <div className="main__request">{`Request Id: ${id}`}</div>
    </>
  );
};
