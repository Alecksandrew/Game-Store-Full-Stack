import { ReviewCard } from ".";
import type { ReviewCardContextType } from "./ReviewCardContext";



export function ReviewCardStandard({data}:{data:ReviewCardContextType}){
    return(
        <ReviewCard.Root data={data}>
            <ReviewCard.Header>
                <ReviewCard.UserName/>
                <ReviewCard.RatingStars/>
                <ReviewCard.Date/>
            </ReviewCard.Header>
            <ReviewCard.Description/>
        </ReviewCard.Root>
    )
}



export function ReviewCardEditable({data}:{data:ReviewCardContextType}){
    return(
        <ReviewCard.Root data={data}>
            <ReviewCard.Header>
                <ReviewCard.UserName/>
                <ReviewCard.RatingStars/>
                <ReviewCard.Date/>
            </ReviewCard.Header>
            <ReviewCard.Actions>
                <ReviewCard.EditButton/>
                <ReviewCard.DeleteButton/>
            </ReviewCard.Actions>
            <ReviewCard.Description/>
        </ReviewCard.Root>
    )
}