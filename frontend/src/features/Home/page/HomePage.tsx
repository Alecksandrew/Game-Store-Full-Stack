import GameCard from "../components/GameCard";





export default function HomePage(){

    const gameData = {
        name: "Cyberpunk 2077",
        price: "$288",
        discountPrice: "$200"
    }

    const game = {
  id: 1400,
  name: "Professor Layton and the Last Specter",
  summary: "Last Specter is the fourth game in the Professor Layton series, and is a prequel that takes place three years before the first trilogy, detailing how Professor Layton met his apprentice, Luke Triton. The game includes over 170 puzzles.\nProfessor Layton and the Last Specter also includes an additional role-playing game entitled Professor Layton's London Life, available from the start of the game. London Life, in which players interact with various characters from the series in a town called \"Little London\", was advertised to contain over 100 hours of content. London Life was removed from the European versions of the game in order to prevent a significant delay of the game's release for translation.",
  firstReleaseDate: "11/26/2009",
  coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wtl.jpg",
  screenshotsImageUrl: [
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/kbkgg8ej2oxqyokm9huz.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/mtdnixqkvqhhzfjcmovx.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/jcttc8xk15jswea5ozpl.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/x1yoke2yyxresrbrd1kt.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ruhyfxkeq3ajmpjyyo6u.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/smdkwhccm7sdyjvyjspg.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/s8q1sg8oztj5rqiim2nq.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/nfmjzhtnrugpoohdnu2y.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/mivnynbifkwjaoblt0g4.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/qi6vapufnma4ridftobo.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/kgfckybbng977cdd1vib.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/bwjuf5fzgjigfqmrx8sk.jpg"
  ],
  platforms: ["Nintendo DS"],
  videos: [
    "https://www.youtube.com/embed/FO7U_yQPm9c",
    "https://www.youtube.com/embed/qJysZOD66aI"
  ],
  price: 203,
  discountPrice: 79,
  totalSells: 0,
  availableKeysStock: 7
};

    return (
        <GameCard gameData={game}/>
    )
}