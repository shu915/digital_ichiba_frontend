import { Button } from "@/components/ui/button";

export default function Pagination({
  page,
  setPage,
  totalItems,
  perPage,
}: {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  perPage: number;
}) {
  const totalPages = Math.ceil(totalItems / perPage);

  if (totalItems > 0) {
    return (
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {page !== 1 && (
          <Button
            onClick={() => setPage(1)}
            className="bg-gray-500 w-9 h-9 sm:w-10 sm:h-10"
          >
            {1}
          </Button>
        )}
        {page > 2 && (
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
            ...
          </div>
        )}
        {page > 2 && (
          <Button
            onClick={() => setPage(page - 1)}
            className="bg-gray-500 w-9 h-9 sm:w-10 sm:h-10"
          >{`${page - 1}`}</Button>
        )}
        <Button
          onClick={() => setPage(page)}
          className="w-9 h-9 sm:w-10 sm:h-10"
        >{`${page}`}</Button>
        {page < totalPages - 1 && (
          <Button
            onClick={() => setPage(page + 1)}
            className="bg-gray-500 w-9 h-9 sm:w-10 sm:h-10"
          >{`${page + 1}`}</Button>
        )}
        {page < totalPages - 1 && (
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
            ...
          </div>
        )}
        {page !== totalPages && (
          <Button
            onClick={() => setPage(totalPages)}
            className="bg-gray-500 w-9 h-9 sm:w-10 sm:h-10"
          >{`${totalPages}`}</Button>
        )}
      </div>
    );
  }
  return null;
}
