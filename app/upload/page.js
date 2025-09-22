
'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop, noClick: false, multiple: true
  });

  async function startBatch() {
    const res = await fetch('/api/mock/start-batch', { method: 'POST' });
    const data = await res.json();
    window.location.href = `/batches/${data.id}`;
  }

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">Upload</h2>
      <div {...getRootProps()} className={"card border-2 border-dashed " + (isDragActive ? "border-indigo-400" : "border-white/10")}>
        <input {...getInputProps()} />
        <div className="text-center py-10">
          <div className="text-lg font-semibold">Drag & drop files or folders here</div>
          <div className="text-slate-400 mt-1">Each folder will become one draft listing. You can also click to choose.</div>
        </div>
      </div>

      <label className="text-sm">Or pick a folder:</label>
      <input type="file" webkitdirectory="true" directory="true" multiple className="block" />

      <div className="card">
        <div className="font-semibold mb-2">Selected files</div>
        <ul className="text-slate-300 text-sm grid gap-1 max-h-64 overflow-auto">
          {files.map((f, i)=> <li key={i}>{f.path || f.name}</li>)}
        </ul>
      </div>

      <button onClick={startBatch} className="btn w-fit">Start mock batch</button>
    </div>
  );
}
