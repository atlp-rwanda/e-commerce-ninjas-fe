/* eslint-disable */
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IRequest } from "../utils/types/store";
import { useAppDispatch, useAppSelector } from "../store/store";
import { acceptOrRejectRequest, deleteUserRequest } from "../store/features/admin/adminSlice";
import { FcApproval } from "react-icons/fc";
import rejected from "../../public/assets/images/rejected.png";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { FullScreenPdfView } from "./FullScreenPdfView/FullScreenPdfView";
const UserDetails: React.FC<any> = ({ Request }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const { request } = useAppSelector((state) => state.admin)
  const UserRequest = Request ? Request : request;
  
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleDeleteRequest = async (UserRequest: IRequest) => {
    const userRequestId = UserRequest.userId as string;
    const requestId = UserRequest.id as string;
    await dispatch(deleteUserRequest({ userRequestId, requestId }));
    setTimeout(() => {
      navigate('/admin/dashboard/requests')
    }, 5000)
  };
  const handleCancelOrApproveRequest = (UserRequest: IRequest, action: string) => {
    const userRequestId = UserRequest.userId as string;
    const requestStatus = action === "Cancel" ? "Rejected" : "Accepted";
    dispatch(acceptOrRejectRequest({ userRequestId, requestStatus }));
  };
  return (
    <div className="user-details">
      <div className="user-image">
        <img
          src={UserRequest?.user?.profilePicture}
          alt={`${UserRequest?.user?.firstName}`}
        />
        <div className="payment-info">
          <table className="table__info">
            <thead>
              <tr>
                <th><h4>Payment Info</h4></th>
                <th></th>
                <th><h4>Document</h4></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Tin:</strong>
                </td>
                <td><p>{UserRequest?.tin}</p></td>
                <td rowSpan={3}>
                  <Tooltip title="Open PDF">
                    <IconButton onClick={handleOpen}>
                      <PictureAsPdfIcon sx={{ fontSize: "4rem", color: "#ff6d18" }} />
                    </IconButton>
                  </Tooltip>
                  {
                    open && (
                      <div className="view__pdf">
                        <FullScreenPdfView pdfUrl={UserRequest?.rdbDocument}/>
                        <IoCloseCircleOutline onClick={handleClose} className="close__icon"/>
                      </div>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td><strong>Payment method:</strong></td>
                <td><p>
                  {UserRequest?.paymentMethods?.bankPayment &&
                    UserRequest?.paymentMethods?.mobilePayment
                    ? "Bank, Mobile"
                    : UserRequest?.paymentMethods?.bankPayment
                      ? "Bank"
                      : UserRequest?.paymentMethods?.mobilePayment
                        ? "Mobile"
                        : "None"}
                </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Account:</strong>
                </td>
                <td><p>
                  {UserRequest?.paymentMethods?.bankPayment &&
                    UserRequest?.paymentMethods?.mobilePayment
                    ? `${UserRequest?.paymentMethods?.bankAccount} ${UserRequest?.paymentMethods?.mobileNumber}`
                    : UserRequest?.paymentMethods?.bankPayment
                      ? `${UserRequest?.paymentMethods?.bankAccount}`
                      : UserRequest?.paymentMethods?.mobilePayment
                        ? `${UserRequest?.paymentMethods?.mobileNumber}`
                        : "None"}
                </p>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table__terms">
            <thead>
              <tr>
                <th><h4>Terms & Conditions</h4></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Terms:</strong>
                </td>
                <td>
                  <p style={{ color: `${UserRequest?.terms === true ? "green" : "red"}` }}>{UserRequest?.terms === true ? "Accepted" : "Not Accepted"}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="user-info">
        <div className="user-info__table">
          <table className="user__table">
            <thead>
              <tr>
                <th><h2>User Info</h2></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Names:</strong>
                </td>
                <td><p>{UserRequest?.user?.firstName} {UserRequest?.user?.lastName}</p></td>
              </tr>
              <tr>
                <td>
                  <strong>Role:</strong>
                </td>
                <td><p>{UserRequest?.user?.role}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="shop__info">
          <table className="shop__table">
            <thead>
              <tr>
                <th><h2>Business Info</h2></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td><p>{UserRequest?.shop?.name}</p></td>
              </tr>
              <tr>
                <td>
                  <strong>Description:</strong>
                </td>
                <td><p>{UserRequest?.shop?.description}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="contact-info">
          <table className="contact__table">
            <thead>
              <tr>
                <th><h2>Contact Info</h2></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>
                  <p>
                    {
                      UserRequest?.user?.phone
                        ? UserRequest.user.phone.startsWith("+250")
                          ? UserRequest.user.phone.replace(/\+250(\d{3})(\d{3})(\d{4})/, "+250 $1 $2 $3")
                          : UserRequest.user.phone.startsWith("250")
                            ? UserRequest.user.phone.replace(/250(\d{3})(\d{3})(\d{4})/, "+250 $1 $2 $3")
                            : UserRequest.user.phone.startsWith("+")
                              ? UserRequest.user.phone.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4")
                              : UserRequest.user.phone.replace(/(\d{3})(\d{3})(\d{4})/, "+250 $1 $2 $3")
                        : "XXXX-XXX-XXX-XXX"
                    }

                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>E-mail:</strong>
                </td>
                <td>
                  <p>
                    {UserRequest?.user?.email}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Address:</strong>
                </td>
                <td>
                  <p>
                    {UserRequest?.user?.address ? UserRequest?.user?.address : "XXXXXXXX"}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="basic-info">
          <table className="basic__table">
            <thead>
              <tr>
                <th><h2>Additional info</h2></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Birthday:</strong>
                </td>
                <td>
                  <p>
                    {
                      UserRequest?.user?.birthDate
                        ? new Date(UserRequest.user.birthDate).toLocaleDateString('en-GB')
                        : "XX-XX-XXXX"
                    }

                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Gender:</strong>
                </td>
                <td>
                  <p>
                    {UserRequest?.user?.gender ? UserRequest?.user?.gender : "XXXXXXXX"}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Language:</strong>
                </td>
                <td>
                  <p>
                    {UserRequest?.user?.language ? UserRequest?.user?.language : "XXXXXXXX"}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <button className="btn-delete" onClick={() => handleDeleteRequest(UserRequest)}>Delete</button>
          <div>
            {UserRequest.requestStatus === "Accepted" ?
              <button className="btn-cancel" onClick={() => handleCancelOrApproveRequest(UserRequest, "Cancel")}>Cancel</button> :
              UserRequest.requestStatus === "Rejected" ? <button className="btn-approve" onClick={() => handleCancelOrApproveRequest(UserRequest, "Accepted")}>Approve</button> :
                (
                  <>
                    <button className="btn-cancel" onClick={() => handleCancelOrApproveRequest(UserRequest, "Cancel")}>Cancel</button>
                    <button className="btn-approve" onClick={() => handleCancelOrApproveRequest(UserRequest, "Accepted")}>Approve</button>
                  </>
                )}
          </div>
        </div>
        {UserRequest.requestStatus === "Accepted" ? <FcApproval className="approval__badge" /> : UserRequest.requestStatus === "Rejected" ? <img src={rejected} alt="rejected" className="reject-badge" /> : null}

      </div>
    </div>
  );
};

export default UserDetails;
