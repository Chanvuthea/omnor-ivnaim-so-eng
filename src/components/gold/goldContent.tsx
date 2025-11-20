interface GoldContentProps {
  list_family_name: {
    groom_father: string;
    groom_mother: string;
    groom: string;
    bride_father: string;
    bride_mother: string;
    bride: string;
  };
  content_invitation: string;
  content_location: string;
  fong_logo: string;
}

export default function GoldContent({
  list_family_name,
  content_invitation,
  content_location,
  fong_logo,
}: GoldContentProps) {
  return (
    <div className="w-screen flex justify-center px-6 pt-10">
      <div className="border-amber-100 w-full md:w-2/4 border flex flex-col justify-center p-10 py-20 bg-white/80 rounded-full ">
        <div className="flex justify-center items-center w-full ">
          <p className="text-xl font-bold">សូមគោរពអញ្ជើញ</p>
        </div>
        <div className="flex w-full pt-2 justify-center">
          <p className="text-base text-center">{content_invitation}</p>
        </div>
        <div className="flex justify-between items-start text-sm w-full font-bold">
          <div className="flex-1 flex flex-col justify-start text-center pt-6">
            <p>កូនប្រុសនាម</p>
            <p>{list_family_name.groom}</p>
          </div>
          <div className="flex-1 flex justify-center items-start ">
            <img
              src={fong_logo}
              width={120}
              height={120}
              alt="Floating logo"
              className="max-w-full h-auto"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center pt-6">
            <p>កូនស្រីនាម</p>
            <p>{list_family_name.bride}</p>
          </div>
        </div>
        <div className="flex w-full pt-2 justify-center ">
          <p className="text-base text-center ">{content_location}</p>
        </div>
      </div>
    </div>
  );
}
