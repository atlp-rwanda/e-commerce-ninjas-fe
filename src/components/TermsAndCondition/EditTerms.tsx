/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTerm, updateTerm } from "../../store/features/admin/adminSlice";
import ReactQuill from "react-quill";

export const EditTerms = ({ id }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [localState, setLocalState] = useState<any>({});
  const [editorContent, setEditorContent] = useState("");
  const dispatch = useAppDispatch();

  const term = useAppSelector((state) => state?.admin?.term);

  useEffect(() => {
    const fetchTerm = async () => {
      await dispatch(getTerm(id));
    };

    fetchTerm();
  }, [dispatch, id]);

  useEffect(() => {
    if (term) {
      setIsDisabled(false);
      setIsEdit(false);
      setLocalState({
        type: term.type,
        content: term.content,
        pdfUrl: term.pdfUrl || "",
      });
    }
  }, [term]);

  const handleSaveTerms = async (e: React.FormEvent) => {
    e.preventDefault();


    if (localState.pdfFile) {
      const formData = new FormData();
      formData.append("pdf", localState.pdfFile);
      await dispatch(updateTerm({formData, id}));
    } else if (localState.content) {
      const content = localState.content;
      console.log(content)
      await dispatch(updateTerm({id,content}));
    }

    setIsDisabled(true);
    setIsEdit(true);
  };

  const handleTypeChange = (e) => {
    const updatedType = e.target.value;
    setLocalState((prevState) => ({
      ...prevState,
      type: updatedType,
    }));
    setIsEdit(false);
  };

  const handleContentChange = (value) => {

    setLocalState((prevState) => ({
      ...prevState,
      content: value,
    }));
    setIsEdit(false);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setLocalState((prevState) => ({
      ...prevState,
      pdfFile: file,
    }));
    setIsEdit(false);
  };

  return (
    <>
      <label>Terms and Condition</label>
      <div className="terms-form">
        <form>
          <div>
            {localState && (
              <>
                <select
                  disabled={true}
                  value={localState.type}
                  onChange={handleTypeChange}
                  required
                >
                  <option value="">Please choose type....</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </select>
                {localState.pdfUrl ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <label>Upload PDF</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      disabled={isDisabled}
                    />
                  </div>
                ) : localState.content ? (
                  <div className="quill">
                    <ReactQuill
                      value={localState.content}
                      onChange={handleContentChange}
                      placeholder="Write your terms and conditions here..."
                      theme="snow"
                      className="quill"
                      readOnly={isDisabled}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="form-group">
            {isEdit ? (
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDisabled((prev) => !prev);
                }}
              >
                Edit
              </button>
            ) : (
              <button className="btn" onClick={handleSaveTerms}>
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

EditTerms.propTypes = {
  id: PropTypes.string.isRequired,
};
