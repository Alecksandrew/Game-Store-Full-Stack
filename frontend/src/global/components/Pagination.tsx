import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import type { PaginationProps } from "../types/paginationType";

export default function PaginationRounded({
  count,
  page,
  onPageChange,
}: PaginationProps) {
  return (
      
            <Stack spacing={2}>
            <Pagination
                count={count}
                page={page}
                onChange={onPageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
          
            />
            </Stack>

  );
}
