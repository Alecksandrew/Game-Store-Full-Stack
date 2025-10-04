
import Form from "@/global/components/Form";
import RatingStars from "./RatingStars";
import { TextArea } from "@/global/components/TextArea";
import Button from "@/global/components/Button";

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
    <div className={`bg-bg-secondary rounded ring-2 ring-primary p-4 ${className}`}>
      <Form<ReviewFormData>
        submitText={submitButtonText}
        onSubmit={onSubmit}
        isLoading={isLoading}
        defaultValues={initialData}
      >
        <h2 className="text-2xl text-text-primary">{title}</h2>

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
      </Form>
      {onCancel && (
        <Button
          title="Cancel"
          type="button"
          onClick={onCancel}
          className="text-white bg-red-500 hover:bg-red-600 mt-2 w-full"
        />
      )}
    </div>
  );
}