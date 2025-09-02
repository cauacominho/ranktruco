import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Caminho para o nosso "banco de dados" JSON
const dataFilePath = path.join(process.cwd(), "src/data/players.json");

// Função para ler os dados do arquivo
async function getPlayersData() {
  try {
    const fileData = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    // Se o arquivo não existir, retorna um array vazio
    return [];
  }
}

// Função para escrever os dados no arquivo
async function writePlayersData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const players = await getPlayersData();
  // Ordena os jogadores pela quantidade de vitórias
  const sortedPlayers = [...players].sort(
    (a, b) => b.quantidadeVitorias - a.quantidadeVitorias
  );
  return NextResponse.json(sortedPlayers);
}

export async function POST(request: Request) {
  const { nome } = await request.json();
  if (!nome) {
    return NextResponse.json({ error: "O nome é obrigatório" }, { status: 400 });
  }

  const players = await getPlayersData();
  const newPlayer = {
    id: players.length > 0 ? Math.max(...players.map((p: any) => p.id)) + 1 : 1,
    nome,
    quantidadePartidas: 0,
    quantidadeVitorias: 0,
    ultimaPartida: new Date().toISOString(),
    ultimaVitoria: new Date().toISOString(),
  };

  players.push(newPlayer);
  await writePlayersData(players);

  return NextResponse.json(newPlayer, { status: 201 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    let players = await getPlayersData();
    const updatedPlayers = players.filter((p: any) => p.id !== id);
    
    await writePlayersData(updatedPlayers);
    
    return NextResponse.json({ message: "Jogador excluído com sucesso" });
}

export async function PUT(request: Request) {
    const { id, playedToday, playerWon } = await request.json();
    let players = await getPlayersData();
    const playerIndex = players.findIndex((p: any) => p.id === id);

    if (playerIndex > -1) {
        if (playedToday) {
            players[playerIndex].quantidadePartidas++;
            players[playerIndex].ultimaPartida = new Date().toISOString();
        }
        if (playerWon) {
            players[playerIndex].quantidadeVitorias++;
            players[playerIndex].ultimaVitoria = new Date().toISOString();
        }

        await writePlayersData(players);
        return NextResponse.json(players[playerIndex]);
    }

    return NextResponse.json({ error: "Jogador não encontrado" }, { status: 404 });
}