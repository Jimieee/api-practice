export interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  description: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}