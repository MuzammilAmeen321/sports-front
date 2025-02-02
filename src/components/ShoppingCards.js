import { Button } from "@mui/material";
import React from "react";

const games = [
    { img: "https://i.pinimg.com/736x/07/f3/de/07f3de81d5546be4b96378a5b8404307.jpg", title: "Cricket" },
    { img: "https://i.pinimg.com/736x/df/83/8f/df838f666d637fa0f21d23f5d22993a5.jpg", title: "Football" },
    { img: "https://i.pinimg.com/736x/de/89/a2/de89a277a177938969cbffbd4417fd8b.jpg", title: "Ice Hockey" },
    { img: "https://i.pinimg.com/736x/2f/af/e8/2fafe8907196e916e19ccb632baf9e4a.jpg", title: "Kabbaddy" },
    { img: "https://i.pinimg.com/736x/ad/5a/39/ad5a3967ef30c5b7564af62800305c74.jpg", title: "Snooker" }
    
];


const GameCard = ({ game }) => (
    <figure className="card">
        <img src={game.img} alt={game.title} />
        <figcaption>{game.title}</figcaption>
    </figure>
);



const GamesNewsPage = () => {
    return (
        <div className="shopping">
            <h2><strong>Top Sports<span>({games.length})</span></strong></h2>
            <div className="cards">
                {games.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>
            
        </div>
    );
};

export default GamesNewsPage;
