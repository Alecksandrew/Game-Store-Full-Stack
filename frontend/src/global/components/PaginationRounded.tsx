import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import type { PaginationProps } from "../types/paginationType";

// Adicione a nova prop 'theme'
interface CustomPaginationProps extends PaginationProps {
  theme?: 'dark' | 'light';
}

export default function PaginationRounded({
  count,
  page,
  onPageChange,
  theme = 'dark',
}: CustomPaginationProps) {

// Estilo para o tema escuro (fundo escuro, botões claros)
  const darkThemeSx = {
  ".MuiPagination-ul": {
    "& .MuiPaginationItem-root": {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)", // Texto branco
      borderColor: "var(--color-primary)", // Borda azul
      "&:hover": {
        backgroundColor: "rgba(65, 105, 225, 0.1)", // Hover sutil em azul
      },
    },
    "& .Mui-selected": {
      backgroundColor: "var(--color-primary)", // Fundo azul quando ATIVO
      color: "var(--color-text-primary)",      // Texto branco para melhor contraste
      borderColor: "var(--color-primary)",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#3557b7", // Azul um pouco mais escuro no hover
      },
    },
  },
};

  // Estilo para o tema claro (fundo claro/colorido, botões escuros)
  const lightThemeSx = {
  ".MuiPagination-ul": {
    "& .MuiPaginationItem-root": {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)", // Texto branco
      borderColor: "var(--color-text-primary)", // Borda branca para contraste
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover sutil em branco
      },
    },
    "& .Mui-selected": {
      backgroundColor: "var(--color-bg-secondary)", // Fundo escuro quando ATIVO
      color: "var(--color-text-primary)",
      borderColor: "var(--color-bg-secondary)", // Borda da mesma cor do fundo
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#1a1d29", // Um tom um pouco mais claro no hover
      },
    },
  },
};

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        variant="outlined"
        shape="rounded"
        sx={theme === 'dark' ? darkThemeSx : lightThemeSx}
      />
    </Stack>
  );
}