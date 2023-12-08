import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMember, clearAll } from "../context/teamContext";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/APIs";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const dispatch = useDispatch();
  const [teamId, setTeamId] = useState("");

  const [active, setActive] = useState(0);

  const {TEAM_URL,FILTER_URL} = endpoints;

  useEffect(() => {
    const getTeam = async () => {
      const response = await apiConnector('GET',TEAM_URL)
      const data = await response.data.teams;
      setTeams(data);
    };
    getTeam();
  }, []);

  const getTeamById = async () => {
    if (teamId === "") return;

    const response = await apiConnector('GET',`${TEAM_URL}/${teamId}`);
    const data = await response.data.team;
    setTeams([data]);
  };

  return (
    <div className=" h-full w-full px-4 md:py-3 flex flex-col bg-slate-900 ">
      <div className="flex items-center gap-3">
        <input
          className="bg-transparent rounded-full my-3 md:my-5 w-[80%] md:w-[40%] h-10 
           py-2 pl-4 pr-2 border border-gray-100 border-opacity-10 
    focus:outline-none focus:ring-2 focus:ring-opacity-50
     text-white placeholder-gray-400
  "
          type="text"
          placeholder="Enter Your Team Code"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
        <button
          onClick={getTeamById}
          className="
  text-black flex items-center justify-center
  rounded-full h-[30px] w-[30px] focus:outline-none focus:ring-0 focus:ring-opacity-50 placeholder-gray-400"
        >
          <FaSearch />
        </button>
      </div>
      <h1
        className="
        font-bold text-xl md:text-2xl mb-4 text-white
      "
      >
        {teamId === "" ? "All Teams" : "Your Team"}
      </h1>
      <div
        className="grid grid-cols-2 md:grid-cols-4 
      text-white gap-y-2 md:gap-2 overflow-y-scroll"
      >
        {teams.map((team, index) => (
          <div
            key={team._id}
            className={index == active ? 'w-auto md:h-44  rounded-xl mr-2 p-2 md:p-4 flex flex-col items-center justify-between gap-2 md:mr-4 hover:shadow-xl cursor-pointer bg-gray-500' : 'w-auto md:h-44 cursor-pointer flex mr-2 flex-col items-center justify-between gap-2 border border-gray-100 border-opacity-10 rounded-md md:mr-4 p-2 md:p-4 hover:shadow-xl transition duration-300 ease-in-out bg-gray-200'}
            onClick={() => {
              console.log(team.members);
              dispatch(clearAll());
              team.members.map((member) => dispatch(addMember(member)));
              setActive(index);
            }}
          >
            <div className="text-sm md:text-base">
              <span
                className={
                  index == active ? "font-bold " : "text-blue-500 font-bold"
                }
              >
                Active Members :{" "}
              </span>
              {team.members?.length}
            </div>
            <div
              className="h-10  mx-auto 
            flex items-center justify-center"
            >
              {team.members.length > 4
                ? team.members.slice(0, 4).map((member) => (
                    <img
                      key={member._id}
                      className={`rounded-full h-10 w-10  border-2
                   ${
                     active == index ? " border-slate-700" : " border-slate-500"
                   }
             `}
                      src={member.avatar}
                      alt=""
                    />
                  ))
                : team.members.map((member) => (
                    <img
                      key={member._id}
                      className={`rounded-full h-10 w-10  border-2
     ${active == index ? " border-slate-700" : " border-slate-500"}
`}
                      src={member.avatar}
                      alt=""
                    />
                  ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center my-2">
              {team.domains.length > 4
                ? team.domains.slice(1, 4).map((domain, index2) => (
                    <div
                      key={index2}
                      className={
                        active == index
                          ? " text-center text-xs rounded-full  px-2 py-1"
                          : "text-center text-xs text-stone-800 rounded-full  px-2 py-1"
                      }
                    >
                      {domain}
                    </div>
                  ))
                : team.domains.map((domain, index2) => (
                    <div
                      key={index2}
                      className={
                        active == index
                          ? " text-center text-xs rounded-full  px-2 py-1"
                          : "text-center text-xs text-stone-800 font-semibold rounded-full  px-2 py-1"
                      }
                    >
                      {domain}
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
