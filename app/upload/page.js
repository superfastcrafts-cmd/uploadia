'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((accepted) => {
    setFiles((prev) => [...prev, ...accepted]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Upload</h1>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-8 text-center ${isDragActive ? 'bg-gray-50' : ''}`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li key={i} className="text-sm text-gray-700">
              {f.name} — {(f.size / 1024).toFixed(1)} KB
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}