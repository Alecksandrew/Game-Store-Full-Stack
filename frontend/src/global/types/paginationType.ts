export type PaginationProps = {
  count: number; 
  page: number; 
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};