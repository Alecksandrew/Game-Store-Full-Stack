import { useState } from "react";
import { ReviewCard } from ".";
import ReviewForm from "../ReviewForm";
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

export function ReviewCardEditable({
  data,
  onReviewUpdate,
}: {
  data: ReviewCardContextType;
  onReviewUpdate: () => void;
}) {
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
        <ReviewCard.EditButton onClick={() => setIsEditing(true)} />
        <ReviewCard.DeleteButton />
      </ReviewCard.Actions>
      <ReviewCard.Description />
    </ReviewCard.Root>
  );
}
