import { useMemo, useState } from 'react';

export const usePages = <T>(data: T[]) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const pages = useMemo(() => {
    return data.slice((page - 1) * pageSize, page * pageSize);
  }, [page, pageSize, data]);
  const onPageChange = ({ num, size }: { num?: number; size?: number }) => {
    if (num) setPage(num);
    if (size) setPageSize(size);
  };
  return {
    page,
    pageSize,
    pages,
    onPageChange,
  };
};
