import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

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
        sx={{
                "& .MuiRating-icon": {
                  stroke: "#ffbf00",
                  strokeWidth: 1,
                },
              }}
      />
      {ratingValue > 0 && (
          <Box sx={{ ml: 2, fontWeight: "bold" }}>
 
          </Box>
      )}
    </Box>
  );
}