import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuestions, removeQuestion } from './quizBankSlice';
import styles from './QuizBank.module.css';

export function QuizBank(){
    const questions = useSelector(selectQuestions);
    const dispatch = useDispatch();

    const renderTableData = () => questions.map((q) => {
        const {id, question} = q;
        return (
            <tr>
                <td className={styles.iCell}>{id}</td>
                <td className={styles.qCell}>{question}</td>
                <td>
                    <button className={styles.deleteBt} onClick={() => dispatch(removeQuestion(id))}> <img className={styles.btImage} src={require('../../assets/trash.png')}/> </button>
                </td>
            </tr>
        )
    })

    return(
        <div className={styles.container}>
            <h3>Question Bank</h3>
            <table className={styles.qTable}>
                {renderTableData()}
            </table>
        </div>
    );
}