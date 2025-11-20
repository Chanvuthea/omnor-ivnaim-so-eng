import React, { useState, useEffect } from "react";

interface FloatingButtonProps {
  sections: string[];
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );

            setCurrentSection(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    document.querySelectorAll(".section").forEach((section, index) => {
      section.setAttribute("data-index", index.toString());
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll(".section").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.querySelectorAll(".section")[index];
    setCurrentSection(index);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textShadowStyle = {
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
  };

  return (
    <div className="fixed right-18 bottom-0 -translate-y-1/2 z-50">
      <button
        style={textShadowStyle}
        onClick={() =>
          scrollToSection(
            currentSection < sections.length - 1 ? currentSection + 1 : 0
          )
        }
        className="p-3 md:p-4 w-12 h-12 md:w-auto md:h-auto flex items-center justify-center bg-[#e7e3d8] border-amber-100 rounded-full shadow-lg hover:bg-amber-600 text-sm md:text-base transition-all duration-100 ease-in-out
             hover:opacity-90 active:opacity-80 active:scale-95"
      >
        {currentSection < sections.length - 1 ? "↓" : "↑"}
      </button>
    </div>
  );
};

export default FloatingButton;
