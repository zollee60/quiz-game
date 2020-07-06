import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, selectNumOfQuestions, questionPoolInit} from '../QuizBank/quizBankSlice';
import styles from '../QuizBank/QuizBank.module.css';
import conStyles from '../GameContainer/GameContainer.module.css';

export function QuestionForm(){
    const dispatch = useDispatch();
    const numOfQuestions = useSelector(selectNumOfQuestions);
    const [state, setState] = useState({
        isCorrectSet: false,
        question: '',
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        correctIndex: -1
    })

    const resetForm = () => {
        setState({
            isCorrectSet: false,
            question: '',
            a1: '',
            a2: '',
            a3: '',
            a4: '',
            correctIndex: -1
        })
    }

    const handleAnswerRadioBtChange = (event) => {
        setState({
            ...state,
            isCorrectSet: true,
            correctIndex: parseInt(event.target.value)
        })
    }

    const handleTextInputChange = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        })
    }

    const validateForm = () => {
        const answersAreSet = state.a1 !== '' && state.a2 !== '' && state.a3 !== '' && state.a4 !== '';
        return state.isCorrectSet && answersAreSet && state.question !== '';
    }

    const handleSend = () => {
        const id = numOfQuestions + 1;
        const question = {
            id: id,
            question: state.question,
            answers: [state.a1, state.a2, state.a3, state.a4],
            correctIndex: state.correctIndex
        }
        dispatch(addQuestion(question));
        dispatch(questionPoolInit());
        resetForm();
    }

    return(
        <div className={conStyles.container}>
            <h2 className={styles.formHeader}>Add a question!</h2>
            <label htmlFor="question"><h3>Question</h3></label>
            <input type="text" onChange={handleTextInputChange} name="question" id="question" value={state.question}/>
            <div className={styles.answerOption}>
                <h3>Answers</h3>
                <div className={styles.optionGroup}>
                    <textarea name="answers" id="a1" onChange={handleTextInputChange} value={state.a1}/>
                    <input onClick={handleAnswerRadioBtChange} type="radio" name="a1" value="0" checked={state.correctIndex === 0}/>
                </div>
                <div className={styles.optionGroup}>
                    <textarea name="answers" id="a2" onChange={handleTextInputChange} value={state.a2}/>
                    <input onClick={handleAnswerRadioBtChange} type="radio" name="a2" value="1" checked={state.correctIndex === 1}/>
                </div>
                <div className={styles.optionGroup}>
                    <textarea name="answers" id="a3" onChange={handleTextInputChange} value={state.a3}/>
                    <input onClick={handleAnswerRadioBtChange} type="radio" name="a3" value="2" checked={state.correctIndex === 2}/>
                </div>
                <div className={styles.optionGroup}>
                    <textarea name="answers" id="a4" onChange={handleTextInputChange} value={state.a4}/>
                    <input onClick={handleAnswerRadioBtChange} type="radio" name="a4" value="3" checked={state.correctIndex === 3}/>
                </div>
            </div>
            {
                validateForm()
                ? <button onClick={handleSend}> Send </button>
                : <button disabled={true}> Send </button>
            }
        </div>
    );
}