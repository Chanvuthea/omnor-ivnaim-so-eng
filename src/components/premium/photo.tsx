import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import "../../assets/Photo.css";

// import img1 from "../assets/images/pic1.jpg";
// import img2 from "../assets/images/pic2.jpg";
// import img3 from "../assets/images/pic3.jpg";
// import img4 from "../assets/images/pic4.jpg";
// import img5 from "../assets/images/pic5.jpg";
// import img6 from "../assets/images/pic6.jpg";
// import img7 from "../assets/images/pic7.jpg";
// import img8 from "../assets/images/pic8.jpg";
// import img9 from "../assets/images/pic9.jpg";
// import img10 from "../assets/images/pic10.jpg";

// const photos = [
//   { id: 1, src: img1 },
//   { id: 2, src: img2 },
//   { id: 3, src: img3 },
//   { id: 4, src: img4 },
//   { id: 5, src: img5 },
//   { id: 6, src: img6 },
//   { id: 7, src: img7 },
//   { id: 8, src: img8 },
//   { id: 9, src: img9 },
//   { id: 10, src: img10 },
// ];

const Photo = (photolist: any) => {
  const photos = photolist?.photolist.map((photo: any) => ({
    id: photo.id,
    src: photo.image,
  }));
  console.log(photos);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () =>
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const handleClose = () => setSelectedIndex(0);

  // swipe gesture
  let touchStartX = 0;
  const handleTouchStart = (e: any) => (touchStartX = e.touches[0].clientX);
  const handleTouchEnd = (e: any) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  // disable body scroll when modal is open
  useEffect(() => {
    document.body.classList.toggle("modal-open", selectedIndex !== null);
  }, [selectedIndex]);

  return (
    <div className="event-gallery-vertical">
      <h2 className="event">វិចិត្រសាល</h2>

      <div className="gallery">
        {/* 1 single full */}
        <motion.div
          className="photo-wrapper full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={photos[0].src} alt="" onClick={() => setSelectedIndex(0)} />
        </motion.div>

        {/* 2 & 3 pair */}
        <div className="row-pair">
          {[photos[1], photos[2]].map((p: any, i) => (
            <motion.div
              key={p.id}
              className="photo-wrapper half"
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={p.src}
                alt=""
                onClick={() => setSelectedIndex(p.id - 1)}
              />
            </motion.div>
          ))}
        </div>

        {/* 4–8 each single row */}
        {[photos[3], photos[4], photos[5], photos[6], photos[7]].map(
          (p: any) => (
            <motion.div
              key={p.id}
              className="photo-wrapper full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={p.src}
                alt=""
                onClick={() => setSelectedIndex(p.id - 1)}
              />
            </motion.div>
          )
        )}

        {/* 9 & 10 pair */}
        {/* <div className="row-pair">
          {[photos[8], photos[9]].map((p, i) => (
            <motion.div
              key={p.id}
              className="photo-wrapper half"
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={p.src}
                alt=""
                onClick={() => setSelectedIndex(p.id - 1)}
              />
            </motion.div>
          ))}
        </div> */}
      </div>

      {/* fullscreen modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="photo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>

            <motion.img
              key={photos[selectedIndex].src}
              src={photos[selectedIndex].src}
              alt=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photo;
