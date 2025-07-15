export interface Property {
  id: string;
  title: string;
  address: string;
  description: string;
}

export interface PropertyListProps {
  properties: Property[];
  loading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  emptyMessage?: string;
}