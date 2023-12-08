import React from "react";
import { FaSearch } from "react-icons/fa";


const Searchbar = ({
  status,
  setStatus,
  domain,
  setDomain,
  name,
  setName,
  gender,
  setGender,
  getUsers,
}) => {
  return (
    <div
      className="flex flex-wrap md:flex-row items-center 
    md:justify-between bg-transparent"
    >
      <input
        className="w-full bg-transparent rounded-full md:my-5 md:w-[40%] h-10 
        py-2 pl-4 pr-2 border border-gray-100 border-opacity-10 
    focus:outline-none focus:ring-2 focus:ring-opacity-50 text-white placeholder-gray-400
  "
        type="text"
        placeholder="Enter name or email"
        onChange={(e) => setName(e.target.value)}
      />
      {/* domain */}
      <input
        className="flex-grow md:flex-none mr-2 md:mr-0 bg-transparent rounded-full my-2 md:my-5  h-10  py-2 pl-4 pr-2 border border-gray-100 border-opacity-10 
    focus:outline-none focus:ring-2 focus:ring-opacity-50 text-white placeholder-gray-400
  "
        type="text"
        placeholder="Enter Domain"
        onChange={(e) => setDomain(e.target.value)}
      />
      {/* gender */}
      <select
        name=""
        id=""
        onChange={(e) => setGender(e.target.value)}
        className="
    rounded-md  py-1 pl-4 border border-gray-100 border-opacity-10 pr-2
    focus:outline-none focus:ring-2 focus:ring-opacity-50 text-black placeholder-gray-400
  "
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Agender">Agender</option>
        <option value="Agender">Agender</option>
        <option value="Bigender">Bigender</option>
        <option value="Polygender">Polygender</option>
        <option value='Non-binary'>Non-binary</option>
        <option value='Genderfluid'>Genderfluid</option>
        <option value='Genderqueer'>Genderqueer</option>
      </select>
      {/* status */}
      <select
        name=""
        id=""
        onChange={(e) => setStatus(e.target.value)}
        className="ml-auto md:ml-0 mr-2 md:mr-0
    rounded-md  py-1 pl-4 border border-gray-100 border-opacity-10
    focus:outline-none focus:ring-2 focus:ring-opacity-50 text-black placeholder-gray-400
  "
      >
        <option value="all">Status</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
      <button
        onClick={getUsers}
        className="mr-auto md:mr-0
  text-black flex items-center justify-center
  bg-slate-100  rounded-full h-[30px] w-[30px] focus:outline-none focus:ring-0 focus:ring-opacity-50 placeholder-gray-400"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Searchbar;
