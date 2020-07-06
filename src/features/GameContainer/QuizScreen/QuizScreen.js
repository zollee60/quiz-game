import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectActiveQuestion,
    selectQuestionPoolLength,
    selectAnswered,
    setGameState,
    setAnswered, setRandomQuestion, selectActiveCorrectIndex, setSelectedAnswerIndex
} from '../../QuizBank/quizBankSlice';
import { selectName, selectPoints } from '../../userSlice';
import { AnswerOption } from './AnswerOption';
import styles from '../GameContainer.module.css';

export function QuizScreen(){
    const dispatch = useDispatch();
    const questionPoolLength = useSelector(selectQuestionPoolLength);
    const activeQuestion = useSelector(selectActiveQuestion);
    const userName = useSelector(selectName);
    const points = useSelector(selectPoints);
    const answered = useSelector(selectAnswered);
    const correctIndex = useSelector(selectActiveCorrectIndex);

    const renderAnswers = () => activeQuestion.answers.map((answer, index) =>{
        return (
            <AnswerOption key={index} value={index} answer={answer} style="default"/>
        )
    }) 

    return(
        <div className={styles.container}>
            <div className={styles.quizHeader}>
                <h3>{`${userName}, correct answeers: ${points}`}</h3>
            </div>
            <h3>{activeQuestion.question}</h3>
            <table className={styles.answerTable}>
                <tbody>
                    {renderAnswers()}
                </tbody>
            </table>
            {(questionPoolLength === 0)
                ? <button onClick={() => {
                    dispatch(setGameState('finish'));
                }}> FINISH </button>
                : (answered)
                ? <button onClick={() => {
                        const random = Math.floor(Math.random() * questionPoolLength);
                        dispatch(setRandomQuestion(random));
                        dispatch(setAnswered(false));
                        dispatch(setSelectedAnswerIndex(-1));
                    }}> NEXT </button>
                : <button disabled={true}> NEXT </button>


            }
            
        </div>
    );
}