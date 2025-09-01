import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels:Record<number,string> = {
  0.5: "Useless", 1: "Poor", 1.5: "Poor+", 2: "Ok", 2.5: "Ok+",
  3: "Good", 3.5: "Good+", 4: "Excellent", 4.5: "Amazing", 5: "Perfect",
};
interface DisplayRatingStarsProps {
  ratingValue: number;
}

export default function DisplayRatingStars({ ratingValue }: DisplayRatingStarsProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Rating
        name="read-only-rating"
        value={ratingValue} 
        precision={0.5}
        readOnly 
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {ratingValue > 0 && (
          <Box sx={{ ml: 2, fontWeight: "bold" }}>
              {labels[ratingValue]}
          </Box>
      )}
    </Box>
  );
}