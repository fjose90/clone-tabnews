import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Database, Clock, HardDrive, Activity } from "lucide-react";

export default function Dashboard() {
  // Mock de dados (depois você pode substituir por fetch na API)
  const [status, setStatus] = useState({
    versao: "16.9 (84ade85)",
    conexoesAbertas: 1,
    conexoesMax: 901,
    uptime: "12 dias 4h 23m",
    usoCpu: 32,
    usoDisco: 68,
  });

  // Mock para gráfico de conexões
  const [historico, setHistorico] = useState([
    { tempo: "18:00", conexoes: 1 },
    { tempo: "18:05", conexoes: 3 },
    { tempo: "18:10", conexoes: 2 },
    { tempo: "18:15", conexoes: 4 },
  ]);

  useEffect(() => {
    // Aqui você pode atualizar os dados em tempo real via fetch/WebSocket
  }, []);

  const conexoesPercent = (status.conexoesAbertas / status.conexoesMax) * 100;

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Versão */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-4 flex items-center gap-4">
          <Database className="w-10 h-10 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Versão</p>
            <h2 className="text-lg font-bold">{status.versao}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Conexões */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Activity className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Conexões abertas</p>
              <h2 className="text-lg font-bold">{status.conexoesAbertas} / {status.conexoesMax}</h2>
            </div>
          </div>
          <Progress value={conexoesPercent} className="mt-2" />
        </CardContent>
      </Card>

      {/* Uptime */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-4 flex items-center gap-4">
          <Clock className="w-10 h-10 text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Uptime</p>
            <h2 className="text-lg font-bold">{status.uptime}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Uso de Disco */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <HardDrive className="w-10 h-10 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Uso de Disco</p>
              <h2 className="text-lg font-bold">{status.usoDisco}%</h2>
            </div>
          </div>
          <Progress value={status.usoDisco} className="mt-2" />
        </CardContent>
      </Card>

      {/* Uso de CPU */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Activity className="w-10 h-10 text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Uso de CPU</p>
              <h2 className="text-lg font-bold">{status.usoCpu}%</h2>
            </div>
          </div>
          <Progress value={status.usoCpu} className="mt-2" />
        </CardContent>
      </Card>

      {/* Gráfico de Conexões */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">Histórico de conexões</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historico}>
              <XAxis dataKey="tempo" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="conexoes" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
