import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div>
      <Button variant="default">Start</Button>
      <Button variant="destructive">Clean</Button>
      <ModeToggle />
    </div>
  );
}
