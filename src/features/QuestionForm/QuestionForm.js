import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, selectNumOfQuestions, questionPoolInit} from '../QuizBank/quizBankSlice';
import styles from '../QuizBank/QuizBank.module.css';
import conStyles from '../GameContainer/GameContainer.module.css';

export function QuestionForm(){
    const dispatch = useDispatch();
    const numOfQuestions = useSelector(selectNumOfQuestions);
    const [isCorrectSet, setIsCorrect] = useState(false);

    const resetForm = () => {
        let questionInput = document.getElementById('question');
        questionInput.value = "";
        let answers = document.querySelectorAll('input[name="answers"]');
        answers.forEach((answer) => {
            answer.value = "";
        });
        let radioBts = document.querySelectorAll('input[type="radio"]');
        radioBts.forEach((bt) => {
            bt.checked = false;
        })
    }

    const handleChange = () => {
        setIsCorrect(true);
    }

    const handleSend = () => {
        const id = numOfQuestions + 1;
        const questionString = document.getElementById('question').value;
        const correctIndex = parseInt(document.querySelector('input[name="answers"]:checked').value);
        let answers = [];
        document.querySelectorAll('input[name="answers"][type="text"]').forEach((element) => {
            answers.push(element.value);
        });
        const question = {
            id: id,
            question: questionString,
            answers: answers,
            correctIndex: correctIndex
        }
        dispatch(addQuestion(question));
        dispatch(questionPoolInit());
        setIsCorrect(false);
        resetForm();
    }

    return(
        <div className={conStyles.container}>
            <h2 className={styles.formHeader}>Add a question!</h2>
            <label htmlFor="question"><h3>Question</h3></label>
            <input type="text" name="question" id="question"/>
            <div className={styles.answerOption}>
                <h3>Answers</h3>
                <div className={styles.optionGroup}>
                    <input type="text" name="answers" id="a1"/>
                    <input onClick={handleChange} type="radio" name="answers" id="1" value="0"/>
                </div>
                <div className={styles.optionGroup}>
                    <input type="text" name="answers" id="a2"/>
                    <input onClick={handleChange} type="radio" name="answers" id="2" value="1"/>
                </div>
                <div className={styles.optionGroup}>
                    <input type="text" name="answers" id="a3"/>
                    <input onClick={handleChange} type="radio" name="answers" id="3" value="2"/>
                </div>
                <div className={styles.optionGroup}>
                    <input type="text" name="answers" id="a4"/>
                    <input onClick={handleChange} type="radio" name="answers" id="4" value="3"/>
                </div>
            </div>
            {
                isCorrectSet
                ? <button onClick={handleSend}> Send </button>
                : <button disabled={true}> Send </button>
            }
        </div>
    );
}