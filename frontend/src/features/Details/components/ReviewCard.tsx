import DisplayRatingStars from "./DisplayRatingStars";

export default function ReviewCard({
  userName,
  rating,
  createdAt,
  description,
}) {
  return (
    <div className="bg-bg-secondary rounded ring-2 ring-primary min-h-20 p-4">
      <div className="flex flex-wrap gap-1 text-text-primary items-center">
        <span className="font-orbitron text-text-primary text-2xl font-bold">
          {userName}
        </span>
        <span className="ml-2">
          {" "}
          <DisplayRatingStars ratingValue={rating} />{" "}
        </span>
        <span className=" text-text-secondary font-medium">
          {createdAt}
        </span>
      </div>

      <p className="font-inter mt-5  text-text-secondary font-medium">
        {description}
      </p>
    </div>
  );
}
