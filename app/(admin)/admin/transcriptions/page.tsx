"use client";
import { useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { ITranscription } from "@/types/types";
import { getTranscriptions } from "@/services/apolloAPI";
import { Loader2, Upload, Mic } from "lucide-react";
import AudioUploader from "./AudioUploader";
import TranscriptionList from "./TranscriptionList";
import TranscriptionDetail from "./TranscriptionDetail";

export default function TranscriptionsPage() {
  const { user, authLoading } = useAuth();
  const [transcriptions, setTranscriptions] = useState<ITranscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadTranscriptions = useCallback(async () => {
    setLoading(true);
    const data = await getTranscriptions();
    setTranscriptions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      loadTranscriptions();
    }
  }, [user, loadTranscriptions]);

  const handleUploadComplete = (t: ITranscription) => {
    setTranscriptions((prev) => [t, ...prev]);
    setSelectedId(t.id);
  };

  const handleUpdate = (updated: ITranscription) => {
    setTranscriptions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const handleDelete = (id: string) => {
    setTranscriptions((prev) => prev.filter((t) => t.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const selected = transcriptions.find((t) => t.id === selectedId) || null;

  return (
    <div className="pb-[100px] md:pb-0 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transcrições</h1>
          <p className="text-sm text-gray-600 mt-1">
            Transcreva áudios de reuniões para texto
          </p>
        </div>
      </div>

      <AudioUploader onUploadComplete={handleUploadComplete} />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      ) : transcriptions.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Mic className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma transcrição ainda</p>
          <p className="text-sm text-gray-400 mt-1">
            Faça upload de um áudio para começar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TranscriptionList
              transcriptions={transcriptions}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={handleDelete}
            />
          </div>
          <div className="lg:col-span-2">
            {selected ? (
              <TranscriptionDetail
                transcription={selected}
                onUpdate={handleUpdate}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-400">
                  Selecione uma transcrição para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
