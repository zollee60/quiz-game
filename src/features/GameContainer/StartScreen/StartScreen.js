import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNumOfQuestions, setRandomQuestion, questionPoolInit, selectQuestionPoolLength, setGameState } from '../../QuizBank/quizBankSlice';
import { selectName, setName, resetPoints } from '../../userSlice';
import styles from '../GameContainer.module.css';
import {NavBar} from "../../NavBar/NavBar";

export function StartScreen(){
    const numOfQuestions = useSelector(selectNumOfQuestions);
    const userName = useSelector(selectName);
    const questionPoolLength = useSelector(selectQuestionPoolLength);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(questionPoolInit());
        dispatch(resetPoints());
        const random = Math.floor(Math.random() * questionPoolLength);
        dispatch(setRandomQuestion(random));
    })

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <h1>Welcome to TestQuiz</h1>
                <h3>What's your name?</h3>
                <div>
                    <input type="text" name="user" id="userName"/>
                    <button className={styles.myButton} onClick={() => {
                        const userNameString = document.querySelector('input[name="user"]').value;
                        dispatch(setName(userNameString));
                    }}> Enter </button>
                </div>
                <div>
                    {(userName !== "" && numOfQuestions !== 0)
                        ? <button className={styles.myButton} onClick={() => {
                            dispatch(setGameState('game'));
                        }}> START </button>
                        : <button className={styles.myButton} disabled={true}> START </button>
                    }
                </div>
            </div>
        </div>
    );
}