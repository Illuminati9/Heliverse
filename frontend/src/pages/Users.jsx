import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import Searchbar from "../components/Searchbar";
import { Bars } from "react-loader-spinner";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/APIs";
import Pagination from "../components/Pagination";
import UserCardList from "../components/UserCardList";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayUsers,setDisplayUser] = useState([]);
  const {USERS_URL,FILTER_URL} = endpoints;
  

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      const response = await apiConnector('GET',USERS_URL)
      const data = response.data.users;
      setUsers(data);
      setTotalUsers(data.length);
      setLoading(false);
    };

    getAllUsers();
  }, []);

  const getUsers = async () => {
    let baseUrl = `${FILTER_URL}?page=${currentPage}`;
    if (name !== "") baseUrl += `&search=${name}`;
    if (domain !== "") baseUrl += `&domain=${domain}`;
    if (status !=="") baseUrl+= `&available=${status}`
    if (gender != null) baseUrl += `&gender=${gender}`;
    setLoading(true);
    const response = await axios.get(baseUrl);
    const data = await response.data.data;
    setUsers(data);
    setTotalUsers(data.length);
    setLoading(false);
  };

  const itemsPerPage=20;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className=" h-full w-full px-4 py-3 bg-slate-900">
      <Searchbar
        status={status}
        setStatus={setStatus}
        domain={domain}
        setDomain={setDomain}
        name={name}
        setName={setName}
        gender={gender}
        setGender={setGender}
        getUsers={getUsers}
      />
      <div
        className="mt-4 md:mt-0 flex items-center justify-around 
      py-2 md:px-3 border border-gray-100 border-opacity-10 "
      >
        <span className="w-[80%] md:basis-[40%]  ml-2 flex items-center justify-start gap-3 mx-3 ">
          <span
            className="mr-8 ml-2 md:ml-1 h-4 w-4 accent-slate-100 rounded-sm 
                focus:outline-none focus:ring-2 focus:ring-opacity-50 
                bg-transparent cursor-pointer"
          />
          <p className="text-xs text-gray-400">Name</p>
        </span>
        <p
          className="hidden md:flex md:basis-[20%] text-start text-xs
         text-gray-400"
        >
          Gender
        </p>
        <div className="mr-8 md:mr-0 md:basis-[20%]">
          <p className="text-xs text-gray-400">Status</p>
        </div>

        <p
          className="hidden md:flex md:basis-[30%] text-start text-xs
         text-gray-400"
        >
          Email
        </p>
      </div>
      <div
        className=" h-[80%] flex-grow text-white 
      overflow-y-scroll"
      >
        {users.length > 0 ? (
          <UserCardList data={users} itemsPerPage={itemsPerPage} currentPage={currentPage} />
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <Bars
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p>Loading</p>
          </div>
        )}
      </div>
      <div className="w-full mt-3 pb-4 md:pb-0">
        <div className="w-full mx-auto">
       {users.length>0 && <Pagination
            totalItems={totalUsers}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />}
        </div>
      </div>
    </div>
  );
};

export default Users;
