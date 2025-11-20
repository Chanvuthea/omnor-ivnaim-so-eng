interface ThankyouContentType {
  thankyou: string;
  wish: string;
  speech: string;
  last_speech: string;
}
interface dataProps {
  data: ThankyouContentType;
  bgColor?: string;
}
export default function GoldThankyouContent({ data, bgColor }: dataProps) {
  return (
    <div className=" w-full flex justify-center md:pt-20 ">
      <div
        className=" px-10 md:px-20 py-14 border border-amber-100 bg-white/80 w-full md:w-1/2 rounded-full "
        style={{ backgroundColor: bgColor ? bgColor : "transparent" }}
      >
        <p className=" text-center text-2xl font-bold">សេចក្តីថ្លែងអំណរគុណ</p>
        <p className=" text-center pt-6">{data.thankyou}</p>
        <p className=" text-center pt-4">{data.wish}</p>
        <p className=" text-center text-2xl font-bold pt-6">
          សេចក្តីសូមអភ័យទោស
        </p>
        <p className=" text-center pt-6">{data.speech}</p>
        <p className=" text-center pt-4">{data.last_speech}</p>
      </div>
    </div>
  );
}
