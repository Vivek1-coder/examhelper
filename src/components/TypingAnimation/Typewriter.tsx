'use client'
import React, { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ words, typingSpeed = 100, deletingSpeed = 25, delayBetweenWords = 1000 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        // Remove one character
        setText((prev) => currentWord.substring(0, prev.length - 1));
        setTypingDelay(deletingSpeed);
      } else {
        // Add one character
        setText((prev) => currentWord.substring(0, prev.length + 1));
        setTypingDelay(typingSpeed);
      }

      // Check if typing/deleting is complete
      if (!isDeleting && text === currentWord) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      } else if (isDeleting && text === "") {
        // Move to the next word
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingDelay);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, words, currentWordIndex, typingSpeed, deletingSpeed, delayBetweenWords, typingDelay]);

  return <div className="typewriter from-yellow-300 to-pink-500">{text}<span className="cursor">|</span></div>;
};

export default Typewriter;