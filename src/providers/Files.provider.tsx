import { FilesContext } from "@contexts/Files.context";
import { FileType } from "@mytypes/api/file/file.types";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function FilesProvider({ children }: Props) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((state) => !state);
  }

  function showFiles(files: FileType[]) {
    setFiles(files);
  }

  function clearFiles() {
    setFiles([]);
  }

  return (
    <FilesContext.Provider
      value={{ toggleOpen, isOpen, showFiles, clearFiles, files }}
    >
      {children}
    </FilesContext.Provider>
  );
}
