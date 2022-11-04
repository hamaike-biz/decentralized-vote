import dynamic from "next/dynamic";
const Vote = dynamic(() => import("../containers/Vote"), {
  ssr: false,
});

const VotePage = () => {
  return <Vote />;
};

export default VotePage;
