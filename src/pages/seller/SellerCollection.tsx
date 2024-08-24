/* eslint-disable */
import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchSellerCollectionProduct } from "../../store/features/product/sellerCollectionProductsSlice";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Link, useNavigate } from "react-router-dom";
import { Meta } from "../../components/Meta";
import { FaEye, FaPlusCircle } from "react-icons/fa";
import { ISingleProductInitialResponse } from "../../utils/types/store";
import {
  DeleteProduct,
  resetUpdateState,
  updateSellerProductStatus,
} from "../../store/features/product/sellerProductSlice";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/product/ConfirmModal";

interface DeleteItemState {
  id: any;
  name: string;
}

export default function SellerCollection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess } = useAppSelector(
    (state) => state.sellerCollectionProducts
  );
  const { isDeletedSuccess, message, isError } = useAppSelector(
    (state) => state.singleProduct
  );
  const {
    isLoading: isUpdateLoading,
    message: updateMessage,
    isUpdate,
    isUpdateSuccess,
    updateError,
  }: ISingleProductInitialResponse = useAppSelector(
    (state: any) => state.singleSellerProduct
  );

  const headers = [
    "#",
    "Image",
    "Name",
    "Category",
    "Price",
    "Stock",
    "Discount",
    "Status",
    "Actions",
  ];
  useEffect(() => {
    dispatch(fetchSellerCollectionProduct());
  }, [dispatch]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DeleteItemState | null>(
    null
  );

  const handleDelete = async () => {
    try {
      setShowConfirm(false);
      await dispatch(DeleteProduct(itemToDelete.id));
      // await dispatch(deleteItem(itemToDelete.id)).unwrap();
      dispatch(fetchSellerCollectionProduct());
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isUpdate && isUpdateSuccess) {
      // toast.success(updateMessage);
      dispatch(fetchSellerCollectionProduct());
    } else if (updateError && !isUpdateSuccess) toast.error(updateError);
    dispatch(resetUpdateState());
  }, [isUpdate, isUpdateSuccess, isUpdateLoading, updateError]);

  const rows = data.products
    ? data.products.map((product, index) => [
        index + 1,
        <img src={product.images[0]} alt="image" className="product-img" />,
        product.name,
        product.category,
        product.price,
        product.quantity,
        product.discount,
        <select
          name="role"
          value={product.status}
          id=""
          className="user__role"
          onChange={(e) => handleStatusChange(product.id, e.target.value)}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>,

        <div className="action__icons">
          <Tooltip TransitionComponent={Zoom} title="Edit" arrow>
            <IconButton
              onClick={() => {
                navigate(`/seller/product/${product.id}`);
              }}
            >
              <EditIcon className="icon__edit" />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Delete" arrow>
            <IconButton
              onClick={() => {
                setShowConfirm(true);
                setItemToDelete({ id: product.id, name: product.name });
              }}
            >
              <DeleteIcon className="icon__delete" />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="View" arrow>
            <IconButton
              onClick={() => {
                navigate(`/seller/product/${product.id}`);
              }}
            >
              <FaEye className="icon__view" />
            </IconButton>
          </Tooltip>
        </div>,
      ])
    : [];

  const [open, setOpen] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  const handleStatusChange = (productId: string, newStatus: string) => {
    setPendingStatusChange({ productId, newStatus });
    setOpen(true);
  };

  const handleConfirmStatusChange = () => {
    const { productId, newStatus } = pendingStatusChange;
    dispatch(updateSellerProductStatus({ id: productId, newStatus }));
    setPendingStatusChange(null);
    setOpen(false);
  };

  const handleClose = () => {
    setPendingStatusChange(null);
    setOpen(false);
  };

  const popupMessage = `Deleting this product <i>${itemToDelete?.name}</i> will be permanently removed from the system. This can't be undone!`;

  return (
    <div className="seller__main__container">
      <Meta title={`Seller Products`} />
      {isLoading ||
        (isUpdateLoading && (
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
        ))}
      <Table
        title={"Product List"}
        headers={headers}
        rows={rows}
        tableButton={
          <Link to={"/seller/product/add"} className="add-product-btn">
            <FaPlusCircle size={10} />
            Add Product
          </Link>
        }
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Status Change"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "1.6rem" }}
          >
            Are you sure you want to change this product's status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
            onClick={handleConfirmStatusChange}
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

      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          title="Are you sure?"
          message={popupMessage}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

const ProductStatus = ({ status }: { status: string }) => {
  return <div className={status}>{status}</div>;
};
