import { FileType } from "@mytypes/api/file/file.types";
import { createContext } from "react";

interface FilexContextType {
  files: FileType[];
  showFiles: (files: FileType[]) => void;
  clearFiles: () => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

export const FilesContext = createContext<FilexContextType>({
  showFiles: () => {},
  files: [],
  isOpen: false,
  toggleOpen: () => {},
  clearFiles: () => {},
});
