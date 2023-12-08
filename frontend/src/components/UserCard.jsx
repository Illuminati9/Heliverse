import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../context/teamContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const UserCard = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  const teamMembers = useSelector((state) => state.teamState.members);

  console.log(teamMembers);

  return (
    <div className="w-full flex items-center justify-around py-2 px-4 border border-gray-100 border-opacity-10 ">
      {/* image */}
      <span
        className="w-full md:basis-[40%]  md:ml-2 flex items-center 
      justify-start md:gap-3 "
      >
        <input
          type="checkbox"
          className="mr-6 h-4 w-4 rounded-sm 
    focus:outline-none focus:ring-2 focus:ring-opacity-50 
    bg-transparent cursor-pointer"
          onChange={() => dispatch(addMember(user))}
        />
        <img
          src={user.avatar}
          height={35}
          width={35}
          className="rounded-full bg-gray-200"
          alt={`user-{user.id}`}
        />{" "}
        <div className="ml-3 md:ml-0 text-sm md:text-base">
          <p>
            {user.first_name} {user.last_name}
          </p>
          <p className="text-xs text-gray-400">{user.domain}</p>
        </div>
      </span>
      <p className="hidden md:flex md:basis-[18%] text-start">{user.gender}</p>

      <div className=" md:basis-[20%]">
        <button
          className="
    flex items-center justify-center
    bg-white  h-6  p-2 rounded-full text-black
     hover:bg-gray-100  font-semibold py-1 px-2  shadow 
  "
        >
          {user.available ? (
            <span
              className="flex items-center gap-2
            leading-3
            text-green-400 text-xs md:font-bold"
            >
              <FaEye />
              Available
            </span>
          ) : (
            <span className="md:flex items-center md:gap-2 leading-none text-red-400 text-xs md:font-bold">
              <FaEyeSlash />
              Not Available
            </span>
          )}
        </button>
      </div>

      <p className="hidden md:flex md:basis-[30%] text-start text-ellipsis ">{user.email.length<=30?user.email:
      <div>
        {user.email.substring(0,25)}
        {`...`}
      </div>
      }</p>
    </div>
  );
};

export default UserCard;
