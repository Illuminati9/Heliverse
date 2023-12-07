import UserCard from "./Card";

const UserCardList = ({ data, itemsPerPage, currentPage, onPageChange }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
  
    return (
      <>
        {currentData.map((user, index) => (
          <UserCard key={index} data={user} />
        ))}
      </>
    );
  };

  export default UserCardList;