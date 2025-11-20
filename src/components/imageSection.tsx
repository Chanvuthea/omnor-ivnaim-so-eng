import SlideshowDemo from "./imageSlideShow";
import MasonryTwoColumnDemo from "./mansonryGrid";
import YouTubePlayer from "./YouTubePlayer";
interface imageData {
  id: number;
  image: string;
}
interface ImageSectionProps {
  imageList: imageData[];
  videoId: string;
  showSlide?: boolean;
}

export default function ImageSection({
  imageList,
  videoId,
  showSlide,
}: ImageSectionProps) {
  return (
    <div className="w-full">
      {showSlide && <SlideshowDemo photoBoothUrls={imageList} />}
      <div className="p-6 justify-center items-center flex">
        <MasonryTwoColumnDemo photoBoothUrls={imageList} />
      </div>
      <div className="justify-center items-center flex">
        {videoId !== "" && <YouTubePlayer videoId={videoId} />}
      </div>
    </div>
  );
}
