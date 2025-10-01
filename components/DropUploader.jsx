"use client";

import { useState, useRef, useCallback } from "react";

export default function DropUploader() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState([]); // {name, size, type, url, status, error}
  const inputRef = useRef(null);

  const onPick = () => inputRef.current?.click();

  const handleFiles = useCallback(async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    const toUpload = Array.from(fileList);
    setFiles(toUpload);

    for (const f of toUpload) {
      const entry = { name: f.name, size: f.size, type: f.type, status: "uploading" };
      setUploads((u) => [...u, entry]);

      try {
        const form = new FormData();
        form.append("file", f);

        const res = await fetch("/api/blob/upload", {
          method: "POST",
          body: form,
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok) {
          const msg = data?.error || `Upload failed (${res.status})`;
          setUploads((u) =>
            u.map((e) =>
              e === entry ? { ...e, status: "error", error: msg } : e
            )
          );
          continue;
        }

        setUploads((u) =>
          u.map((e) =>
            e === entry ? { ...e, status: "done", url: data.url, pathname: data.pathname } : e
          )
        );
      } catch (err) {
        setUploads((u) =>
          u.map((e) =>
            e === entry ? { ...e, status: "error", error: String(err.message || err) } : e
          )
        );
      }
    }
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const onInputChange = (e) => handleFiles(e.target.files);

  return (
    <div className="max-w-4xl mx-auto">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition
          ${dragOver ? "border-blue-600 bg-blue-50" : "border-zinc-300"}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={onInputChange}
          className="hidden"
        />
        <div className="space-y-3">
          <p className="text-lg font-semibold">Drag & drop files here</p>
          <p className="text-sm text-zinc-500">PNG, JPG, PDF, etc.</p>
          <button
            onClick={onPick}
            className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
          >
            Choose files
          </button>
        </div>
      </div>

      {/* Upload list */}
      <div className="mt-8 space-y-3">
        {uploads.length > 0 && (
          <h3 className="text-base font-semibold">Uploads</h3>
        )}
        {uploads.map((u, i) => (
          <div
            key={`${u.name}-${i}`}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="min-w-0">
              <p className="font-medium truncate">{u.name}</p>
              <p className="text-xs text-zinc-500">
                {Math.round((u.size || 0) / 1024)} KB • {u.type || "file"}
              </p>
              {u.status === "uploading" && (
                <p className="text-xs mt-1">Uploading…</p>
              )}
              {u.status === "error" && (
                <p className="text-xs mt-1 text-red-600">Error: {u.error}</p>
              )}
              {u.status === "done" && u.url && (
                <p className="text-xs mt-1">
                  <a
                    href={u.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {u.url}
                  </a>
                </p>
              )}
            </div>

            <div className="ml-4 shrink-0">
              {u.status === "uploading" && (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded bg-zinc-100">
                  In progress
                </span>
              )}
              {u.status === "done" && (
                <button
                  onClick={() => {
                    if (u.url) {
                      navigator.clipboard.writeText(u.url);
                    }
                  }}
                  className="text-xs px-3 py-1 rounded bg-emerald-600 text-white hover:opacity-90"
                >
                  Copy URL
                </button>
              )}
              {u.status === "error" && (
                <span className="inline-flex items-center text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                  Failed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}