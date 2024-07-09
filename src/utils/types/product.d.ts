/* eslint-disable @typescript-eslint/indent */
export interface IProduct {
    id: string;
    shopId: string;
    name: string;
    description?: string;
    price: number;
    discount?: string;
    category: string;
    expiryDate?: Date;
    expired: boolean;
    bonus?: string;
    images: string[];
    quantity: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductReview {
    id: string;
    productId: string;
    userId: string;
    feedback: string;
    rating: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    user?: {
        name: string;
        image: string;
    }
}