import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

export default function App() {
  return (
    <div className="flex flex-col gap-2 md:gap-4 py-2 md:py-4 px-2 md:px-6 xl:px-36">
      <div className="w-full flex flex-col bg-white lg:p-12 items-center gap-6">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn className="text-end">
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn className="text-end">
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex flex-col bg-white lg:p-12 items-center gap-6">
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn className="text-end">
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn>
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
            <TableColumn className="text-end">
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-2/5 rounded-lg" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button className="w-full" isLoading color="primary">
        Loading
      </Button>
    </div>
  );
}
