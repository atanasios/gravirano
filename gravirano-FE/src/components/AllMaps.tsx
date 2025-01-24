import { useEffect } from "react";
import SingleMap from "./SingleMap";
import { useSelector } from "react-redux";
import { fetchMaps } from "../features/maps/mapSlice";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";

const AllMaps = () => {
  const dispatch = useAppDispatch();
  const { maps, loading, error } = useSelector((state: RootState) => state.maps);

  useEffect(() => {
    dispatch(fetchMaps());
  }, [dispatch]);

  if (loading) return <p className="text-center text-xl mt-20">Loading...</p>;
  if (error) return <p className="text-center text-xl">Error: {error}</p>;

  return (
    <div className="p-4">
      {maps.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {maps.map((map) => (
            <SingleMap
              key={map._id}
              id={map._id}
              name={map.name}
              dimensions={map.dimensions}
              price={map.price}
              image={map.image}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-xl">No maps found</p>
      )}
    </div>
  );
};

export default AllMaps;