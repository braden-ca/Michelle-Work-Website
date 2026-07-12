"use client";

import { useState, useCallback } from "react";
import { upload } from "@vercel/blob/client";

export default function UploadSlot({ category, submissionId, onFilesChange }) {
  const [entries, setEntries] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const updateEntries = useCallback(
    (next) => {
      setEntries(next);
      onFilesChange(
        category.id,
        next.filter((e) => e.status === "done").map((e) => ({ name: e.name, url: e.url }))
      );
    },
    [category.id, onFilesChange]
  );

  const handleFiles = useCallback(
    async (fileList) => {
      const incoming = Array.from(fileList);
      const remainingSlots = category.maxFiles - entries.length;
      const filesToUpload = incoming.slice(0, Math.max(remainingSlots, 0));

      const pending = filesToUpload.map((file) => ({
        name: file.name,
        status: "uploading",
        progress: 0,
      }));

      let working = [...entries, ...pending];
      updateEntries(working);

      for (const file of filesToUpload) {
        try {
          const blob = await upload(
            `${submissionId}/${category.id}/${file.name}`,
            file,
            {
              access: "public",
              handleUploadUrl: "/api/upload",
              contentType: file.type || "application/octet-stream",
            }
          );

          working = working.map((e) =>
            e.name === file.name && e.status === "uploading"
              ? { ...e, status: "done", url: blob.url }
              : e
          );
          updateEntries(working);
        } catch (err) {
          working = working.map((e) =>
            e.name === file.name && e.status === "uploading"
              ? { ...e, status: "error", error: err.message }
              : e
          );
          updateEntries(working);
        }
      }
    },
    [category.id, category.maxFiles, entries, submissionId, updateEntries]
  );

  const atLimit = entries.filter((e) => e.status !== "error").length >= category.maxFiles;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-slate-300">
      <h4 className="text-sm font-semibold text-slate-900">{category.label}</h4>
      {category.note && <p className="mt-0.5 text-xs leading-5 text-slate-600">{category.note}</p>}

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (!atLimit) handleFiles(e.dataTransfer.files);
        }}
        className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-center text-xs transition-colors ${
          dragActive ? "border-amber-500 bg-amber-50" : "border-slate-300 bg-white hover:border-amber-300"
        } ${atLimit ? "pointer-events-none opacity-50" : ""}`}
      >
        <span className="font-medium text-slate-700">
          Drag &amp; Drop Files, or Browse Files
        </span>
        <span className="mt-1 text-slate-500">Up to {category.maxFiles} files</span>
        <input
          type="file"
          multiple
          className="hidden"
          disabled={atLimit}
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {entries.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {entries.map((entry, i) => (
            <li
              key={`${entry.name}-${i}`}
              className="flex items-center justify-between gap-2 rounded-md bg-white px-2.5 py-1.5 text-xs"
            >
              <span className="truncate text-slate-700">{entry.name}</span>
              {entry.status === "uploading" && (
                <span className="shrink-0 font-medium text-amber-600">Uploading…</span>
              )}
              {entry.status === "done" && (
                <span className="shrink-0 font-medium text-green-600">Uploaded</span>
              )}
              {entry.status === "error" && (
                <span className="shrink-0 font-medium text-red-600">Failed — try again</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
