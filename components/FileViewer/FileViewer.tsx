import { FileText } from "lucide-react";

function FileViewer({ url }: { url: string }) {
  const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url);
  const isPdf = /\.pdf$/i.test(url);
  const isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(url);
  if (isImage)
    return (
      <img src={url} alt="anexo" className="w-full rounded-xl object-cover" />
    );
  if (isPdf)
    return (
      <div className="flex flex-col gap-1">
        <iframe
          src={url}
          className="w-full h-[600px] rounded-xl border border-gray-100"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--secondary)] hover:underline self-end"
        >
          Abrir em nova aba ↗
        </a>
      </div>
    );
  if (isDoc)
    return (
      <div className="flex flex-col gap-1">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
          className="w-full h-[600px] rounded-xl border border-gray-100"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--secondary)] hover:underline self-end"
        >
          Abrir em nova aba ↗
        </a>
      </div>
    );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:underline"
    >
      <FileText size={15} /> Ver arquivo
    </a>
  );
}

export default FileViewer;
