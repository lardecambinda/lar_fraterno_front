"use client";
import { ITranscription } from "@/types/types";
import { Trash2, Clock, CheckCircle, AlertCircle, XCircle, Loader2 } from "lucide-react";
import { deleteTranscription } from "@/services/apolloAPI";

interface TranscriptionListProps {
  transcriptions: ITranscription[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  PENDING: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50", label: "Na fila" },
  IN_PROGRESS: { icon: Loader2, color: "text-blue-500", bg: "bg-blue-50", label: "Transcrevendo" },
  COMPLETED: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Concluída" },
  ERROR: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", label: "Erro" },
  CANCELLED: { icon: XCircle, color: "text-gray-400", bg: "bg-gray-50", label: "Cancelada" },
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TranscriptionList({
  transcriptions,
  selectedId,
  onSelect,
  onDelete,
}: TranscriptionListProps) {
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Remover esta transcrição?")) return;
    const ok = await deleteTranscription(id);
    if (ok) onDelete(id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Suas transcrições</h2>
      </div>
      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {transcriptions.map((t) => {
          const config = statusConfig[t.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedId === t.id ? "bg-blue-50 border-l-2 border-blue-500" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {t.originalName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 text-xs ${config.color}`}>
                      <StatusIcon className={`w-3 h-3 ${t.status === "IN_PROGRESS" ? "animate-spin" : ""}`} />
                      {config.label}
                    </span>
                    {t.status === "IN_PROGRESS" && (
                      <span className="text-xs text-blue-600 font-medium">
                        {t.progress}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatFileSize(t.fileSize)} · {new Date(t.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(e, t.id)}
                  className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
                  title="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
