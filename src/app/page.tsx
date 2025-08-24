import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { RankingTable } from "@/components/ranking-table";
import { SimpleRankingTable } from "@/components/simple-ranking-table";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ranking Principal
            </h2>
            <SimpleRankingTable />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ranking Completo
            </h2>
            <RankingTable />
          </div>
        </div>
      </main>
    </div>
  );
}
