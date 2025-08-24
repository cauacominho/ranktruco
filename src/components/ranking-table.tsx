import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo para a tabela
const rankingData = [
  {
    rank: 1,
    nome: "João Silva",
    ultimaPartida: "2024-08-24",
    ultimaVitoria: "2024-08-24",
    quantidadePartidas: 15,
    quantidadeVitorias: 12,
  },
  {
    rank: 2,
    nome: "Maria Santos",
    ultimaPartida: "2024-08-23",
    ultimaVitoria: "2024-08-22",
    quantidadePartidas: 12,
    quantidadeVitorias: 9,
  },
  {
    rank: 3,
    nome: "Pedro Costa",
    ultimaPartida: "2024-08-23",
    ultimaVitoria: "2024-08-23",
    quantidadePartidas: 18,
    quantidadeVitorias: 11,
  },
  {
    rank: 4,
    nome: "Ana Oliveira",
    ultimaPartida: "2024-08-22",
    ultimaVitoria: "2024-08-21",
    quantidadePartidas: 10,
    quantidadeVitorias: 6,
  },
  {
    rank: 5,
    nome: "Carlos Ferreira",
    ultimaPartida: "2024-08-22",
    ultimaVitoria: "2024-08-20",
    quantidadePartidas: 14,
    quantidadeVitorias: 7,
  },
];

export function RankingTable() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getWinRate = (vitorias: number, partidas: number) => {
    const rate = (vitorias / partidas) * 100;
    return rate.toFixed(1);
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "default";
    if (rank <= 3) return "secondary";
    return "outline";
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-center">Partidas</TableHead>
              <TableHead className="text-center">Vitórias</TableHead>
              <TableHead>Última Partida</TableHead>
              <TableHead>Última Vitória</TableHead>
              <TableHead className="text-center">Taxa de Vitória</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankingData.map((player) => (
              <TableRow key={player.rank}>
                <TableCell className="font-medium">
                  <Badge variant={getRankBadgeVariant(player.rank)}>
                    #{player.rank}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{player.nome}</TableCell>
                <TableCell className="text-center">
                  {player.quantidadePartidas}
                </TableCell>
                <TableCell className="text-center">
                  {player.quantidadeVitorias}
                </TableCell>
                <TableCell>{formatDate(player.ultimaPartida)}</TableCell>
                <TableCell>{formatDate(player.ultimaVitoria)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">
                    {getWinRate(
                      player.quantidadeVitorias,
                      player.quantidadePartidas
                    )}
                    %
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
