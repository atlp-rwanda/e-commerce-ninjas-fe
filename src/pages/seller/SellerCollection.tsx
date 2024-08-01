/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchSellerCollectionProduct } from '../../store/features/product/sellerCollectionProductsSlice';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link, useNavigate } from 'react-router-dom';
import { Meta } from '../../components/Meta';
import { FaEye, FaPlusCircle } from 'react-icons/fa';
import { ISingleProductInitialResponse } from '../../utils/types/store';
import { resetUpdateState, updateSellerProductStatus } from '../../store/features/product/sellerProductSlice';
import { toast } from 'react-toastify';
export default function SellerCollection() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { data, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.sellerCollectionProducts)
    const { isLoading: isUpdateLoading, message: updateMessage, isUpdate, isUpdateSuccess, updateError }: ISingleProductInitialResponse = useAppSelector((state: any) => state.singleSellerProduct);

    const headers = ['#', 'Image', 'Name', 'Category', 'Price', 'Stock', 'Discount', 'Status', 'Actions'];
    useEffect(() => {
        dispatch(fetchSellerCollectionProduct())
    }, [dispatch]);

    useEffect(() => {
        if (isUpdate && isUpdateSuccess) {
            toast.success(updateMessage);
            dispatch(fetchSellerCollectionProduct());
        }
        else if (updateError && !isUpdateSuccess) toast.error(updateError)
        dispatch(resetUpdateState())
    }, [isUpdate, isUpdateSuccess, isUpdateLoading, updateError])

    const rows = data.products ? data.products
        .map((product, index) => [
            index + 1,
            <img src={product.images[0]} alt="image" className='product-img' />,
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
                <Tooltip TransitionComponent={Zoom} title="Edit" arrow >
                    <IconButton>
                        <EditIcon className='icon__edit' />
                    </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Delete" arrow>
                    <IconButton>
                        <DeleteIcon className='icon__delete' />
                    </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="View" arrow >
                    <IconButton onClick={() => { navigate(`/seller/product/${product.id}`) }}>
                        <FaEye className='icon__view' />
                    </IconButton>
                </Tooltip>
            </div>
        ]) : [];

    const [open, setOpen] = useState(false);
    const [pendingStatusChange, setPendingStatusChange] = useState(null);

    const handleStatusChange = (productId: string, newStatus: string) => {
        setPendingStatusChange({ productId, newStatus });
        setOpen(true);
    }


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

    return (
        <div className='seller__main__container'>
            <Meta title={`Seller Products`} />
            {isLoading || isUpdateLoading && (
                <div className="table__spinner">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </div>
            )}
            <Table title={'Product List'} headers={headers} rows={rows} tableButton={<Link to={'/seller/product/add'} className='add-product-btn'><FaPlusCircle size={10} />Add Product</Link>} />
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
        </div>
    )
}

const ProductStatus = ({ status }: { status: string }) => {
    return (
        <div className={status}>{status}</div>
    )
}