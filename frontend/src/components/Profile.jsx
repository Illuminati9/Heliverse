import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember, clearAll } from "../context/teamContext";
import { toast, Toaster } from "react-hot-toast";
import { endpoints } from "../services/APIs";
import { apiConnector } from "../services/apiConnector";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";

const Profile = () => {
  const path = window.location.pathname;
  const teamMembers = useSelector((state) => state.teamState.members);
  const dispatch = useDispatch();
  const [success, setSuccess] =useState(false);
  const [teamCode, setTeamCode] = useState("teamcode");
  const {TEAM_URL,FILTER_URL} = endpoints;

  useEffect(() => {
    setSuccess(false);
  }, [window.location.pathname == "/team"]);

  const createTeam = async () => {
    const response = await apiConnector('POST',
      `${TEAM_URL}`,
      {
        memberIds: teamMembers.map((member) => member.id),
      }
    );
    const data = await response.data.team;
    console.log(data);

    if (response.status == 201) {
      setTeamCode(data._id);
      console.log(teamCode);
      toast.success("Team Created Successfully");
      setSuccess(true);
      dispatch(clearAll());
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="
    w-full pb-6 mb-6
    md:flex flex-col
    md:w-full md:bg-white text-purple-500 h-full px-4 py-4 bg-slate-400"
    >
      <h1
        className="text-xl font-bold
      "
      >
        {path == "/team" ? "Member Details" : "Add Members To Your Team"}
      </h1>
      {teamMembers.length == 0 ? (
        <div className="flex flex-col md:h-full items-center mt-12 md:mt-32">
          <div className="h-150 w-150">
            {
              success
                ? <IoCheckmarkDoneCircle size={150} color='black'/>
                : <BsCartPlusFill size={150} color="black"/>
            }
            
          </div>
          <p className="mt-4">
            {success ? "Team Created Successfully" : "No Members Added"}
          </p>
        </div>
      ) : (
        <div className="mt-5 h-[85%] md:overflow-y-scroll">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between py-2 px-2 border
               border-gray-100 border-opacity-10 rounded-lg mb-2 mr-3 bg-gray-200"
            >
              <span className="basis-[60%]  ml-2 flex items-center justify-start gap-3 ">
                <img
                  src={member.avatar}
                  height={60}
                  width={60}
                  className="rounded-md bg-gray-500"
                  alt={`user-{user.id}`}
                />{" "}
                <div className="">
                  <p>
                    {member.first_name} {member.last_name}
                  </p>
                  <p className="text-xs text-gray-700">{member.domain}</p>
                  <p>
                    {member.available ? (
                      <span className="flex items-center gap-2 text-green-400 text-xs font-bold">
                        <FaEye />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-400 text-xs font-bold">
                        <FaEyeSlash />
                        Not Available
                      </span>
                    )}
                  </p>
                </div>
              </span>
              <button
                className="basis-
    flex items-center justify-center
    bg-white h-6  p-2 rounded-full text-black hover:bg-gray-600  font-semibold py-1 px-2  shadow
  "
                onClick={() => dispatch(removeMember(member.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {teamMembers.length > 0 && (
        <button
          className="md:mt-auto w-full mt-5  mb-12
    flex items-center justify-center
     h-10  p-2 rounded-md text-black bg-gray-600 text-white
     hover:bg-gray-600  font-semibold py-5 md:py-1 px-2  shadow
  "
          onClick={createTeam}
        >
          Save Team
        </button>
      )}
      {success && (
        <div className="flex flex-col gap-4 mb-2 mt-20 md:mt-0">
          <button
            className="mt-auto basis-
    flex items-center justify-center
     h-10  p-2 rounded-md text-black hover:bg-gray-600  font-semibold py-1 px-2  shadow
  "
            onClick={() => {
              navigator.clipboard.writeText(teamCode);
              toast.success("Team Code Copied to Clipboard");
            }}
          >
            <FaRegCopy/>
            Copy Team Code
          </button>
          <button
            className="mt-auto basis-
    flex items-center justify-center
    bg-green-500 text-white h-10  p-2 rounded-md  hover:bg-gray-100  font-semibold py-1 px-2  shadow
  "
            onClick={() => {
              setSuccess(false);
            }}
          >
            Create Another Team
          </button>
        </div>
      )}
      <div className="h-[4px] md:hidden"></div>
    </div>
  );
};

export default Profile;
