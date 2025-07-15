import React from 'react';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';
import { SectionHeaderProps } from './SectionHeader.types';
import { Typography } from '@/components/atoms';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onAddNew,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Typography variant="h1" className="text-2xl font-bold text-gray-900">
        {title}
      </Typography>
      <Button
        onClick={onAddNew}
        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Nuevo Alojamiento</span>
      </Button>
    </div>
  );
};