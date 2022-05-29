import "./App.css";
// import React, { useState, useEffect } from "react";
import React, {  useEffect } from "react";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  gameOver: false,
  result: false,
};

// const reducer = (state = initialState, { type, payload }) => {
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return { ...state, player: action.payload };
    case "SET_MARKS":
      return { ...state, marks: action.payload };
    case "SET_GAMEOVER":
      return { ...state, gameOver: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BoardContainer></BoardContainer>
      </Provider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    marks: state.marks,
    player: state.player,
    gameOver: state.gameOver,
    result: state.result,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMarks: (marks) => {
      dispatch({ type: "SET_MARKS", payload: marks });
    },
    setPlayer: (player) => {
      dispatch({ type: "SET_PLAYER", payload: player });
    },
    setGameOver: (status) => {
      dispatch({ type: "SET_GAMEOVER", payload: status });
    },
    setResult: (status) => {
      dispatch({ type: "SET_RESULT", payload: status });
    },
  };
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

// const Board = ({marks, setMarks,gameOver,setGameOver, player, setPlayer}) => {
function Board({
  marks,
  player,
  gameOver,
  result,
  setGameOver,
  setMarks,
  setPlayer,
  setResult,
}) {
  // const [marks, setMarks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // const [player, setPlayer] = useState(1);

  useEffect(() => {
    console.log("start")
    if (gameOver) return;
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let c of combinations) {
      if (marks[c[0]] === 1 && marks[c[1]] === 1 && marks[c[2]] === 1) {
        // alert("player 1 wins");
        setPlayer(1);
        setGameOver(true);
        // console.log("gameOver",gameOver)
      }
      if (marks[c[0]] === 2 && marks[c[1]] === 2 && marks[c[2]] === 2) {
        // alert("player 2 wins");
        setPlayer(2);
        setGameOver(true);
        // console.log("gameOver",gameOver)
      }
    }
  }, [marks]);

  const changeMark = (i) => {
    const m = [...marks];
    if (m[i] === 0) {
      m[i] = player;
      setPlayer(player === 1 ? 2 : 1);
      console.log(player);
      setMarks(m);
    } else {
      alert("please click on blank box.");
    }
  };
  function animation() {
    setTimeout(function () {
      // location.reload();
      setResult(true);
    }, 200);
  }

  function onRestart(){
  // marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  // player: 1,
  // gameOver: false,
  // result: 0,

    setPlayer(1);
    setMarks([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setGameOver(false);
    setResult(false);
    console.log("bhbhubhubiubiuniunij")
  }

  return (
    <>
      {gameOver?animation():""}
       
        {/* // <div className="Board "{gameOver?"":""}> */}
        {console.log(Math.round(Math.random()*100000))}
        <div
        id={Math.round(Math.random()*100000)}
          className={`Board ${gameOver?"gameoverremove":"rgameoverremove"}` }
        >
          <div>
            <Block mark={marks[0]} position={0} changeMark={changeMark}></Block>
            <Block mark={marks[1]} position={1} changeMark={changeMark}></Block>
            <Block mark={marks[2]} position={2} changeMark={changeMark}></Block>
          </div>
          <div>
            <Block mark={marks[3]} position={3} changeMark={changeMark}></Block>
            <Block mark={marks[4]} position={4} changeMark={changeMark}></Block>
            <Block mark={marks[5]} position={5} changeMark={changeMark}></Block>
          </div>
          <div>
            <Block mark={marks[6]} position={6} changeMark={changeMark}></Block>
            <Block mark={marks[7]} position={7} changeMark={changeMark}></Block>
            <Block mark={marks[8]} position={8} changeMark={changeMark}></Block>
          </div>
        </div>
        <div className={result?"gameover":"rgameover"}>
        <h1 >
          Player {player}
          {console.log(player)} win. Game Over !!!
        </h1>
        <h6 onClick={()=>onRestart()}>Restart</h6>
        </div>
    </>
  );
}

const Block = ({ mark, changeMark, position }) => {
  // console.log(mark, changeMark, position);
  return (
    <div
      className={`block mark${mark}`}
      onClick={(e) => changeMark(position)}
    ></div>
  );
};

export default App;
