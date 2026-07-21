"use client";
import { useEffect, useState, useRef } from "react";
import { ITranscription } from "@/types/types";
import {
  cancelTranscription,
  getTranscription,
} from "@/services/apolloAPI";
import {
  Loader2,
  XCircle,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { parseCookies } from "nookies";

interface TranscriptionDetailProps {
  transcription: ITranscription;
  onUpdate: (t: ITranscription) => void;
}

const statusConfig = {
  PENDING: { icon: Clock, color: "text-yellow-500", label: "Na fila" },
  IN_PROGRESS: { icon: Loader2, color: "text-blue-500", label: "Transcrevendo" },
  COMPLETED: { icon: CheckCircle, color: "text-green-500", label: "Concluída" },
  ERROR: { icon: AlertCircle, color: "text-red-500", label: "Erro" },
  CANCELLED: { icon: XCircle, color: "text-gray-400", label: "Cancelada" },
};

export default function TranscriptionDetail({
  transcription: initial,
  onUpdate,
}: TranscriptionDetailProps) {
  const [transcription, setTranscription] = useState(initial);
  const [cancelling, setCancelling] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    setTranscription(initial);
  }, [initial]);

  useEffect(() => {
    if (
      transcription.status === "PENDING" ||
      transcription.status === "IN_PROGRESS"
    ) {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_ROUTE || "http://localhost:3333";
      const { "lar-fraterno_token": token } = parseCookies();
      const tokenQuery = token ? `?token=${token}` : "";
      const es = new EventSource(`${baseUrl}/transcription/${transcription.id}/progress${tokenQuery}`);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setTranscription((prev) => {
          const updated = { ...prev, ...data };
          onUpdate(updated);
          return updated;
        });
        if (
          data.status === "COMPLETED" ||
          data.status === "ERROR" ||
          data.status === "CANCELLED"
        ) {
          es.close();
        }
      };

      es.onerror = () => {
        es.close();
      };

      return () => {
        es.close();
      };
    }
  }, [transcription.id, transcription.status, onUpdate]);

  useEffect(() => {
    if (
      transcription.status !== "PENDING" &&
      transcription.status !== "IN_PROGRESS"
    ) {
      getTranscription(transcription.id).then((t) => {
        if (t) {
          setTranscription(t);
          onUpdate(t);
        }
      });
    }
  }, [transcription.id, transcription.status, onUpdate]);

  const handleCancel = async () => {
    setCancelling(true);
    const ok = await cancelTranscription(transcription.id);
    if (ok) {
      setTranscription((prev) => {
        const updated = { ...prev, status: "CANCELLED" as const };
        onUpdate(updated);
        return updated;
      });
    }
    setCancelling(false);
  };

  const handleDownload = () => {
    if (!transcription.text) return;
    const blob = new Blob([transcription.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = transcription.originalName.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}-transcricao.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const config = statusConfig[transcription.status];
  const StatusIcon = config.icon;
  const isActive =
    transcription.status === "PENDING" ||
    transcription.status === "IN_PROGRESS";

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {transcription.originalName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 text-sm ${config.color}`}>
                <StatusIcon className={`w-4 h-4 ${isActive ? "animate-spin" : ""}`} />
                {config.label}
              </span>
              {transcription.status === "IN_PROGRESS" && (
                <span className="text-sm text-blue-600 font-medium">
                  {transcription.progress}%
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {cancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Cancelar
              </button>
            )}
            {transcription.status === "COMPLETED" && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Baixar TXT
              </button>
            )}
          </div>
        </div>

        {isActive && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${transcription.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {transcription.status === "ERROR" && transcription.errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-700">{transcription.errorMessage}</p>
          </div>
        )}

        {transcription.status === "COMPLETED" && transcription.text ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Preview</h4>
              <span className="text-xs text-gray-400">
                {transcription.text.split(/\s+/).length} palavras
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                {transcription.text}
              </pre>
            </div>
          </div>
        ) : isActive ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
            <p className="text-gray-500">
              {transcription.status === "PENDING"
                ? "Aguardando processamento..."
                : "Transcrevendo áudio..."}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Isso pode levar alguns minutos
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>Nenhum texto disponível</p>
          </div>
        )}
      </div>
    </div>
  );
}
