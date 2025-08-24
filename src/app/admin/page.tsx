"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

// Dados dos jogadores para administração
const playersData = [
  {
    id: 1,
    nome: "João Silva",
    quantidadePartidas: 15,
    quantidadeVitorias: 12,
  },
  {
    id: 2,
    nome: "Maria Santos",
    quantidadePartidas: 12,
    quantidadeVitorias: 9,
  },
  {
    id: 3,
    nome: "Pedro Costa",
    quantidadePartidas: 18,
    quantidadeVitorias: 11,
  },
  {
    id: 4,
    nome: "Ana Oliveira",
    quantidadePartidas: 10,
    quantidadeVitorias: 6,
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    quantidadePartidas: 14,
    quantidadeVitorias: 7,
  },
];

export default function AdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [playedToday, setPlayedToday] = useState(true);
  const [playerWon, setPlayerWon] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleEdit = (playerId: number) => {
    // Função para editar jogador
    console.log(`Editar jogador com ID: ${playerId}`);
  };

  const handleDelete = (playerId: number) => {
    // Função para abrir dialog de confirmação de exclusão
    const player = playersData.find((p) => p.id === playerId);
    if (player) {
      setPlayerToDelete({ id: playerId, name: player.nome });
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    // Função para confirmar exclusão
    if (playerToDelete) {
      console.log(
        `Excluir jogador com ID: ${playerToDelete.id} - ${playerToDelete.name}`
      );
      setIsDeleteDialogOpen(false);
      setPlayerToDelete(null);
    }
  };

  const handleTodayGame = (playerId: number) => {
    // Função para marcar jogo de hoje
    setSelectedPlayerId(playerId);
    setPlayedToday(true);
    setPlayerWon(false);
    setIsGameDialogOpen(true);
  };

  const handleAddPlayer = () => {
    // Função para adicionar jogador
    if (playerName.trim()) {
      console.log(`Adicionar jogador: ${playerName}`);
      setPlayerName("");
      setIsDialogOpen(false);
    }
  };

  const handleConfirmGame = () => {
    // Função para confirmar jogo
    console.log(
      `Jogador ID: ${selectedPlayerId}, Jogou hoje: ${playedToday}, Ganhou: ${playerWon}`
    );
    setIsGameDialogOpen(false);
    setSelectedPlayerId(null);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Painel Administrativo
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="lg">
                  Adicionar Jogador
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Jogador</DialogTitle>
                  <DialogDescription>
                    Digite o nome do novo jogador que você deseja adicionar ao
                    sistema.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="col-span-3"
                      placeholder="Digite o nome do jogador"
                      autoFocus={false}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddPlayer}>Confirmar</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Dialog do Jogo de Hoje */}
            <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
              <DialogContent
                className="sm:max-w-[425px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <DialogHeader>
                  <DialogTitle>Registrar Jogo de Hoje</DialogTitle>
                  <DialogDescription>
                    Marque as opções referentes ao jogo do jogador.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="played-today"
                      checked={playedToday}
                      disabled={true}
                      className="h-5 w-5"
                    />
                    <Label
                      htmlFor="played-today"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Jogou hoje - {getCurrentDate()}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="player-won"
                      checked={playerWon}
                      onCheckedChange={(checked) => setPlayerWon(!!checked)}
                      className="h-5 w-5"
                    />
                    <Label
                      htmlFor="player-won"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Jogador ganhou
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsGameDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleConfirmGame}>Confirmar</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Dialog de Confirmação de Exclusão */}
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogContent
                className="sm:max-w-[425px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <DialogHeader>
                  <DialogTitle>Confirmar Exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja excluir o jogador{" "}
                    <strong>{playerToDelete?.name}</strong>? Esta ação não pode
                    ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmDelete}>
                    Excluir
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Lista de Jogadores
            </h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center w-[300px]">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playersData.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">
                        {player.nome}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleTodayGame(player.id)}
                          >
                            Jogo de Hoje
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(player.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(player.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
