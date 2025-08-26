import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useState } from "react";


type ToggleWishlistProps = {
    className: string,
}

export default function ToggleWishlist({className}:ToggleWishlistProps){
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

    return (
    <button onClick={() => setIsWishlisted(!isWishlisted)} className={`p-1 rounded bg-text-primary aspect-square flex justify-center items-center text-2xl ${className}`}>
        {isWishlisted ? <MdOutlineFavorite className="fill-primary" /> : <MdOutlineFavoriteBorder className="fill-primary"/>}
    </button>
    );
}