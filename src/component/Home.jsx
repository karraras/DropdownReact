import React from "react";
import axios from "axios";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
function Home() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState("Select country ");
  React.useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setItems(res));
  }, [open]);
  const handleclick = (e) => {
    setResult(e.target.innerText);
    setOpen(!open);
  };
  return (
    <section className="h-screen pt-[90px] flex justify-center bg-black ">
      <div className="w-[300px] h-[400px]">
        <div
          onClick={() => setOpen(!open)}
          className="w-full h-10 flex bg-white justify-between items-center py-[5px] px-3 rounded  font-semibold"
        >
          <p>{result}</p>
          {open ? <BsChevronDown /> : <BsChevronUp />}
        </div>
        <div
          className={`mt-2 bg-white overflow-auto max-h-[400px] min-h-[50px] ${
            open ? "hidden" : "block"
          }`}
        >
          <form className="fixed w-[283px]">
            <input
              type="text"
              placeholder="Enter country name "
              className="pl-[40px]  py-2 w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <p className="absolute text-black top-[10px] left-[10px] text-xl">
              <AiOutlineSearch />
            </p>
          </form>
          <ul className="bg-white py-[10px]">
            {items?.data
              ?.filter((ite) => {
                return (
                  ite.name.common.startsWith(
                    search.slice(0, 1).toUpperCase() + search.slice(1)
                  ) === true
                );
              })
              .map((item, i) => {
                return (
                  <li
                    onClick={(e) => handleclick(e)}
                    className=" px-[10px] py-2 hover:text-white hover:bg-sky-700 cursor-pointer"
                    key={i}
                  >
                    {item.name.common}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Home;
