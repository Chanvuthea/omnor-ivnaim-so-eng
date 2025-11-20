interface GoldAgendaItem {
  time: string;
  detail: string;
}
interface GoldAgendaContentProps {
  agendaList: GoldAgendaItem[];
  date: string;
  khmer_date: string;
  event_location: { name: string; lat: number; lng: number };
  restaurant_location: { name: string; lat: number; lng: number };
  fong_logo: string;
}

export default function GoldAgendaContent({
  agendaList,
  date,
  khmer_date,
  event_location,
  restaurant_location,
  fong_logo,
}: GoldAgendaContentProps) {
  const showInMapClicked = (lat: number, lng: number) => {
    window.open("https://maps.google.com?q=" + lat + "," + lng);
  };

  return (
    <div className=" w-full flex justify-center md:pt-20 md:pb-[20%] ">
      <div className="p-6 pt-0 py-14 bg-white/80 w-full">
        <div className="flex justify-center items-center">
          <img
            src={fong_logo}
            width={120}
            height={120}
            alt="Floating logo"
            className="max-w-full h-auto"
          />
        </div>
        <div>
          <p className="text-center pb-6">
            {date}
            <br />
            {khmer_date}
          </p>

          <div>
            <p className="text-center font-bold pt-6 text-base">
              {event_location.name}
            </p>
            <p
              className="text-center font-bold pb-6 text-base underline flex items-center justify-center gap-1"
              onClick={() =>
                showInMapClicked(
                  restaurant_location.lat,
                  restaurant_location.lng
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              បើកផែនទី
            </p>
          </div>

          {agendaList.map((data, index) => (
            <div className="flex  " key={index}>
              <p className="w-full text-center">{data.time}:</p>
              <p className="w-full ">{data.detail}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-center font-bold pt-6 text-base">
            {restaurant_location.name}
          </p>
          <p
            className="text-center font-bold pb-6 text-base underline flex items-center justify-center gap-1"
            onClick={() =>
              showInMapClicked(restaurant_location.lat, restaurant_location.lng)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            បើកផែនទី
          </p>
        </div>
      </div>
    </div>
  );
}
