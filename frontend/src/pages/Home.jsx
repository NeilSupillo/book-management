import React, { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [main, setMain] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  const [emojiName, getName] = React.useState("");
  const [giveName, setName] = React.useState("");

  function data(arr) {
    setBooks(arr);
    setMain(arr);
  }
  function passName(e) {
    const name = e.target.value;
    if (name === "") {
      setBooks(main);
    }
    getName(name);
  }

  function find() {
    setBooks((prevNotes) => {
      return main.filter((noteItem, index) => {
        return (
          emojiName.toLocaleLowerCase() === main[index].title.toLowerCase() ||
          emojiName.toLocaleLowerCase() === main[index].author.toLowerCase()
        );
      });
    });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        data(response.data.data);
        setLoading(false);
        console.log("call api");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={passName}
          />
          <button type="submit" onClick={find} className="searchButton">
            <img alt="search" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};
// target="_blank" open a new tab
export default Home;
