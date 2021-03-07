import React, { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const imgs = [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1468810/ss_0928992aa4687b7f87b18b0946874d616db66ab3.600x338.jpg?t=1614932388",
    "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/bg.png?alt=media&token=25135cda-c67f-4bc0-b39c-67b3bdcf1f9c",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1468810/ss_caaf9cd61d367f6b885b049b733300770815b597.600x338.jpg?t=1614932388",
  ];

  const [index, setIndex] = useState(1);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setIndex((index + 1) % imgs.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="homePage autoflow">
      <div className="homePage__content">
        <h1 className="homePage__title">鬼谷八荒Guigubahuang</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={imgs[index]} alt="bg" width="50%" height="50%" />
      </div>

      <div style={{ marginLeft: "100px" }}>
        <div style={{ marginTop: "30px", marginBottom: "20px" }}>
          <a href="https://store.steampowered.com/app/1468810/_/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/steam.png?alt=media&token=ccdc6f99-e672-4dc4-8e68-ac182fa3050b"
              width="30px"
              height="30px"
              alt="steam"
            />
            Get Game On Steam
          </a>
        </div>
        <div style={{ maxWidth: "800px", marginBottom: "50px" }}>
          <h3>ABOUT THIS GAME</h3>
          <br />

          <p>
            Tale of Immortal is an open-world sandbox game based on Chinese
            mythology and cultivation. You will grow to become immortal, conquer
            the beasts from the Classic of Mountains and Season, make your
            choices carefully and grasp your own destiny.
            <br />
            <br />
            <img
              src="https://cdn.cloudflare.steamstatic.com/steam/apps/1468810/extras/GIF_2020-11-6_20-27-28.gif?t=1614932388"
              alt=""
            />
            <br />
            <br />
            <h4>Live the mythology</h4>
            With a background based around ancient Chinese myths and stories,
            players will have a variety of interactive options with scenes and
            in-game NPCs, which will affect the storyline of the game and
            transform the game world.
            <br />
            <br />
            <h4>Become Immortal</h4>
            The theme of the game combines the immortal cultivation and the
            unique cultural background of The Classics of Mountain and Sea.
            Players will experience the journey from a mortal to a strong,
            god-like being.
            <br />
            <br />
            <b>Aword from the dev team:</b>
            <br />
            Our studio hopes that in this game, players will express the theme
            of "Always stick to your heart, dare to fight against difficulties;
            make choices carefully and grasp your own destiny."
          </p>
        </div>
        <div>
          <h3>SYSTEM REQUIREMENTS</h3>
          <p>
            Minimum:
            <br />
            OS: Windows 7 / Windows 8 / Windows 10 64 bit
            <br />
            Processor: 2.50GHz
            <br />
            Memory: 4 GB RAM
            <br />
            Graphics: HD4400
            <br />
            DirectX: Version 11
            <br />
            Storage: 6 GB available space
            <br />
            Additional Notes:
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
