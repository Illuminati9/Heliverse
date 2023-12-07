import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../services/operations/userAPI';
import Pagination from '../components/Pagination';
import UserCardList from '../components/UserCardList';
import { setDisplayData } from '../slices/userSlice';

const MainPage = () => {
  const availableTypes = [{value: null, name:'Availability'},{value: true,name:'Available'},{value: false, name:'Not Available'}]
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { userData, displayData, loading, genders, domains } = useSelector((state) => state.user);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [domain,setDomain] = useState()
  const [available,setAvailable] = useState();
  const [gender,setGender] = useState('All');

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value)
    if(e.target.value!=='All'){
      let newData=[];
      for(let i=0;i<displayData.length;i++){
        if(displayData[i].domain==e.target.value){
          newData.push(displayData[i]);
        }
      }
      dispatch(setDisplayData(newData))
    }else{
      dispatch(setDisplayData(userData))
      setAvailable(availableTypes[0].name)
      setGender('All');
    }
  }

  const handleAvailableChange=(e)=>{
    setAvailable(e.target.value);
    let newdata=[];
    if(e.target.value=='Available'){
      for(let i=0;i<displayData.length;i++){
        if(displayData[i].available==true){
          newdata.push(displayData[i])
        }
      }
    }else if(e.target.value=='Not Available'){
      for(let i=0;i<displayData.length;i++){
        if(displayData[i].available==false){
          newdata.push(displayData[i])
        }
      }
    }else{
      newdata = userData;
      setDomain('All');
    }
    dispatch(setDisplayData(newdata));
  }

  const handleGenderChange=(e)=>{
    setGender(e.target.value);
    if(e.target.value!=='All'){
      let newData=[];
      for(let i=0;i<displayData.length;i++){
        if(displayData[i].gender==e.target.value){
          newData.push(displayData[i]);
        }
      }
      dispatch(setDisplayData(newData))
    }else{
      dispatch(setDisplayData(userData))
      setAvailable(availableTypes[0].name)
      setDomain('All')
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    let newdata = [];
    let search = e.target.value;
    for (let i = 0; i < userData.length; i++) {
      let name = `${userData[i].first_name} ${userData[i].last_name}`;
      if (name.toLowerCase().includes(search.toLowerCase())) {
        newdata.push(userData[i]);
      }
    }
    dispatch(setDisplayData(newdata));
  }


  useEffect(() => {
    try {
      dispatch(getAllUsers());
    } catch (error) {
      console.log('Couldn\'t fetch user details')
    }
  }, [])

  if (userData == null) {
    return (
      <div className='flex justify-center items-center'>
        Loading
      </div>
    )
  }

  return (
    <div className='mx-3'>
      <h1 className='text-center py-3'><span className='font-bold text-5xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text '>Heliverse Assignment</span></h1>
      <div className='md:flex justify-between mx-2'>
        <p className='font-semibold text-xl '>User Data</p>
        <div className='md:flex justify-end '>
        <select
        id="availableSelect"
        name="availability"
        value={available}
        onChange={handleAvailableChange}
        className="mt-1 block w-full p-3 mx-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
        <option value={availableTypes[0].name}>Availability</option>
        <option value={availableTypes[1].name}>Available</option>
        <option value={availableTypes[2].name}>Not Available</option>
      </select>
      <select
        id="genderSelect"
        name="gender"
        value={gender}
        onChange={handleGenderChange}
        className="mt-1 block w-full p-3 mx-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
        <option value="All">Select a gender</option>
        {genders.map((gender) => (
          <option key={gender} value={gender}>{gender}</option>
          ))}
      </select>
        <select
        id="domainSelect"
        name="domain"
        value={domain}
        onChange={handleDomainChange}
        className="mt-1 block w-full p-3 mx-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
        <option value="All">Select a domain</option>
        {domains.map((domain) => (
          <option key={domain} value={domain}>{domain}</option>
          ))}
      </select>
        <div className='flex justify-start items-center border-2 border-black rounded-md my-2'>
          <AiOutlineSearch size={20} color='black' />
          <input type='text' className='focus:outline-none md:w-[250px] w-full' value={search} onChange={handleChange} />
        </div>
      </div>
          </div>
      {displayData.length > 0 ?
        <>
          <div className='flex flex-wrap justify-around items-center'>
            <UserCardList data={displayData} itemsPerPage={itemsPerPage} currentPage={currentPage} />
          </div>
          <Pagination
            totalItems={displayData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
        : <div className='flex justify-center'>No Results Found</div>}
    </div>
  )
}

export default MainPage