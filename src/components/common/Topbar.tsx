import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="h-full flex items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <Input
            data-testid="topbar-search"
            aria-label="Search"
            placeholder="Search..."
            className="w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="new-action">
            New
          </Button>
          <div
            aria-label="User menu"
            className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center"
          >
            L
          </div>
        </div>
      </div>
    </header>
  );
}
