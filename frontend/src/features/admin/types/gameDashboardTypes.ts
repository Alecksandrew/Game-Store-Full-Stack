export type AdminGame = {
  igdbId: number;
  name: string;
  price: number;
  discountPrice: number;
  availableKeys: number;
}


export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
}