import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Nome do site */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">RankTruco</h1>
          </div>

          {/* Botão de toggle do tema */}
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
