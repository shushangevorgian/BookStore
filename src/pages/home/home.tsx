import React, { useState } from "react";
import Head from "@components/index";
import GettingBook from "./books";
import List from "./filteringData";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const inputHandler = (e: any) => {
    let lowerCase = e.target.value.toLowerCase();
    if (e.target.value.length >= 3) {
      setInputText(lowerCase);
    } else {
      setInputText("");
    }
  };
  return (
    <div>
      <Head />
      <div className={style.fixingPositions}>
        <div className={style.search}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <button className={style.addingBtn} onClick={() => navigate("/adding")}>
          Add Book
        </button>
      </div>
      <List input={inputText} />
      <GettingBook />
    </div>
  );
}

export default Home;
