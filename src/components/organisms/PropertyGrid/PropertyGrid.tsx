import React from 'react';
import { PropertyGridProps } from './PropertyGrid.types';
import { PropertyCard } from '@/components/molecules';

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          address={property.address}
          description={property.description}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;