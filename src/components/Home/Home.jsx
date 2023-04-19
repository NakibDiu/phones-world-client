import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const Home = () => {
  const phonesData = useLoaderData();
  const [phones, setPhones] = useState(phonesData.phones);
  const [filterValue, setFilterValue] = useState(-1);

  const filterPhones = (e) => {
    setFilterValue(parseInt(e.target.value));
  };

  useEffect(() => {
    if (filterValue === 1) {
      const lowToHigh = [...phones].sort((a, b) => a.price - b.price);
      setPhones(lowToHigh);
    }
    if (filterValue === 2) {
      const highToLow = [...phones].sort((a, b) => b.price - a.price);
      setPhones(highToLow);
    }
    if (filterValue === -1) {
      setPhones(phonesData.phones);
    }
  }, [filterValue]);

  return (
    <div className="p-6 lg:p-16 space-y-8">
      <div className="flex justify-between lg:justify-around items-center gap-5 pb-3 lg:pb-7">
        <h1 className="text-2xl text-center font-medium">
          Total Phones: {phones.length}
        </h1>
        <select
          name="filter"
          id="filter"
          className="p-2 cursor-pointer border border-solid rounded-lg focus:outline-none"
          onChange={(e) => filterPhones(e)}
          defaultValue={filterValue}
        >
          <option value="-1">All</option>
          <option value="1">Low to High</option>
          <option value="2">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {phones.map((phone) => {
          const { id, name, brand, release_date, price } = phone;
          return (
            <div
              key={id}
              className="border border-sky-500 p-5 rounded-lg space-y-2 shadow-lg hover:shadow-2xl hover:border-2 transition-shadow duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div className="h-48 md:h-52 lg:h-60 bg-gray-400 bg-opacity-10">
                <img
                  src="https://picsum.photos/500"
                  loading="lazy"
                  alt="image"
                  className="h-full w-full rounded-lg"
                />
              </div>
              <div className="py-2 space-y-2">
                <div>
                  <h1 className="text-xl lg:text-2xl xl:text-3xl">{name}</h1>
                  <h4 className="text-base lg:text-lg text-gray-700">
                    {brand}
                  </h4>
                </div>
                <div>
                  <h4 className="text-lg font-normal">
                    Price:{" "}
                    <span className="text-base lg:text-lg text-gray-700 font-semibold">
                      ${price}
                    </span>
                  </h4>
                  <h4 className="text-lg font-normal">
                    Release:{" "}
                    <span className="text-base lg:text-lg text-gray-700 font-semibold">
                      {release_date}
                    </span>
                  </h4>
                </div>
              </div>

              <NavLink to={`phones/${id}`} className="mt-auto">
                <button className="bg-blue-300 px-2 lg:px-4 py-2 rounded-lg text-white text-base lg:text-lg font-medium cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                  More Details
                </button>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
