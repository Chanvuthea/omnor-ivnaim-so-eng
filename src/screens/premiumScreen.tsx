import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";
import CherryBlossom from "../components/effect/CherryBloossom";
import AudioPlayer from "../components/AudioPlayer";
import PremiumContent from "../components/premium/premiumCotentent";

import { Moul, Moulpali } from "next/font/google";

const moulFont = Moul({
  subsets: ["khmer"],
  weight: "400",
});
const moulpaliFont = Moulpali({
  subsets: ["khmer"],
  weight: "400",
});

interface PremiumScreenProps {
  coupleData?: any;
  IMAGE_URL?: string;
}

const PremiumScreen: React.FC<PremiumScreenProps> = ({
  coupleData,
  IMAGE_URL,
}) => {
  const splitURL = window.location.href.split("&");
  const name = splitURL[splitURL.length - 1].includes("=")
    ? splitURL[splitURL.length - 1].split("=")
    : "";
  const finalName = name ? decodeURIComponent(name[splitURL.length - 1]) : "";
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinish, setisFinish] = useState(false);

  const widthBox = window.innerWidth;
  const getScale = () => {
    if (widthBox < 768) {
      // iPad portrait or smaller
      return { scale: isOpen ? 1 : 2 };
    } else if (widthBox < 1024) {
      // iPad landscape or medium tablets
      return { scale: isOpen ? 1 : 2 };
    } else {
      // Larger screens
      return { scale: isOpen ? 1 : 2 };
    }
  };

  const leftHalfAnimation = useSpring({
    transform: isOpen
      ? `perspective(${widthBox}px) rotateY(-180deg) scale(0.98)`
      : `perspective(${widthBox}px) rotateY(0deg) scale(1)`,
    opacity: isOpen ? 0.9 : 1,
    transformOrigin: "center left",
    config: {
      tension: 170,
      friction: 260,
      mass: 1,
      easing: (t) => t * (2 - t),
    },
  });

  const rightHalfAnimation = useSpring({
    transform: isOpen
      ? `perspective(${widthBox}px) rotateY(180deg) scale(0.98)`
      : `perspective(${widthBox}px) rotateY(0deg) scale(1)`,
    opacity: isOpen ? 0.9 : 1,
    transformOrigin: "center right",
    config: {
      tension: 170,
      friction: 260,
      mass: 1,
      easing: (t) => t * (2 - t),
    },
  });

  const bgMountainLayer = useSpring({
    ...getScale(),
    config: { duration: 2000 },
  });

  const logo = useSpring({
    from: { y: 200, opacity: isAnimating ? 1 : 0 },
    to: { y: isAnimating ? 1000 : 200, opacity: isAnimating ? 0 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });

  const onOpen = () => {
    setIsAnimating(!isAnimating);
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 1000);

    setTimeout(() => {
      setisFinish(!isFinish);
    }, 2500);
  };
  const [loaded, setLoaded] = useState(false);
  const [loadedRight, setLoadedRight] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };
  const handleLoadRight = () => {
    setLoadedRight(true);
  };

  return (
    <div
      className="relative w-full h-screen font-normal overflow-x-hidden"
      style={{ overflow: isOpen ? "auto" : "auto" }}
    >
      <img
        src={`${coupleData?.list_family_name?.left_door}`}
        alt=""
        onLoad={handleLoad}
        style={{ display: "none" }}
      />
      <img
        src={`${coupleData?.list_family_name?.right_door}`}
        alt=""
        onLoad={handleLoadRight}
        style={{ display: "none" }}
      />
      {!isFinish && loaded && loadedRight && (
        <div
          style={{ display: "flex", width: widthBox }}
          className="h-screen absolute z-20"
        >
          <animated.div
            style={{
              width: `${widthBox / 2}%`,
              height: "100%",
              border: "2px solid #000",
              transformStyle: "preserve-3d",
              ...leftHalfAnimation,
              backgroundImage: `url(${coupleData?.list_family_name?.left_door})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <animated.div
            style={{
              width: `${widthBox / 2}%`,
              height: "100%",
              border: "2px solid #000",
              transformStyle: "preserve-3d",
              backgroundImage: `url(${coupleData?.list_family_name?.right_door})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              ...rightHalfAnimation,
            }}
          />

          <animated.div
            className={` absolute justify-center flex w-screen ${moulpaliFont.className}`}
            style={{ ...logo }}
            onClick={onOpen}
          >
            <img
              src={`${IMAGE_URL}${coupleData?.floral_button_background?.url}`}
              className=" w-2/4 md:w-2/6 h-full object-cover"
            ></img>
            <p className=" text-center text-base md:text-2xl text-amber-50 absolute top-1/2 -mt-4">
              បើកធៀប
            </p>
          </animated.div>
          <animated.div
            className={` absolute justify-center flex w-screen flex-col top-2/6 pt-20 ${moulpaliFont.className}`}
            style={{ ...logo }}
          >
            <p className=" text-center text-3xl md:text-5xl text-amber-50 ">
              សិរីមង្គលអាពាហ៏ពិពាហ៏
            </p>
            <p className=" text-center text-base md:text-2xl text-amber-50 p-5">
              សូមគោរពអញ្ជើញ
            </p>
            <p className=" text-center text-xl  md:text-4xl text-amber-50">
              {finalName}
            </p>
          </animated.div>
        </div>
      )}

      {loaded && loadedRight && (
        <div className="w-screen absolute snap-y snap-mandatory overflow-y-auto z-0 overflow-x-hidden">
          <animated.div
            style={bgMountainLayer}
            className="w-screen h-screen relative overflow-hidden "
          >
            <div className="absolute z-0 w-full h-full">
              <img
                src={`${coupleData?.list_family_name?.background}`}
                className="w-full h-full object-cover"
                alt="Background"
                loading="lazy"
              />
            </div>
            <div className=" absolute z-0">
              <CherryBlossom />
            </div>

            <div className="absolute z-10 w-full overflow-y-auto ">
              <div className=" w-scrren h-screen ">
                <PremiumContent
                  data={{ coupleData: coupleData, IMAGE_URL: IMAGE_URL }}
                />
              </div>
            </div>
          </animated.div>
          <AudioPlayer
            src={`${IMAGE_URL}${coupleData?.background_sound?.url}`}
            isPlay={isOpen}
          />
        </div>
      )}
    </div>
  );
};

export default PremiumScreen;
