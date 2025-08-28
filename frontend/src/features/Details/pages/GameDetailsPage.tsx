import GameMediaGallery from "../components/GameMediaGallery";



export default function GameDetailsPage(){
const screenshotUrls = [
  "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scb1p5.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc81ff.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scagdm.jpg",
  "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdpfd.jpg"
];
    return <GameMediaGallery screenshotUrls={screenshotUrls}/>;
}