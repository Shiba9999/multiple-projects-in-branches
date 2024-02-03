import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState("");

  useEffect(() => {
    const fetchuser = async () => {
      if (searchTerm.trim() == "") {
        setSuggestions([]);
        return;
      }
      const res = await fetch(
        `https://dummyjson.com/users/search?q=${searchTerm}`
      );
      const data = await res.json();
      setSuggestions(data);
      console.log(data);
    };
    fetchuser();
  }, [searchTerm]);
  function handleSelectUser(user) {
    //do whatever you want to do with this selected user
    setSelectedUsers(selectedUsers);
  }
  return (
    <div className="user-search-container">
      <div className="user-search-input">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a user"
          />
          <ul className="suggestions-list">
            {suggestions?.users?.map((user, index) => (
              <li key={user.id} onClick={() => handleSelectUser(user)}>
                <img src={user.image} alt={user.firstName} />
                <span>{user.firstName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
