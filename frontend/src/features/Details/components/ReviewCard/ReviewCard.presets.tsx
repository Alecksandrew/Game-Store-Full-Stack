import { useState } from "react";
import { ReviewCard } from ".";
import ReviewForm from "../ReviewForm";
import type { ReviewCardContextType } from "./ReviewCardContext";
import useDeleteReviewByGame from "../../hooks/useDeleteReviewByGame";

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

export function ReviewCardEditable({
  data,
  onReviewUpdate,
}: {
  data: ReviewCardContextType;
  onReviewUpdate: () => void; // This gonna help re render the state of the father component on sucess of update or delete review
}) {
  const { execute, isLoading } = useDeleteReviewByGame(data.id);

  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ReviewForm
        mode="update"
        initialData={data}
        reviewId={data.id}
        onReviewSubmitSuccess={() => {
          setIsEditing(false);
          onReviewUpdate();
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <ReviewCard.Root data={data}>
      <ReviewCard.Header>
        <ReviewCard.UserName />
        <ReviewCard.RatingStars />
        <ReviewCard.Date />
      </ReviewCard.Header>
      <ReviewCard.Actions>
        <ReviewCard.EditButton
          onClick={() => setIsEditing(true)}
          disabled={isLoading}
        />
        <ReviewCard.DeleteButton
          onClick={() => {
            execute(null);
            onReviewUpdate();
          }}
          disabled={isLoading}
        />
      </ReviewCard.Actions>
      <ReviewCard.Description />
    </ReviewCard.Root>
  );
}
