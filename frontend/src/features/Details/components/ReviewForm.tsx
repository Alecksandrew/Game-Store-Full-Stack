import Form from "@/global/components/Form";
import RatingStars from "./RatingStars";
import { TextArea } from "@/global/components/TextArea";
import { useCreateReviewByGame } from "../hooks/useCreateReviewByGame";
import { useNavigate, useParams } from "react-router";
import { useUpdateReviewByGame } from "../hooks/useUpdateReviewByGame";
import Button from "@/global/components/Button";
import isUserLogged from "@/global/utils/isUserLogged";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";

interface ReviewFormData {
  rating: number;
  description: string;
}

interface ReviewFormProps {
  onReviewSubmitSuccess: () => void;
  mode: "create" | "update";
  initialData?: ReviewFormData;
  onCancel?: () => void;
  reviewId?: number;
}

export default function ReviewForm({
  onReviewSubmitSuccess,
  mode,
  initialData,
  onCancel,
  reviewId,
}: ReviewFormProps) {
  const params = useParams();
  const gameId = Number(params.id);
  const createReview = useCreateReviewByGame(gameId);
  const updateReview = useUpdateReviewByGame(reviewId || 0);
  const navigate = useNavigate();

  const { execute, isLoading, warningComponent, warningType } =
    mode === "create" ? createReview : updateReview;

  async function onFormSubmit(data: ReviewFormData) {
    await execute(data);
    onReviewSubmitSuccess();
  }

  if (!isUserLogged()) {
    return (
      <div className="bg-bg-secondary rounded ring-2 ring-primary p-4 min-h-50 text-text-primary text-center flex flex-col justify-center items-center">
        <div className="min-w-[200px]  w-4/10">
          <p className="font-orbitron text-2xl font-bold">Login to create your reviews</p>
          <Button title="Login" type="button" onClick={() => navigate(PAGE_ROUTES.AUTH.LOGIN)} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded ring-2 ring-primary  p-4">
      {warningType == "error" && warningComponent}
      <Form<ReviewFormData>
        submitText={mode === "create" ? "Submit review" : "Update review"}
        onSubmit={onFormSubmit}
        isLoading={isLoading}
        defaultValues={initialData}
      >
        <h2 className="text-2xl text-text-primary">
          {mode === "create" ? "Write a review" : "Edit your review"}
        </h2>

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
      {mode === "update" && (
        <Button
          title="Cancel"
          type="button"
          onClick={onCancel}
          className="text-white bg-red-500 hover:bg-red-600..."
        />
      )}
    </div>
  );
}
