import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

const PhoneDetails = () => {
  const phonedata = useLoaderData();
  console.log(phonedata);
  const {
    id,
    name,
    brand,
    release_date,
    price,
    specification,
    display,
    camera,
    storage,
    battery,
  } = phonedata;
  return (
    <div className="p-6 lg:p-16">
      <div className="h-60 w-full flex justify-center items-center">
        <img
          src="https://picsum.photos/500"
          loading="lazy"
          alt="image"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="py-4">
        <h1 className="text-2xl lg:text-3xl">{name}</h1>
        <h3 className="text-base lg:text-lg">{brand}</h3>
      </div>

      <div className="flex gap-4 pb-4">
        <div
          className={`flex gap-2 text-base font-semibold px-3 py-1 text-center rounded-lg text-white ${
            price > 1000 ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <CurrencyDollarIcon className="w-4 text-white" />
          <h4>{price}</h4>
        </div>

        <div className="flex rounded-lg bg-blue-500 px-3 py-1 gap-2">
          <CalendarDaysIcon className="w-4 text-white" />
          <h4 className={`text-base font-semibold text-center  text-white`}>
            {release_date}
          </h4>
        </div>
      </div>
      <table>
        <tr>
          <td>
            <h4 className="font-medium basis-1/6">Storage</h4>
          </td>
          <td>
            <p className="pl-3">{storage}</p>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="font-medium basis-1/6">Battery</h4>
          </td>
          <td>
            <p className="pl-3">{battery}</p>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="font-medium basis-1/6">Display</h4>
          </td>
          <td>
            <p className="pl-3">{display}</p>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="font-medium basis-1/6">Camera</h4>
          </td>
          <td>
            <p className="pl-3">{camera}</p>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="font-medium basis-1/6">Specs</h4>
          </td>
          <td>
            <p className="pl-3">{specification}</p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default PhoneDetails;
