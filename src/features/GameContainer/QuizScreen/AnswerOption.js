import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { questionPoolRemove, selectActiveCorrectIndex, selectAnswered, setAnswered, selectActiveIndex, setSelectedAnswerIndex, getSelectAnswerIndex } from '../../QuizBank/quizBankSlice';
import { incrementPoint } from '../../userSlice';
import styles from './QuizScreen.module.css';

export function AnswerOption(props){
    const dispatch = useDispatch();
    const answered = useSelector(selectAnswered);
    const correctIndex = useSelector(selectActiveCorrectIndex);
    const activeQuestionIndex = useSelector(selectActiveIndex);
    const selectedAnswerIndex = useSelector(getSelectAnswerIndex);
    const [style, setStyle] = useState(props.style);

    const getClassName = () =>{
        switch(style){
            case 'default':
                return `${styles.answerOption} ${styles.answerTableRow}`;
            case 'correct':
                return `${styles.correctAnswerStyle} ${styles.answerTableRow}`;
            case 'incorrect':
                return `${styles.incorrectAnswerStyle} ${styles.answerTableRow}`;
        }
    }

    const handleClick = () => {
        if(!answered){
            dispatch(setAnswered(true));
            dispatch(setSelectedAnswerIndex(parseInt(props.value)));
            if(parseInt(props.value) === parseInt(correctIndex)){
                setStyle('correct');
                dispatch(incrementPoint());
            }
            else{
                setStyle('incorrect');
            }
            dispatch(questionPoolRemove(activeQuestionIndex));
        }
    }

    useEffect(() => {
        setStyle('default');
    }, [activeQuestionIndex]);

    useEffect(() => {
        if(selectedAnswerIndex !== -1 && selectedAnswerIndex !== parseInt(correctIndex) && parseInt(props.value) === parseInt(correctIndex)){
            setStyle('correct');
        }
    }, [correctIndex, props.value, selectedAnswerIndex])

    return(
        <tr className={getClassName()}  onClick={handleClick}>
            <td>{(props.value+1)}</td>
            <td>{props.answer}</td>
        </tr>
    )
}