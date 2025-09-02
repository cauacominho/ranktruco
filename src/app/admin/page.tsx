"use client";
import { useState, useEffect } from "react";
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

interface Player {
  id: number;
  nome: string;
  quantidadePartidas: number;
  quantidadeVitorias: number;
}

export default function AdminPage() {
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(
    null
  );
  const [playedToday, setPlayedToday] = useState(true);
  const [playerWon, setPlayerWon] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const fetchPlayers = () => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayersData(data));
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleEdit = (playerId: number) => {
    // A lógica de edição pode ser implementada aqui, talvez abrindo um dialog
    // similar ao de adicionar jogador, mas preenchido com os dados do jogador.
    console.log(`Editar jogador com ID: ${playerId}`);
  };

  const handleDelete = (playerId: number) => {
    const player = playersData.find((p) => p.id === playerId);
    if (player) {
      setPlayerToDelete({ id: playerId, name: player.nome });
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (playerToDelete) {
        await fetch('/api/players', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: playerToDelete.id }),
        });
      fetchPlayers(); // Atualiza a lista
      setIsDeleteDialogOpen(false);
      setPlayerToDelete(null);
    }
  };

  const handleTodayGame = (playerId: number) => {
    setSelectedPlayerId(playerId);
    setPlayedToday(true);
    setPlayerWon(false);
    setIsGameDialogOpen(true);
  };

  const handleAddPlayer = async () => {
    if (playerName.trim()) {
      await fetch('/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: playerName }),
      });
      setPlayerName("");
      fetchPlayers(); // Atualiza a lista
      setIsDialogOpen(false);
    }
  };

  const handleConfirmGame = async () => {
    await fetch('/api/players', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedPlayerId, playedToday, playerWon }),
    });
    fetchPlayers(); // Atualiza a lista
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