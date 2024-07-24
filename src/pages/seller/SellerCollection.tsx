/* eslint-disable */
import React, { useEffect } from 'react'
import Table from '../../components/table/Table';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchSellerCollectionProduct } from '../../store/features/product/sellerCollectionProductsSlice';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/PanoramaFishEye';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { Meta } from '../../components/Meta';
import { FaEye } from 'react-icons/fa';
export default function SellerCollection() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { data, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.sellerCollectionProducts)
    const headers = ['#', 'Image', 'Name', 'Category', 'Price', 'Stock', 'Discount', 'Status', 'Actions'];
    useEffect(() => {
        dispatch(fetchSellerCollectionProduct())
    }, [dispatch]);

    const rows = data.products ? data.products
        .map((product, index) => [
            index + 1,
            <img src={product.images[0]} alt="image" className='product-img' />,
            product.name,
            product.category,
            product.price,
            product.quantity,
            product.discount,
            <ProductStatus status={product.status} />,
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


    return (
        <div className='seller__main__container'>
            <Meta title={`Seller Products`} />
            {isLoading && (
                <div className="table__spinner">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </div>
            )}
            <Table title={'Product List'} headers={headers} rows={rows} />
        </div>
    )
}

const ProductStatus = ({ status }: { status: string }) => {
    return (
        <div className={status}>{status}</div>
    )
}