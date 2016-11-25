import gsap from 'gsap';


export const playerAreaMinimized = () => {
    var playerHand = new TimelineLite();

    playerHand.to(".player-side .player-controler", 1, {
        opacity: .5,
        top: 130,
        position: 'relative'
    });

    console.log("player hand");
    console.log(playerHand);
    playerHand.play();
};

export const playerAreaMaximized = () => {
    var playerHand = new TimelineLite();

    playerHand.to(".player-side .player-controler", 1, {
        opacity: 1,
        top: 0,
        position: 'relative'
    });

    playerHand.play();
};