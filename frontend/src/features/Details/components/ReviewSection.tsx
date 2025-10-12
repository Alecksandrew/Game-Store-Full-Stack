import ReviewForm, { type ReviewFormData } from "./ReviewForm";
import useReviewManagement from "../hooks/useReviewManagement";
import {
  ReviewCardEditable,
  ReviewCardStandard,
} from "./ReviewCard/ReviewCard.presets";
import { useNavigate } from "react-router";
import Button from "@/global/components/Button/Button";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";
import { useCreateReviewByGame } from "../hooks/useCreateReviewByGame";
import { useUpdateReviewByGame } from "../hooks/useUpdateReviewByGame";
import useDeleteReviewByGame from "../hooks/useDeleteReviewByGame";
import { useContext, useState } from "react";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import isUserLogged from "@/global/utils/isUserLogged";

function LoginPrompt() {
  const navigate = useNavigate();
  return (
    <div className="bg-bg-secondary rounded ring-2 ring-primary p-4 min-h-50 text-text-primary text-center flex flex-col justify-center items-center">
      <div className="min-w-[200px] w-4/10">
        <p className="font-orbitron text-2xl font-bold">
          Login to create reviews
        </p>
        <Button
          title="Login"
          type="button"
          onClick={() => navigate(PAGE_ROUTES.AUTH.LOGIN)}
        />
      </div>
    </div>
  );
}

export default function ReviewSection({ className }: { className?: string }) {
  const { handleReviewSuccess, reviewData, myReviewData } =
    useReviewManagement();

  const { gameDetails } = useContext(GameDetailsDataContext);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const { execute: createReview, isLoading: isCreating } =
    useCreateReviewByGame(gameDetails.id);
  const { execute: updateReview, isLoading: isUpdating } =
    useUpdateReviewByGame(editingReviewId || 0);
  const { execute: deleteReview, isLoading: isDeleting } =
    useDeleteReviewByGame();

  async function handleCreate(data: ReviewFormData) {
    await createReview(data);
    handleReviewSuccess();
  }

  async function handleUpdate(data: ReviewFormData) {
    await updateReview(data);
    setEditingReviewId(null);
    handleReviewSuccess();
  }

  async function handleDelete(reviewId: number) {
    await deleteReview(reviewId);
    handleReviewSuccess();
  }

  function listMyReviewCards() {
    return myReviewData?.map((review) => {
      const isCurrentlyEditing = editingReviewId === review.id;

      if (isCurrentlyEditing) {
        return (
          <li key={`editing-${review.id}`}>
            <ReviewForm
              onSubmit={handleUpdate}
              isLoading={isUpdating}
              initialData={{
                rating: review.rating,
                description: review.description,
              }}
              submitButtonText="Update Review"
              title="Edit your review"
              onCancel={() => setEditingReviewId(null)}
            />
          </li>
        );
      }

      return (
        <li key={review.id}>
          <ReviewCardEditable
            data={review}
            onEditClick={() => setEditingReviewId(review.id)}
            onDeleteClick={() => handleDelete(review.id)}
            isLoading={isDeleting || isUpdating}
          />
        </li>
      );
    });
  }

  function listReviewCards() {
    return reviewData?.data?.map((review) => (
      <li key={review.id}>
        <ReviewCardStandard data={review} />
      </li>
    ));
  }

  return (
    <section className={className}>
      <h2 className="text-text-primary text-3xl mb-3">Reviews</h2>
      {isUserLogged() ? (
        <ReviewForm
          onSubmit={handleCreate}
          isLoading={isCreating}
          submitButtonText="Submit a New Review"
          title="Write a review"
        />
      ) : (
        <LoginPrompt />
      )}
      <ul className="flex flex-col gap-4 mt-5">
        {listMyReviewCards()}
        {listReviewCards()}
      </ul>
    </section>
  );
}
