import { Button } from "@/components/ui/button";

export default function Pagination({ page, setPage, totalItems, perPage }: { page: number, setPage: (page: number) => void, totalItems: number, perPage: number }) {
  
  const totalPages = Math.ceil(totalItems / perPage);
  return (
    <div className="flex gap-2 justify-center">
      {page !== 1 && <Button onClick={() => setPage(1)} className="bg-gray-500">{1}</Button>}
      {page > 3 && <Button onClick={() => setPage(page - 2)} className="bg-gray-500">{`${page - 2}`}</Button>}
      {page > 2 && <Button onClick={() => setPage(page - 1)} className="bg-gray-500">{`${page - 1}`}</Button>}
      <Button onClick={() => setPage(page)} >{`${page}`}</Button>
      {page < totalPages -2 && <Button onClick={() => setPage(page + 1)} className="bg-gray-500">{`${page + 1}`}</Button>}
      {page < totalPages - 1 && <Button onClick={() => setPage(page + 2)} className="bg-gray-500">{`${page + 2}`}</Button>}
      {page !== totalPages && <Button onClick={() => setPage(totalPages)} className="bg-gray-500">{`${totalPages}`}</Button>}
    </div>
  );
}