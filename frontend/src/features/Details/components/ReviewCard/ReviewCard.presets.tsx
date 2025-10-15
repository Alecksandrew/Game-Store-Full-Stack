
import { ReviewCard } from ".";
import type { ReviewCardContextType } from "./ReviewCardContext";

export function ReviewCardStandard({ data }: { data: ReviewCardContextType }) {
  return (
    <ReviewCard.Root data={data}>
      <ReviewCard.Header>
        <ReviewCard.UserName />
        <ReviewCard.RatingStars />
        <ReviewCard.Date />
      </ReviewCard.Header>
      <ReviewCard.Description />
    </ReviewCard.Root>
  );
}


interface ReviewCardEditableProps {
  data: ReviewCardContextType;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isLoading: boolean;
}

export function ReviewCardEditable({
  data,
  onEditClick,
  onDeleteClick,
  isLoading,
}: ReviewCardEditableProps) {
  
  return (
    <ReviewCard.Root data={data}>
      <ReviewCard.Header>
        <ReviewCard.UserName />
        <ReviewCard.RatingStars />
        <ReviewCard.Date />
      </ReviewCard.Header>
      <ReviewCard.Actions>
        <ReviewCard.EditButton onClick={onEditClick} disabled={isLoading} />
        <ReviewCard.DeleteButton
          onClick={onDeleteClick}
          disabled={isLoading}
        />
      </ReviewCard.Actions>
      <ReviewCard.Description />
    </ReviewCard.Root>
  );
}
