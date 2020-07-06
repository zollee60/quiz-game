import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuestions, removeQuestion } from './quizBankSlice';
import styles from './QuizBank.module.css';

export function QuizBank(){
    const questions = useSelector(selectQuestions);
    const dispatch = useDispatch();
    const [dropDownList, setDropDownList] = useState([]);

    const handleTableRowClick = (i) => {
        if(dropDownList.includes(i)){
            const newState = dropDownList.filter((x) => x !== i);
            setDropDownList(newState);
        }
        else{
            setDropDownList([
                ...dropDownList,
                i
            ])
        }
    }

    const renderAnswers = (answers, correctIndex) => {
        return (
            <ul>
                {answers.map((a, i) => {
                    return(
                        i === correctIndex ? <li>{a + ' - correct!'}</li> : <li>{a}</li>
                    )
                })}
            </ul>
        )
    }

    const renderTableData = () => questions.map((q,i) => {
        const {id, question, answers, correctIndex} = q;
        return (
            <tr key={id} onClick={() => {handleTableRowClick(i)}}>
                <td className={styles.iCell}>{id}</td>
                <td className={styles.qCell}>
                    <h4>{question}</h4>
                    {dropDownList.includes(i) && renderAnswers(answers, correctIndex)}
                </td>
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
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
}