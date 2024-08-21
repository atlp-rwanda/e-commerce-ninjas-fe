/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Meta } from "../../components/Meta";
import Table from "../../components/table/Table";
import { useAppDispatch,useAppSelector } from "../../store/store";
import { deleteUserRequest, getAllRequests } from "../../store/features/admin/adminSlice";
import {truncateString} from "../../utils/text/truncateString";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Box, LinearProgress } from "@mui/material";

export const Requests = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {requests} = useAppSelector((state) => state.admin)
    const [localRequestState, setLocalRequestState] = useState<any[]>([])

    useEffect(() => {
        dispatch(getAllRequests());
      }, [dispatch, getAllRequests]);
    
    useEffect(()=>{
        if (Array.isArray(requests)) {
            setLocalRequestState(requests);
          }
      },[requests])
      const {isLoading} = useAppSelector((state) => state.admin)
      const getDisplayName = (firstName:string, lastName:string, email:string) => {
        const name =
          firstName && lastName
            ? truncateString(`${firstName} ${lastName}`, 17)
            : email.split("@")[0];
        return name;
      };
  const headers = [
    "N0",
    "Profile",
    "Names",
    "Email",
    "Phone",
    "Gender",
    "Role",
    "Requested At",
    "Status",
    "Action",
  ];
  const handleViewRequest = (userRequestId: string) => {
    navigate(`/admin/dashboard/request/${userRequestId}`);
  };
  const handleDeleteRequest = async(userRequestId: string,requestId:string) => {
    await dispatch(deleteUserRequest({userRequestId, requestId}));
    setLocalRequestState(localRequestState?.filter((request) => request.id!== requestId));
  };
  const rows = localRequestState ? localRequestState?.map((request,index)=>{
    return [
        index + 1,
        <img src={request.user.profilePicture} alt="profile" className="Profile" />,
        getDisplayName(request.user.firstName, request.user.lastName, request.user.email),
        request.user.email.split("@")[0],
        request.user.phone ? request.user.phone : "XXX",
        request.user.gender ? request.user.gender : "XXX",
        <span className="requests__user__role">{request.user.role}</span>,
        new Date(request.createdAt).toLocaleDateString(),
        request.requestStatus === "Pending" ? (
            <span className="requests__status">{request.requestStatus}</span>
          ) : request.requestStatus === "Rejected" ? (
            <span className="requests__status__rejected">{request.requestStatus}</span>
          ) : request.requestStatus === "Accepted" ? (
            <span className="requests__status__accepted">{request.requestStatus}</span>
          ) : null,
          <div className="requests__view">
            <span className="requests__view__icon" onClick={()=>handleViewRequest(request.userId)}><FaEye size={"2em"}/></span>
            <span className="requests__view__icon" onClick={()=>handleDeleteRequest(request.userId,request.id)}><MdDelete size={"2em"}/></span>
          </div>
        
    ]
  }) : []
  return (
    <>
    <Meta title="Requests - Dashboard" />
      <div className="main__container">
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
        <Table title={"Requests"} headers={headers} rows={rows} />
      </div>
    </>
  );
};
