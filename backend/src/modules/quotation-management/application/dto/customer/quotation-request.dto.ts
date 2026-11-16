export interface Category {
    id : string;
    name : string;
}

export interface SubCategory {
    id : string;
    name : string;
}

export interface QuotationRequestDto {
    productName : string;
    category : Category;
    subCategory : SubCategory;
    quantity : number
    budget : number | null;
    location : string | null;
    description  : string
    status : string;
    createdAt : Date
}

export interface CreateQuotationRequestDto {
    userId : string
    productName : string;
    categoryId : string;
    subCategoryId : string;
    quantity : number
    budget : number | null;
    location : string | null;
    description  : string
}
