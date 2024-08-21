/* eslint-disable */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Meta } from "../../components/Meta";
import UserDetails from "../../components/UserDetails";
import { useAppDispatch ,useAppSelector} from "../../store/store";
import { getRequest } from "../../store/features/admin/adminSlice";
import { IRequest } from "../../utils/types/store";
import { Box, LinearProgress } from "@mui/material";

export const ViewRequest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {request,isLoading} = useAppSelector((state)=> state.admin)
useEffect(()=>{
  dispatch(getRequest(id))
},[dispatch])
  return (
    <>
      <Meta title={`Request - ${id}`} />
      <div className="main__request">
      {isLoading && (
          <div className="table__spinner">
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ff8a46",
                  },
                }}
              />
            </Box>
          </div>
        )}
      {request && <UserDetails Request={request} />}
      </div>
    </>
  );
};
