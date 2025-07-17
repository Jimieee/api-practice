import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { SectionHeaderProps } from "./SectionHeader.types";
import { Typography } from "@/components/atoms";

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onAddNew,
}) => {
  return (
    <div className="flex flex-col items-start gap-4 w-full mb-4">
      <Typography variant="h2" className="text-2xl font-bold">
        {title}
      </Typography>

      <Button onClick={onAddNew} className="flex items-center gap-2">
        <Plus size={16} />
        Nueva Reservación
      </Button>
    </div>
  );
};
