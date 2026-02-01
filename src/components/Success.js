import React, { useState } from "react";

// Import GIF with fallback
const kisses = require("../kisses.gif").default || "../kisses.gif";

/**
 * Success component with a soft, playful love note
 * and a WhatsApp DM call-to-action.
 *
 * @returns {JSX.Element}
 */
const Success = () => {
  // Phrases to revolve around the gif
  const phrases = [
    "Somewhere between time zones and late-night calls, I fell even deeper in love with you.",
    "This Valentine’s Day is ours — written in patience, sealed with hope, and filled with love.",
    "Proof that distance can’t stop love — it only makes it stronger.",
    "Counting down the days until hugs replace video calls and kisses replace emojis 💌",
    "Miles may separate us, but my heart never learned what distance means.",
    "This Valentine’s Day, I’m sending you all my love across the miles — until I can give it to you in person.",
  ];

  return (
    <div
      className="App-success"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      {/* Instruction text */}
      <p style={{ marginTop: "18px", marginBottom: "6px", fontSize: "18px" }}>
        Click a box to view
      </p>

      {/* Centered gif with revolving phrases */}
      <SuccessInner phrases={phrases} kisses={kisses} handleReject={() => {}} />
    </div>
  );
};

// extract inner component so we can use local state for modal
const SuccessInner = ({ phrases, kisses }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const openModal = (text) => {
    setSelected(text);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected("");
  };

  return (
    <div className={`Success-center ${modalOpen ? "open" : ""}`}>
      <div className={`Success-rotor ${modalOpen ? "paused" : ""}`}>
        {phrases.map((p, i) => (
          <div
            key={i}
            className="Success-phrase"
            onClick={() => openModal(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(p); }}
            style={{ transform: `rotate(${(360 / phrases.length) * i}deg) translateY(-140px)`, cursor: 'pointer' }}
          >
            {p}
          </div>
        ))}
      </div>

      <img className="App-gif Success-gif" src={kisses} alt="Kisses just for you" />

      {modalOpen && (
        <div className="Success-modal" onClick={closeModal}>
          <div className="Success-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="Success-close" onClick={closeModal} aria-label="Close">×</button>
            <div className="Success-modal-text">{selected}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;


