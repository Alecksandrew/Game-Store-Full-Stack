import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import {
  useFormContext,
  Controller,
  type RegisterOptions,
} from "react-hook-form";

type RatingValue = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
const labels: Record<RatingValue, string> = {
  0.5: "Useless",
  1: "Poor",
  1.5: "Poor+",
  2: "Ok",
  2.5: "Ok+",
  3: "Good",
  3.5: "Good+",
  4: "Excellent",
  4.5: "Amazing",
  5: "Perfect",
};

function getLabelText(value: number): string {
  return `${value} Star${value > 1 ? "s" : ""}, ${
    labels[value as RatingValue]
  }`;
}
function getLabelTextColor(value: number): string {
  if (value < 2) return "#ff0040";
  else if (value < 4) return "#ffbf00";
  else return "#7cfc00";
}

interface RatingStarsProps {
  name: string;
  rules?: RegisterOptions;
}

export default function RatingStars({ name, rules }: RatingStarsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  const [hover, setHover] = useState<number>(-1);

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
            <Rating
              {...field}
              precision={0.5}
              getLabelText={getLabelText}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              sx={{
                "& .MuiRating-icon": {
                  stroke: "#ffbf00",
                  strokeWidth: 1,
                },
              }}
            />
            {field.value !== null && (
              <Box
                sx={{
                  ml: 2,
                  color: getLabelTextColor(hover !== -1 ? hover : field.value),
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                {labels[(hover !== -1 ? hover : field.value) as RatingValue]}
              </Box>
            )}
          </Box>
        )}
      />
      {fieldError && (
        <span className="text-red-500 text-sm mt-1">
          {fieldError.message as string}
        </span>
      )}
    </Box>
  );
}
