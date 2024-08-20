/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteTerm,
  fetchPasswordExpiration,
  getAllTerms,
  setTerms,
  updateUserPasswordExpiration,
} from "../../store/features/admin/adminSlice";
import Box from "@mui/material/Box";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, Tooltip, Zoom } from "@mui/material";
import Table from "../table/Table";
import { Delete, Edit } from "@mui/icons-material";
import { EditTerms } from "../TermsAndCondition/EditTerms";

export const GeneralSettings = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, passwordExpiration, terms } = useAppSelector(
    (state) => state?.admin
  );
  const [minutes, setMinutes] = useState(passwordExpiration);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [selected, setSelected] = useState<string>("Terms & Conditions list");
  const [termType, setTermType] = useState("");
  const [termContent, setTermContent] = useState("");
  const [isEditTerms, setIsEditTerms] = useState<string>("");
  const [termToDelete, setTermToDelete] = useState<string | null>(null);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [localState, setLocalState] = useState<any[]>([])

  useEffect(() => {
    const fun = async () => {
      await dispatch(fetchPasswordExpiration());
      await dispatch(getAllTerms());
      setMinutes(passwordExpiration);
    };
    fun();
  }, [dispatch, passwordExpiration]);

  useEffect(() => {
    if (Array.isArray(terms)) {
      setLocalState(terms);
    }
  }, [terms]);

  useEffect(() => {
    if (selected === "Terms & Conditions list") {
      dispatch(getAllTerms());
    }
  }, [selected, dispatch]);
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(e.target.value));
  };

  const handleSavePasswordExpiration = () => {
    if (minutes) {
      dispatch(updateUserPasswordExpiration({ minutes }));
    }
    setIsDisabled(true);
    setIsEdit(true);
  };

  const handleDeleteTerm = (id: string) => {
    setTermToDelete(id);
    setOpen(true);
    setIsDisabled(true);
    setIsEdit(true);
  };

  const handleConfirmDelete = async () => {
    if (termToDelete) {
      await dispatch(deleteTerm(termToDelete));
    setLocalState(localState?.filter((item) => item.id!== termToDelete));
      setOpen(false);
      setTermToDelete(null);
    }
  };

  const handleSaveTerms = async (e) => {
    e.preventDefault();
    const termData = {
      termType,
      termContent,
    };
    await dispatch(setTerms(termData));
    setIsDisabled(true);
    setIsEdit(true);
    setTermType("");
    setTermContent("");
  };

  const headers = ["N0", "type", "content", "createdAt", "action"];

  const rows = localState?.map((item, index) => {
    return [
      index + 1,
      item.type,
      item.content,
      new Date(item.createdAt).toLocaleDateString(),
      <div className="action__icons">
        <Tooltip TransitionComponent={Zoom} title="Edit" arrow>
          <IconButton
            onClick={() => {
              setIsEditTerms("Edit Terms"),
                setId(item.id),
                setSelected("Edit Terms");
            }}
          >
            <Edit className="icon__edit" />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="Delete" arrow>
          <IconButton onClick={()=> {handleDeleteTerm(item.id)}}>
            <Delete className="icon__delete" />
          </IconButton>
        </Tooltip>
      </div>,
    ];
  });

  const termLinks = [
    "Terms & Conditions list",
    "Create New Terms",
    `${isEditTerms}`,
  ];
  const renderSection = () => {
    switch (selected) {
      case "Terms & Conditions list":
        return (
          <>
            <Table
              title={"Terms and condition"}
              headers={headers}
              rows={rows}
            />
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Role Change"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  sx={{ fontSize: "1.6rem" }}
                >
                  Are you sure you want to change this user's role to Admin?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpen(false)}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontSize: "1.2rem",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      color: "#fff",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  sx={{
                    backgroundColor: "#ff6d18",
                    color: "#fff",
                    fontSize: "1.2rem",
                    "&:hover": {
                      backgroundColor: "#e65b00",
                      color: "#fff",
                    },
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      case "Create New Terms":
        return (
          <>
            <label>Terms and Condition</label>
            <div className="terms-form">
              <form>
                <div>
                  <select
                    disabled={isDisabled}
                    value={termType}
                    onChange={(e) => setTermType(e.target.value)}
                    onFocus={() => setIsEdit(false)}
                    required
                  >
                    <option value="">Please choose type....</option>
                    <option value="seller">Seller</option>
                    <option value="buyer">Buyer</option>
                  </select>
                  <textarea
                    className="form-control"
                    placeholder="Terms and Conditions"
                    disabled={isDisabled}
                    value={termContent}
                    onFocus={() => setIsEdit(false)}
                    onChange={(e) => setTermContent(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  {isEdit ? (
                    <button
                      className="btn"
                      onClick={(e) => {
                        setIsDisabled(!isDisabled), e.preventDefault();
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <button className="btn" onClick={(e) => handleSaveTerms(e)}>
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        );
      case `${isEditTerms}`:
        return <EditTerms id={id} />;
      default:
        return (
          <Table title={"Terms and condition"} headers={headers} rows={rows} />
        );
    }
  };
  return (
    <>
      <div className="section-content">
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
        <div className="password_exp">
          <div className="form-group">
            <label htmlFor="password">Password Expiration Time</label>
            <input
              type="text"
              id="password"
              value={minutes}
              onChange={handleMinutesChange}
              disabled={isDisabled}
              onFocus={() => setIsEdit(false)}
              placeholder="Enter password expiration period in minutes"
            />
          </div>
          {isEdit ? (
            <button className="btn" onClick={() => setIsDisabled(!isDisabled)}>
              Edit
            </button>
          ) : (
            <button className="btn" onClick={handleSavePasswordExpiration}>
              Save
            </button>
          )}
        </div>
        <div className="terms">
          <div className="nav__terms">
            <ul>
              {termLinks.map((termLink, index) => {
                return (
                  <li key={termLink} onClick={() => setSelected(termLink)}>
                    <p
                      className={`terms__link ${selected === termLink ? "active" : " "}`}
                    >
                      {termLink}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>{renderSection()}</div>
        </div>
      </div>
    </>
  );
};
