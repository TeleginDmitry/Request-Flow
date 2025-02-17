import dayjs from "dayjs";
import { FileType } from "../file/file.types";

type UnitType = "шт" | "м";

interface MaterialType {
  id: number;
  name: string;
  request_id: number;
  quantity: number;
  unit: UnitType;
  residue: number;
  note: string | null;
  link: string | null;
  files: FileType[];
  delivery_date: string | null;
  updated_at: string;
  created_at: string;
}

export { MaterialType, UnitType };
