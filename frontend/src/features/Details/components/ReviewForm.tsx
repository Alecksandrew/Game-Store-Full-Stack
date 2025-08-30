import Form from "@/global/components/Form";
import RatingStars from "./RatingStars";
import { TextArea } from "@/global/components/TextArea";

interface ReviewFormData {
  rating: number;
  description: string;
}

export default function ReviewForm() {
  return (
    <div className="bg-bg-secondary rounded ring-2 ring-primary  p-4">
      <Form<ReviewFormData> submitText="Submit review">
        <h2 className="text-2xl text-text-primary">Write a review</h2>

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
    </div>
  );
}
