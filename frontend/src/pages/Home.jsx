import React, { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import logo from "../../src/b.png";
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
    if (emojiName === "") {
      setBooks(main);
    } else {
      setBooks((prevNotes) => {
        return main.filter((noteItem, index) => {
          //console.log(main);

          return (
            emojiName.toLocaleLowerCase() === main[index].title.toLowerCase() ||
            emojiName.toLocaleLowerCase() ===
              main[index].author.toLowerCase() ||
            main[index].author
              .toLowerCase()
              .includes(emojiName.toLocaleLowerCase()) ||
            main[index].title
              .toLowerCase()
              .includes(emojiName.toLocaleLowerCase())
          );
        });
      });
    }
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-management-nu.vercel.app/books")
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

      <div className="search-box">
        <button className="btn-search" onClick={find}>
          <img className="img" src={logo} alt="Logo" />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
          onChange={passName}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-2">Book List</h1>
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
