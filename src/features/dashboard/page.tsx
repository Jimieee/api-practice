import React, { useState } from 'react';
import { SectionHeader } from '@/components/molecules/PropertyHeader';
import { PropertyFormData, PropertyFormModal, PropertyGrid } from '@/components/organisms';
import { useProperties } from '@/features/properties/hooks/useProperties';
import { Property } from '@/features/properties/types/property.types';

interface ModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  editingProperty?: Property;
}

// interface DeleteState {
//   isOpen: boolean;
//   propertyId?: number;
//   propertyName?: string;
// }

const DashboardPage: React.FC = () => {
  const {
    properties,
    loading,
    error,
    createProperty,
    updateProperty,
  } = useProperties();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'create',
  });

  // const [deleteState, setDeleteState] = useState<DeleteState>({
  //   isOpen: false,
  // });

  const [actionLoading, setActionLoading] = useState(false);

  const handleAddNew = () => {
    setModalState({
      isOpen: true,
      mode: 'create',
      editingProperty: undefined,
    });
  };

  const handleEdit = (id: string) => {
    const property = properties.find(p => p.id === parseInt(id));
    if (property) {
      setModalState({
        isOpen: true,
        mode: 'edit',
        editingProperty: property,
      });
    }
  };

  // const handleDelete = (id: string) => {
  //   const property = properties.find(p => p.id === parseInt(id));
  //   if (property) {
  //     setDeleteState({
  //       isOpen: true,
  //       propertyId: property.id,
  //       propertyName: property.name,
  //     });
  //   }
  // };

  const handleFormSubmit = async (data: PropertyFormData) => {
    setActionLoading(true);

    try {
      if (modalState.mode === 'create') {
        await createProperty(data);
      } else if (modalState.editingProperty) {
        await updateProperty(modalState.editingProperty.id, data);
      }

      setModalState({ isOpen: false, mode: 'create' });
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setActionLoading(false);
    }
  };

  // THE DELETE ROUTE IS NOT IN THE API (im tired lol)
  // const handleConfirmDelete = async () => {
  //   if (!deleteState.propertyId) return;

  //   setActionLoading(true);

  //   try {
  //     await deleteProperty(deleteState.propertyId);
  //     setDeleteState({ isOpen: false });
  //   } catch (error) {
  //     console.error('Error deleting property:', error);
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  const handleCloseModal = () => {
    if (!actionLoading) {
      setModalState({ isOpen: false, mode: 'create' });
    }
  };

  // const handleCloseDeleteDialog = () => {
  //   if (!actionLoading) {
  //     setDeleteState({ isOpen: false });
  //   }
  // };

  const getInitialFormData = (): PropertyFormData | undefined => {
    if (modalState.mode === 'edit' && modalState.editingProperty) {
      return {
        id: modalState.editingProperty.id,
        name: modalState.editingProperty.name,
        address: modalState.editingProperty.address,
        description: modalState.editingProperty.description,
        image: null,
      };
    }
    return undefined;
  };

  const gridProperties = properties.map(property => ({
    id: property.id.toString(),
    title: property.name,
    address: property.address,
    description: property.description,
    image: property.image,
  }));

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error al cargar las propiedades
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Alojamientos"
          onAddNew={handleAddNew}
        />

        {loading && !actionLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <PropertyGrid
            properties={gridProperties}
            onEdit={handleEdit}
          />
        )}
      </div>

      <PropertyFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={getInitialFormData()}
        mode={modalState.mode}
        loading={actionLoading}
      />
    </div>
  );
};

export default DashboardPage;