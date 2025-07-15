export interface Property {
  id: string;
  title: string;
  address: string;
  description: string;
}

export interface PropertyGridProps {
  properties: Property[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
