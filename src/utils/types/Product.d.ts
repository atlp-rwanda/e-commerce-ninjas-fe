export interface IProducts {
  nextPage:number;
  currentPage: number;
  previousPage:number;
  limit:number;
  data:[];
  error?:string
}
export interface IProductsState {
  searchProduct: searchProduct;
}
