import React, { useState } from "react";
import { FaHeart, FaTimes  } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./App.css"; 

function App() {
  const cats = [
    { id: 1, name: "Milo", img: "https://cataas.com/cat?1" },
    { id: 2, name: "Luna", img: "https://cataas.com/cat?2" },
    { id: 3, name: "Oliver", img: "https://cataas.com/cat?3" },
    { id: 4, name: "Bella", img: "https://cataas.com/cat?4" },
    { id: 5, name: "Leo", img: "https://cataas.com/cat?5" },
    { id: 6, name: "Cake", img: "https://cataas.com/cat?6" },
    { id: 7, name: "Coffee", img: "https://cataas.com/cat?7" },
    { id: 8, name: "Mia", img: "https://cataas.com/cat?8" },
    { id: 9, name: "Lucky", img: "https://cataas.com/cat?9" },
    { id: 10, name: "YoYo", img: "https://cataas.com/cat?10" },
    
  ];

  const [catStack, setCatStack] = useState(cats);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleSwipe = (direction, cat) => {
    if (direction === "right") {
      setLikedCats((prev) => [...prev, cat]);
    }
    setCatStack((prev) => {
      const newStack = prev.filter((c) => c.id !== cat.id);
      if (newStack.length === 0) setFinished(true);
      return newStack;
    });
  };

  if (finished) {
    return (
      <div className="summaryContainer">
        <p className="summaryTitle">Your Cat Preferences</p>
        <p className="summaryText">
          <FaHeart color="red"/> {likedCats.length}/{cats.length} liked
        </p>
        <div className="summaryGrid">
          {likedCats.map((cat) => (
            <div key={cat.id} className="summaryCard">
              <img src={cat.img} alt={cat.name} className="summaryImg" />
              <div className="summaryName">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="appContainer">
      <h2>Find Your Favourite Kitty</h2>
      <div className="cardStack">
        {catStack.map((cat, index) => (
          <SwipeCard
            key={cat.id}
            cat={cat}
            onSwipe={handleSwipe}
            isTop={index === catStack.length - 1}
          />
        ))}
      </div>
      {catStack.length > 0 && (
        <div className="actionButtons">
          <button
            className="btnDislike"
            onClick={() => handleSwipe("left", catStack[catStack.length - 1])}
          >
            <FaTimes/>
          </button>
          <button
            className="btnLike"
            onClick={() => handleSwipe("right", catStack[catStack.length - 1])}
          >
            <FaHeart/>
          </button>
        </div>
      )}
    </div>
  );
}

function SwipeCard({ cat, onSwipe, isTop }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-150, 0, 150], [1, 1, 1]);

  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  return (
    <motion.div
      className="swipeCard"
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      whileTap={{ scale: isTop ? 1.05 : 1 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 150) onSwipe("right", cat);
        else if (info.offset.x < -150) onSwipe("left", cat);
      }}
    >
      <img src={cat.img} alt={cat.name} className="cardImg" draggable="false"/>
      <div className="cardName">{cat.name}</div>

      <motion.div className="swipeLabel likeLabel" style={{ opacity: likeOpacity }}>
        <FaHeart/>
      </motion.div>
      <motion.div className="swipeLabel nopeLabel" style={{ opacity: nopeOpacity }}>
        <FaTimes/>
      </motion.div>
    </motion.div>
  );
}

export default App;
