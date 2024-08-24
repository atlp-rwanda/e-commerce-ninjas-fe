/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteTerm,
  fetchPasswordExpiration,
  getAllTerms,
  setTerms,
  setTermsWithPdf,
  updateUserPasswordExpiration,
} from "../../store/features/admin/adminSlice";
import Box from "@mui/material/Box";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Tooltip,
  Zoom,
} from "@mui/material";
import Table from "../table/Table";
import { Delete, Edit } from "@mui/icons-material";
import { EditTerms } from "../TermsAndCondition/EditTerms";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { FullScreenPdfView } from "../FullScreenPdfView/FullScreenPdfView";
import { IoCloseCircleOutline } from "react-icons/io5";

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
  const [pdfOpen, setPdfOpen] = useState(false);
  const [localState, setLocalState] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadMethod, setUploadMethod] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF document.");
      return;
    }
    setPdfFile(file);
  };

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
      setLocalState(localState?.filter((item) => item.id !== termToDelete));
      setOpen(false);
      setTermToDelete(null);
    }
  };

  const handleSaveTerms = async (e) => {
    e.preventDefault();
    try {
      if (uploadMethod === "editor") {
        const termData = {
          termType,
          termContent: editorContent,
        };
        await dispatch(setTerms(termData));
      } else if (uploadMethod === "pdf" && pdfFile) {
        const formData = new FormData();
        formData.append("pdf", pdfFile);
        formData.append("type", termType);
        await dispatch(setTermsWithPdf(formData));
      }
      // Reset form fields after success
      setTermType("");
      setEditorContent("");
      setPdfFile(null);
    } catch (error) {
      toast.error("An error occurred while saving terms. Please try again.");
    } finally {
      setIsDisabled(true);
      setIsEdit(true);
    }
  };

  const handleChoosePdf = (e) => {
    e.preventDefault();
    setUploadMethod("pdf");
  };
  const handleChooseEditor = (e) => {
    e.preventDefault();
    setUploadMethod("editor");
  };

  const headers = ["N0", "type", "content", "createdAt", "action"];

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const truncateText = (text, length = 80) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const renderContent = (item) => {
    return (
      <>
        <div className="display-content">
          <span
            dangerouslySetInnerHTML={{ __html: truncateText(item.content) }}
          ></span>
          {item.content.length > 80 && (
            <Button color="primary" onClick={handleDialogOpen}>
              Read More
            </Button>
          )}
        </div>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: { height: "80vh", borderRadius: "10px" },
          }}
        >
          <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
            Terms and Conditions
          </DialogTitle>
          <DialogContent
            dividers
            style={{
              padding: "20px",
              overflowY: "auto",
              maxHeight: "60vh",
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: item.content }}
              style={{ fontSize: "1.8rem", padding: "0 2rem" }}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderPdfUrl = (url: string) => {
    const handleClickOpen = () => {
      setPdfOpen(true)
    };
  
    const handleClose = () => {
      setPdfOpen(false);
    };
    return (
      <div className="viewer">
        <a
          href={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
         <Button> View PDF vie Google</Button>
        </a>
        <Button onClick={handleClickOpen}>View PDF</Button>
        {
          pdfOpen && (
              <FullScreenPdfView pdfUrl={url} open={pdfOpen} onClose={handleClose}/>
          )
        }
      </div>
    );
  };

  const rows = localState?.map((item, index) => {
    return [
      index + 1,
      item.type,
      item.content !== null ? renderContent(item) : renderPdfUrl(item.pdfUrl),
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
          <IconButton
            onClick={() => {
              handleDeleteTerm(item.id);
            }}
          >
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
                  Are you sure you want to delete Terms and Conditions?
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
                  <div className="uploadMethod">
                    <button onClick={(e) => handleChooseEditor(e)}>
                      Write Terms and Conditions
                    </button>
                    <button onClick={(e) => handleChoosePdf(e)}>
                      Upload PDF Document
                    </button>
                  </div>
                  {uploadMethod === "editor" ? (
                    <div className="quill">
                      <ReactQuill
                        value={editorContent}
                        onChange={handleEditorChange}
                        placeholder="Write your terms and conditions here..."
                        theme="snow"
                        className="quill"
                        readOnly={isDisabled}
                        onFocus={() => setIsEdit(false)}
                      />
                    </div>
                  ) : uploadMethod === "pdf" ? (
                    <>
                      <div className="upload-file">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf"
                          disabled={isDisabled}
                          onFocus={() => setIsEdit(false)}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
                <div
                  className={`form-group ${uploadMethod === "editor" ? "margin" : ""}`}
                >
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
