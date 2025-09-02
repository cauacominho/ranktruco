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

interface SimplePlayer {
  posicao: number;
  nome: string;
  quantidadePartidas: number;
  quantidadeVitorias: number;
}

export function SimpleRankingTable() {
  const [simpleRankingData, setSimpleRankingData] = useState<SimplePlayer[]>([]);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => {
        const rankedData = data.map((player: any, index: number) => ({
          ...player,
          posicao: index + 1,
        }));
        setSimpleRankingData(rankedData);
      });
  }, []);

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