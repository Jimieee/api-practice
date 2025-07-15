import { Edit, Trash2, MapPin } from 'lucide-react';
import { Button, Typography } from '@/components/atoms';
import { PropertyCardProps } from './PropertyCard.types';

const PropertyCard = ({
  id,
  title,
  address,
  description,
  onEdit,
  onDelete
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Typography variant="h4" className="mb-2">
            {title}
          </Typography>
          <div className="flex items-center text-slate-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <Typography variant="body2" color="secondary">
              {address}
            </Typography>
          </div>
          <Typography variant="body2" color="muted">
            {description}
          </Typography>
        </div>
        <div className="flex space-x-2 ml-4">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(id)}
              icon={<Edit className="w-4 h-4" />}
            />
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              icon={<Trash2 className="w-4 h-4" />}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;