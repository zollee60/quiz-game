import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { questionPoolRemove, selectActiveCorrectIndex, selectAnswered, setAnswered, selectActiveIndex } from '../../QuizBank/quizBankSlice';
import { incrementPoint } from '../../userSlice';
import styles from './QuizScreen.module.css';

export function AnswerOption(props){
    const dispatch = useDispatch();
    const answered = useSelector(selectAnswered);
    const correctIndex = useSelector(selectActiveCorrectIndex);
    const activeQuestionIndex = useSelector(selectActiveIndex);
    const [style, setStyle] = useState(props.style);

    const getClassName = () =>{

        switch(style){
            case 'default':
                return `${styles.answerOption} ${styles.answerTableRow}`;
            case 'correct':
                return `${styles.correctAnswerStyle} ${styles.answerTableRow}`;
            case 'incorrect':
                return `${styles.incorrectAnswerStyle} ${styles.answerTableRow}`;;
        }
    }

    const handleClick = () => {
        if(!answered){
            dispatch(setAnswered(true));
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

    return(
        <tr className={getClassName()}  onClick={handleClick}>
            <td>{(props.value+1)}</td>
            <td>{props.answer}</td>
        </tr>
    )
}