import { useParams } from "react-router-dom";
import Header from "../components/Header";
import MapEditor from "../components/MapEditor";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const SingleMapPage = () => {
  const { id } = useParams<{ id: string }>();
  const map = useSelector((state: RootState) =>
    state.maps.maps.find((m) => m._id === id)
  );

  if (!map) return <p>Loading or map not found...</p>;

  return (
    <div>
      <Header />
      <MapEditor map={map} />
    </div>
  );
};

export default SingleMapPage;