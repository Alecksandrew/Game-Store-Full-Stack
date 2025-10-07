import type { THeadProps } from "../../../types/TableTypes/tHeadType";


export  function THead({ children }: THeadProps) {
  return (
    <thead>
        {children}
    </thead>
  );
}


