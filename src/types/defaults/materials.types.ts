import dayjs from "dayjs";

export interface MaterialFileType {
  file_name: string;
  uploadLink: string;
  file: File;
}

export interface MaterialDefaultType {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
  note: string | null;
  link: string | null;
  files: MaterialFileType[];
  delivery_date: dayjs.Dayjs | null;
}
