import React, { useEffect, useRef, useState } from 'react';
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import crossImg from './Assets/cross.png';
import notImg from './Assets/not.png';
import gameStart from './Assets/gameStart.mp3';
import gameTie from './Assets/tie.mp3';
import gameWon from './Assets/gameWon.wav';

let board = ['', '', '', '', '', '', '', '', ''];
let tieOrNot = false;

const TicTacToe = () => {
    // const buttonRef = useRef();
    const [gameLock, setGameLock] = useState(true);
    let [count, setCount] = useState(0);
    const [displayWinner, setDisplayWinner] = useState("Tic Tac Toe");
    const [gameOver, setGameOver] = useState(false);
    const [playerSelect, setPlayerSelect] = useState(false);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    let player1Value = player1Name;
    let player2Value = player2Name;

    const handleClick = (e, index) => {
        if (gameLock === true) {
            // new Audio(gameStart).play();
            return;
        } else {
            if (count % 2 === 0 && board[index] === '') {
                board[index] = 'X';
                setCount(count + 1);
            } else if (board[index] === '') {
                board[index] = 'O';
                setCount(count + 1);
            } else {
                alert("Cannot Change");
                //play Alert audio
            }
        }
        gameWinner();
    };

    const gameWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let checkIsTie = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] === board[b] && board[b] === board[c] && board[c] !== '') {
                // Play Game winner Sound
                new Audio(gameWon).play();
                setDisplayWinner(`Hurray! '${board[a] === 'X' && player1Value !== '' ? player1Value : board[a] === 'X' && player1Value !== '' ? player2Value : board[a] === 'X' ? 'X' : 'O'}' Won the Game`);
                setGameLock(true);
                setGameOver(true);
                checkIsTie = true;
            }
        }
        tieOrNot = checkIsTie;
    };

    useEffect(() => {
        if (count === 9 && !tieOrNot) {
            // Play Game Tie Sound
            new Audio(gameTie).play();
        }
    }, [count]);

    const handleStart = () => {
        // play Start Sound
        new Audio(gameStart).play();
        setCount(0);
        board = ['', '', '', '', '', '', '', '', ''];
        setGameLock(false);
        setDisplayWinner("Tic Tac Toe");
    };

    const handleReset = () => {
        //play Reset sound
        setCount(0);
        board = ['', '', '', '', '', '', '', '', ''];
        setGameLock(true);
        setGameOver(false);
        setDisplayWinner("Tic Tac Toe");
    };

    const handlePlayerSelection = () => {
        setPlayerSelect(!playerSelect);
    };

    return (
        <div className="container p-2">
            {playerSelect && (
                <div className="player-names d-flex flex-column justify-content-center align-items-center">
                    <input
                        type="text"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                        placeholder='X - Player1'
                    />
                    <input
                        type="text"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                        placeholder='O - Player2'
                    />
                    <button onClick={handlePlayerSelection} className='select-btn '>Select</button>
                </div>
            )}
            <div className="hdng d-flex align-items-center text-center">
                <h1 className='fs-2'>
                    {(gameLock || tieOrNot) ? displayWinner : count === 9 && !tieOrNot ? "It's a Tie!!" : count % 2 === 0 ? <img className='x-choice pb-2' src={crossImg} alt="" /> : <img src={notImg} className='o-choice pb-2'></img>}
                    {count < 9 && !gameLock && count % 2 === 0 ? " - Choice" : count < 9 && !gameLock && count % 2 !== 0 ? " - Choice" : ""}
                </h1>
                {
                    gameLock && count === 0 && (
                        <button onClick={handlePlayerSelection} className='players-btn mx-4 d-flex justify-content-center pt-1 fs-5'>
                            <p>P</p>
                        </button>
                    )
                }
            </div>
            <div className="game-board">
                {board.map((item, index) => (
                    <button
                        key={index}
                        // ref={buttonRef}
                        onClick={(e) => handleClick(e, index)}
                        className={`grid-item ${gameLock === false || gameOver === true ? '' : 'items'} item${index}`}
                    >
                        <div>{
                            item === 'X' ? <img className='cross-img w-75' src={crossImg} alt="" /> : item === 'O' ? <img src={notImg} className='not-img w-75'></img> : ''
                        }</div>
                    </button>
                ))}
            </div>
            <div className="access-btns">
                <button className={`start-btn d-flex align-items-center ${gameLock === false || gameOver === true ? 'd-none' : ''}  `} onClick={handleStart}>Start</button>
                <button className={`reset-btn d-flex align-items-center ${gameLock === false || gameOver === true ? '' : 'd-none'}`} onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default TicTacToe;
