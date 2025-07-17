// export interface Product {
//     productId?: number;
//     productName: string; 
//     description: string; 
//     price: number; 
//     stockQuantity: number; 
//     category: string;
//     brand: string; 
//     coverImage: string; 
//     }
export interface Product {
    productId?: number;
    productName: string; 
    descripion: string;  // Keep this to match backend typo
    price: number; 
    stockInteger: number;  // Change from stockQuantity to stockInteger
    category: string;
    brand: string; 
    coverImage: string; 
}



