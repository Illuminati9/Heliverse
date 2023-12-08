import UserCard from "./UserCard";

const UserCardList = ({ data, itemsPerPage, currentPage, onPageChange,onSelectChange }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
  
    return (
      <>
        {currentData.map((user, index) => (
          <UserCard key={index} user={user} onSelectChange={onSelectChange} />
        ))}
      </>
    );
  };

  export default UserCardList;