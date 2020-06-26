import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuestionPoolLength, setGameState, setAnswered } from '../../QuizBank/quizBankSlice';
import { selectName, selectPoints } from '../../userSlice';
import {NavBar} from "../../NavBar/NavBar";
import styles from '../GameContainer.module.css'

export function FinishScreen(){
    const dispatch = useDispatch();
    const userName = useSelector(selectName);
    const points = useSelector(selectPoints);

    return(
        <div>
            <NavBar />
            <div className={styles.container}>
                <h2>Game Over</h2>
                <h3>{userName + ', you scored ' + points + ' points on this quiz.'}</h3>
                <button onClick={() => {
                    dispatch(setAnswered(false));
                    dispatch(setGameState('init'));
                }}> PLAY AGAIN </button>
            </div>
        </div>
    );
}