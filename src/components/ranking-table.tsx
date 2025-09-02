"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Player {
  rank: number;
  nome: string;
  ultimaPartida: string;
  ultimaVitoria: string;
  quantidadePartidas: number;
  quantidadeVitorias: number;
}

export function RankingTable() {
  const [rankingData, setRankingData] = useState<Player[]>([]);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        const rankedData = data.map((player: any, index: number) => ({
          ...player,
          rank: index + 1,
        }));
        setRankingData(rankedData);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { timeZone: 'UTC' });
  };

  const getWinRate = (vitorias: number, partidas: number) => {
    if (partidas === 0) return "0.0";
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