import React, { useState } from "react";

/**
 * Asking component for proposing the Valentine's Day question.
 *
 * @param {string} gif - The URL or import path of the chosen gif.
 * @param {string} altText - The alt text for the displayed gif.
 * @param {function} handleAccept - Callback function for accepting the proposal.
 * @param {function} handleReject - Callback function for rejecting the proposal.
 * @param {string} noButtonText - The text to be displayed on the rejection button.
 * @returns {JSX.Element} JSX element representing the Asking component.
 */



/**
 * Asking component for proposing the Valentine's Day question.
 */
const Asking = ({ gif, altText, handleAccept, handleReject, noButtonText }) => {
  // start with the prop text so the No button shows next to Yes initially
  const [noText, setNoText] = useState(noButtonText || "No 😅");
  const [noColor, setNoColor] = useState("#ff4d4f");
  // the No button will remain fixed next to Yes; clicks only change text/color

  // base messages for the No button (expanded — more playful/varied)
  const noTexts = [
    "Are you sure?",
    "For real??",
    "Why na",
    "Don't do this",
    "Think again!",
    "Are you really sure?",
    "This is a big decision!",
    "No pressure, but...",
    "Just saying, it's a big deal!",
    "Think long and hard about this.",
    "This could change everything!",
    "Are you ready for this?",
    "It's a once-in-a-lifetime offer!",
    "Don't miss out on this!",
    "This is a big deal!",
    "You don't want to regret this!",
    "Just think about it.",
    "This is a big deal!",
    "You don't want to regret this!",
    "Just think about it.",
    "This is a big deal!",
    "You don't want to regret this!",

  ];
  const noColors = ["#ff4d4f", "#ff7a00", "#6a5acd", "#e91e63", "#009688"];

  // helper: shuffle an array (Fisher-Yates)
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // order to iterate through messages without repeating until all are used
  const [order, setOrder] = useState(() => shuffle(noTexts.map((_, i) => i)));
  const [orderPointer, setOrderPointer] = useState(0);
  // small emoji suffixes to make strings lively
  const emojiSuffixes = [" 😅", " 🥲", " 😭", " 😩", " 🤭", " 😜"];

  const moveNoButton = () => {
    // pick next message index from shuffled order (no immediate repeats)
    let nextPointer = orderPointer;
    const nextIndex = order[nextPointer];

    // prepare text with a random emoji suffix for extra flavor
    const suffix = emojiSuffixes[Math.floor(Math.random() * emojiSuffixes.length)];
    const nextText = `${noTexts[nextIndex]}${suffix}`;

    // pick a random color for the button
    const randomColor = noColors[Math.floor(Math.random() * noColors.length)];

    setNoText(nextText);
    setNoColor(randomColor);

    // advance pointer and reshuffle when we consumed all messages
    nextPointer = nextPointer + 1;
    if (nextPointer >= order.length) {
      setOrder(shuffle(order));
      nextPointer = 0;
    }
    setOrderPointer(nextPointer);

    // notify parent about the rejection so App can update state/text
    if (typeof handleReject === "function") handleReject();
  };

  return (
    <div
      className="Asking-container"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      {/* Cute gif */}
      <img className="App-gif" src={gif} alt={altText} />

      {/* The big question */}
      <p className="App-text">Chinchu, will you be my Valentine? 💖</p>

      {/* Buttons row: keep Yes and No on the same line */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "nowrap" }}>
        <button
          className="App-button"
          onClick={handleAccept}
        >
          Yes 🥰
        </button>

        <button
          className="App-button"
          onClick={moveNoButton}
          style={{
            backgroundColor: noColor,
            color: "#fff",
            transition: "all 0.25s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          <span style={{ fontSize: "16px", whiteSpace: "nowrap" }}>{noText}</span>
          <span style={{ fontSize: "28px", fontWeight: 900, marginTop: "6px", lineHeight: 1 }}>{"NO"}</span>
        </button>
      </div>
    </div>
  );
};

export default Asking;
