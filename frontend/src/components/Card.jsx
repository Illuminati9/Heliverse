import React from 'react'

const UserCard = ({ data }) => {
  const { first_name, last_name, email, domain, gender, avatar, available } = data;
  return (
    <div className="w-[250px] flex flex-col lg:items-start items-center bg-white rounded-lg shadow-md m-2">
      <div className='flex justify-center'>
        <img className="h-24 w-24" src={avatar} alt={`${first_name} ${last_name}`} />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{`${first_name} ${last_name}`}</h2>
        <p className="text-sm text-gray-600">{gender}</p>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-600">{domain}</p>

        <div className="mt-2">
          <span className={`px-2 py-1 text-xs font-semibold text-white ${available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}>
            {available ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserCard