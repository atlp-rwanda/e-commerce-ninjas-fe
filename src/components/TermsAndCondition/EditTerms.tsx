/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTerm, updateTerm } from "../../store/features/admin/adminSlice";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,Button } from "@mui/material";

export const EditTerms = ({ id }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [termType, setTermType] = useState("");
  const [termContent, setTermContent] = useState("");
  const [localState, setLocalState] = useState<any>();
  const dispatch = useAppDispatch();

  const term = useAppSelector((state) => state?.admin?.term);

  useEffect(() => {
    const fetchTerm = async () => {
      await dispatch(getTerm(id));
    };

    fetchTerm();
  }, [dispatch, id]);

  useEffect(()=>{
    if (term) {
        setIsDisabled(false);
        setIsEdit(false);
        setLocalState({
          type: term.type,
          content: term.content,
        });
      }
  },[term])
  const handleSaveTerms = async (e) => {
    e.preventDefault();
    const termData = {
      id,
      termType: localState.type,
      termContent: localState.content,
    };
    console.log("Saving Term: ", termData);
    await dispatch(updateTerm(termData));
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
  
  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setLocalState((prevState) => ({
      ...prevState,
      content: updatedContent,
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
                  disabled={isDisabled}
                  value={localState.type}
                  onChange={handleTypeChange}
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
                  value={localState.content}
                  onChange={handleContentChange}
                />
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
