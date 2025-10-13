
import { Button } from "@/global/components/Button";
import RatingStars from "./RatingStars";
import { TextArea } from "@/global/components/TextArea/TextArea";
import { Form } from "@/global/components/Form";

export interface ReviewFormData {
  rating: number;
  description: string;
}


interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void> | void;
  isLoading: boolean;
  onCancel?: () => void;
  initialData?: ReviewFormData;
  submitButtonText: string;
  title: string;
  className?: string;
}

export default function ReviewForm({
  onSubmit,
  isLoading,
  onCancel,
  initialData,
  submitButtonText,
  title,
  className,
}: ReviewFormProps) {


  return (
    <Form.Root<ReviewFormData>
      // As classes de estilo do container são passadas aqui
      className={`bg-bg-secondary rounded ring-2 ring-primary p-4 ${className}`}
      // As props do formulário são centralizadas no Root
      onSubmit={onSubmit}
      defaultValues={initialData}
    >
      {/* 2. O título agora vive dentro de uma peça semântica: Form.Header */}
      <Form.Header title={title}/>
  

      {/* 3. Os campos do formulário são agrupados dentro do Form.Body */}
      <Form.Body>
        <label className="font-inter font-bold text-text-primary md:text-lg block mb-3">
          Rating
          <RatingStars
            name="rating"
            rules={{ required: "Please select a rating." }}
          />
        </label>
        <TextArea
          className="mt-3"
          label="Your review"
          name="description"
          rules={{
            maxLength: {
              value: 300,
              message: "Your review must be at most 300 characters long.",
            },
          }}
          placeholder="What did you think of the game?"
        />
      </Form.Body>

      {/* 4. Todas as ações, incluindo o botão Cancelar, ficam juntas no Form.Actions */}
      <Form.Actions>
        <Button 
          type="submit" 
          disabled={isLoading}
        >
          {submitButtonText}
        </Button>

        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="text-white bg-red-500 hover:bg-red-600" // A margem 'mt-2' pode ser removida se o Form.Actions já tiver um 'gap'.
          >
            Cancel
          </Button>
        )}
      </Form.Actions>
    </Form.Root>
  );
}