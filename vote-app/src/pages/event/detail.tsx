import dynamic from "next/dynamic";

const EventDetail = dynamic(() => import("../../containers/EventDetail"), {
  ssr: false,
});

const DetailPage = () => {
  return <EventDetail />;
};

export default DetailPage;
