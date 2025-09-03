import DisplayRatingStars from "../DisplayRatingStars";
import { useContext, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  ReviewCardContext,
  type ReviewCardContextType,
} from "./ReviewCardContext";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

/*
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
        <span className=" text-text-secondary font-medium">{createdAt}</span>
      </div>

      <p className="font-inter mt-5  text-text-secondary font-medium">
        {description}
      </p>
    </div>
  );
}
  */

//==============================================ROOT COMPONENT=======================================================

type ReviewCardRootProps = {
  data: ReviewCardContextType;
  children: ReactNode;
};

export function ReviewCardRoot({ data, children }: ReviewCardRootProps) {
  return (
    <ReviewCardContext.Provider value={data}>
      <div className="relative bg-bg-secondary rounded ring-2 ring-primary min-h-20 p-4">
        {children}
      </div>
    </ReviewCardContext.Provider>
  );
}

//==============================================HEADER COMPONENT=======================================================
export function ReviewCardHeader({ children }: { children: ReactNode }) {
  return (
    <div className=" min-w-2xs  sm:flex sm:flex-wrap gap-1 text-text-primary items-center">
      {children}
    </div>
  );
}

//==============================================USERNAME COMPONENT=======================================================

export function ReviewCardUserName() {
  const data = useContext(ReviewCardContext);

  return (
    <span className="font-orbitron text-text-primary text-2xl font-bold">
      {data?.userName}
    </span>
  );
}

//==============================================RATING STARS COMPONENT=======================================================

export function ReviewCardRatingStars() {
  const data = useContext(ReviewCardContext);

  return (
    <span className="ml-2">
      <DisplayRatingStars ratingValue={data?.rating} />
    </span>
  );
}

//==============================================DATE COMPONENT=======================================================
export function ReviewCardDate() {
  const data = useContext(ReviewCardContext);
  if (!data) return;
  console.log("REVIEW CARD DATE" + JSON.stringify(data));
  function formatDataFromAPI(date: string): string {
    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate;
  }

  const wasUpdated = data?.lastUpdatedAt != null;

  const dateToDisplay =
    data?.lastUpdatedAt == null
      ? formatDataFromAPI(data.createdAt)
      : formatDataFromAPI(data.lastUpdatedAt);

  return (
    <span className=" text-text-secondary font-medium">{wasUpdated ? `Updated at ${dateToDisplay}` : dateToDisplay}</span>
  );
}

//==============================================DESCRIPTION COMPONENT=======================================================

export function ReviewCardDescription() {
  const data = useContext(ReviewCardContext);

  return (
    <p className="font-inter mt-5  text-text-secondary font-medium">
      {data?.description}
    </p>
  );
}

//==============================================ACTIONS COMPONENT=======================================================
export function ReviewCardActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-5 absolute top-4 right-4">
      {children}
    </div>
  );
}

export function ReviewCardEditButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <RiPencilFill color="white" size={"1.7rem"} />
    </button>
  );
}

export function ReviewCardDeleteButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <FaTrash color="red" size={"1.4rem"} />
    </button>
  );
}
