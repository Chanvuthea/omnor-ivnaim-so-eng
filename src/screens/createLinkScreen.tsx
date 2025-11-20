import type React from "react";
import flowerFrame from "../assets/flowerFrame.png";
import logo from "../assets/omnor-full-logo.png";
import { useState } from "react";
import Image from "next/image";

interface CreateLinkScreenProps {
  URL: string;
}

const CreateLinkScreen: React.FC<CreateLinkScreenProps> = ({ URL }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputCoupleId, setInputCoupleId] = useState("");
  const handleCopy = () => {
    const textToCopy = `${URL}?${inputCoupleId}&name=${encodeURIComponent(
      inputValue
    )}`;

    if (navigator.clipboard) {
      // Modern Clipboard API
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy: ", err));
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
      document.body.removeChild(textarea);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${flowerFrame})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen "
    >
      <div className="w-full h-full flex flex-col px-4 sm:px-40 py-40 md:py-10 items-center">
        <div className="flex justify-center pt-10 sm:pt-40 pb-5 sm:pb-20 w-full">
          <Image
            src={logo}
            className="w-24 h-24 sm:w-50 sm:h-50 object-cover"
            alt="Logo"
            loading="lazy"
          />
        </div>
        <div className="w-full max-w-md flex flex-col items-center">
          <input
            className="bg-white h-12 rounded-lg p-2 w-full mb-4 placeholder-gray-500 text-black"
            placeholder="បញ្ចូល ID"
            value={inputCoupleId}
            onChange={(e) => setInputCoupleId(e.target.value)}
          />
          <input
            className="bg-white h-12 rounded-lg p-2 w-full mb-4 placeholder-gray-500 text-black"
            placeholder="បញ្ចូលឈ្មោះភ្ញៀវ"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-green-700 p-3 rounded-lg text-white font-bold w-full"
            onClick={handleCopy}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkScreen;
