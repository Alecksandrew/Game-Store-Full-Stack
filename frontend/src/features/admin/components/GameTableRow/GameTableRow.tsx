// src/features/admin/components/GameTableRow/GameTableRow.tsx
import { Table } from "@/global/components/Table/index";
import type { gameTableRowProps } from "../../types/gameTableRowType";
import { FaEdit, FaKey, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import Button from "@/global/components/Table/CompoundComponents/Button";
import { useState } from "react";
import { Input } from "@/global/components/Input";
import { useUpdateGame } from "../../hooks/useAdminGameActions";
import { SimpleInput } from "@/global/components/SimpleInput";

type GameTableRowComponentProps = {
  gameInfo: gameTableRowProps;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
  isEditing: boolean;
  onSaveSuccess?: () => void; // Callback para quando salvar com sucesso
};

export default function GameTableRow({
  gameInfo,
  onEdit, 
  onCancel,
  isEditing,
  onSaveSuccess
}: GameTableRowComponentProps) {
  const { igdbId, name, price, discountPrice, availableKeys } = gameInfo;
  
  // Estado local para os valores sendo editados
  const [editPrice, setEditPrice] = useState(price);
  const [editDiscountPrice, setEditDiscountPrice] = useState(discountPrice);

  // Hook para fazer a requisição de update
  const { execute: updateGame, isLoading: isSaving, warningComponent } = useUpdateGame(igdbId);

  const handleSave = async () => {
    try {
      // Chama a API com os novos valores
      await updateGame({
        price: Number(editPrice),
        discountPrice: Number(editDiscountPrice)
      });
      
      // Se chegou até aqui, foi sucesso
      onSaveSuccess?.(); // Callback para atualizar a tabela
      onCancel(igdbId); // Sai do modo de edição
    } catch (error) {
      // O erro já é tratado pelo useApi hook
      console.error("Erro ao salvar:", error);
    }
  };

  const handleCancel = () => {
    // Reset para valores originais
    setEditPrice(price);
    setEditDiscountPrice(discountPrice);
    onCancel(igdbId);
  };

  return (
    <>
      
      <Table.Row className="border-t-1 border-blue-gray">
        <Table.Td>{igdbId}</Table.Td>
        <Table.Td>{name}</Table.Td>
        
        {/* Price Column - Editable quando isEditing */}
        <Table.Td>
          {isEditing ? (
            <SimpleInput
              type="number"
              name="price"
              step="0.01"
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              className="p-1 rounded bg-bg-primary w-20"
              disabled={isSaving}
            />
          ) : (
            price
          )}
        </Table.Td>
        
        {/* Discount Price Column - Editable quando isEditing */}
        <Table.Td>
          {isEditing ? (
            <SimpleInput
              type="number"
              step="0.01"
              value={editDiscountPrice}
              onChange={(e) => setEditDiscountPrice(Number(e.target.value))}
              className="p-1 rounded bg-bg-primary w-20"
              disabled={isSaving}
            />
          ) : (
            discountPrice
          )}
        </Table.Td>
        
        <Table.Td>{availableKeys}</Table.Td>
        
        <Table.Td>
          <Table.Actions className="flex gap-6">
            {isEditing ? (
              // Botões de Save/Cancel quando editando
              <>
                <Button 
                  onClick={handleSave} 
                  className="cursor-pointer"
                  disabled={isSaving}
                  title={isSaving ? "Saving..." : "Save"}
                >
                  <FaSave />
                </Button>
                <Button 
                  onClick={handleCancel} 
                  className="cursor-pointer"
                  disabled={isSaving}
                  title="Cancel"
                >
                  <FaTimes />
                </Button>
              </>
            ) : (
              // Botões normais quando não editando
              <>
                <Button onClick={() => onEdit(igdbId)} className="cursor-pointer">
                  <FaEdit />
                </Button>
                <Button className="cursor-pointer">
                  <FaKey />
                </Button>
              </>
            )}
          </Table.Actions>
        </Table.Td>
      </Table.Row>
    </>
  );
}