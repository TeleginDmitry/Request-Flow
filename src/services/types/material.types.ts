interface MaterialCreationType {
  name: string;
  request_id: number;
  quantity: number;
  unit: string;
  residue: number;
  note: string | null;
  link: string | null;
  delivery_date: string | null;
}

interface MaterialUpdationType {
  id: number;
  name: string;
  request_id: number;
  quantity: number;
  unit: string;
  residue: number;
  note: string | null;
  link: string | null;
  delivery_date: string | null;
}

export { MaterialCreationType, MaterialUpdationType };
