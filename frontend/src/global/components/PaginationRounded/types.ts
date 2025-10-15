export interface PaginationRoundedProps {
    count: number;
    page: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    theme?: 'dark' | 'light';
}
