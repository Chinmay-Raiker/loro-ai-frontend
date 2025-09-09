import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import type React from "react";
import { useMemo, useState } from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

export function DataTable<T extends Record<string, any>>({
  rows,
  columns,
  searchableKeys = [],
  pageSize = 10,
  testId,
}: {
  rows: T[];
  columns: Column<T>[];
  searchableKeys?: (keyof T)[];
  pageSize?: number;
  testId?: string;
}) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    let r = q
      ? rows.filter((row) =>
          searchableKeys.some((k) =>
            String(row[k] ?? "")
              .toLowerCase()
              .includes(lower)
          )
        )
      : rows;
    if (sortKey) {
      r = [...r].sort((a, b) => {
        const av = a[sortKey!];
        const bv = b[sortKey!];
        if (av == null) return 1;
        if (bv == null) return -1;
        return ("" + av).localeCompare("" + bv) * (sortDir === "asc" ? 1 : -1);
      });
    }
    return r;
  }, [rows, q, searchableKeys, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div data-testid={testId} className="rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between gap-2 p-3 border-b border-gray-200">
        <Input
          aria-label="Filter"
          placeholder="Filter..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
          className="max-w-xs"
        />
        <div className="text-xs text-gray-500">{filtered.length} items</div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={String(c.key)}>
                  <button
                    className="text-left w-full"
                    aria-label={c.sortable ? `Sort by ${c.label}` : undefined}
                    onClick={() => {
                      if (!c.sortable) return;
                      if (sortKey !== c.key) {
                        setSortKey(c.key);
                        setSortDir("asc");
                      } else setSortDir(sortDir === "asc" ? "desc" : "asc");
                    }}
                  >
                    {c.label}{" "}
                    {sortKey === c.key ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.map((row, i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={String(c.key)}>
                    {c.render ? c.render(row) : String(row[c.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 p-3 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          data-testid="table-prev"
        >
          Prev
        </Button>
        <div className="text-sm">
          {page + 1} / {pages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
          disabled={page >= pages - 1}
          data-testid="table-next"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
