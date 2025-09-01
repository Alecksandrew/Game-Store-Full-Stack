import DisplayRatingStars from "./DisplayRatingStars";


export default function ReviewCard({userName, rating, createdAt, description}){

    return (
        <div className="bg-bg-secondary rounded ring-2 ring-primary">
            <div>
                <span className="font-orbitron text-text-primary">{userName}</span><DisplayRatingStars ratingValue={rating}/> <span>{createdAt}</span>
            </div>
            <p className="text-text-primary font-inter">{description}</p>
        </div>
    );
}