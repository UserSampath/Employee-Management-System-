import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const SearchBar = ({ inputSearchMembers }) => {
  const [searchText, setSearchText] = useState("");
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  return (
    <div
      style={{
        border: "2px solid #f5cdc8",
        width: "220px",
        backgroundColor: "#faf4ef",
        borderRadius: "20px",
        marginRight: "10px",
      }}
      className="d-flex align-items-center">
      <input
        style={{ width: "185px" }}
        type="text"
        className="form-control border-0 shadow-none bg-transparent"
        placeholder="Search members.."
        aria-describedby="btnGroupAddon2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>
        {searchText == "" ? (
          <IoSearchOutline size={22} color="gray" />
        ) : (
          <IoCloseOutline
            onClick={() => setSearchText("")}
            size={24}
           />
        )}
      </div>
    </div>
  );
};

export default SearchBar