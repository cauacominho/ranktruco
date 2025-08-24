import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo para a tabela simples
const simpleRankingData = [
  {
    posicao: 1,
    nome: "João Silva",
    quantidadePartidas: 15,
    quantidadeVitorias: 12,
  },
  {
    posicao: 2,
    nome: "Maria Santos",
    quantidadePartidas: 12,
    quantidadeVitorias: 9,
  },
  {
    posicao: 3,
    nome: "Pedro Costa",
    quantidadePartidas: 18,
    quantidadeVitorias: 11,
  },
  {
    posicao: 4,
    nome: "Ana Oliveira",
    quantidadePartidas: 10,
    quantidadeVitorias: 6,
  },
  {
    posicao: 5,
    nome: "Carlos Ferreira",
    quantidadePartidas: 14,
    quantidadeVitorias: 7,
  },
];

export function SimpleRankingTable() {
  const getRankBadgeVariant = (posicao: number) => {
    if (posicao === 1) return "default";
    if (posicao <= 3) return "secondary";
    return "outline";
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Posição</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-center">Partidas</TableHead>
              <TableHead className="text-center">Vitórias</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {simpleRankingData.map((player) => (
              <TableRow key={player.posicao}>
                <TableCell className="font-medium">
                  <Badge variant={getRankBadgeVariant(player.posicao)}>
                    #{player.posicao}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{player.nome}</TableCell>
                <TableCell className="text-center">
                  {player.quantidadePartidas}
                </TableCell>
                <TableCell className="text-center">
                  {player.quantidadeVitorias}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
