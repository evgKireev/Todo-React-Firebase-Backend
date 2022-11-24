import InputFile from '../InputFile';
import styles from './TodoForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  setText,
  setTextArea,
  setValueData,
  setValueInputFile,
} from '../../../redux/todoSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TodoForm({ addTodo }) {
  const text = useSelector((state) => state.todoSlice.text);
  const textArea = useSelector((state) => state.todoSlice.textArea);
  const valueData = useSelector((state) => state.todoSlice.valueData);
  const valueInputFile = useSelector((state) => state.todoSlice.valueInputFile);
  const [data, setData] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const dispatch = useDispatch();

  const timeTodo = (data) => {
    const date = data;
    let D = date.getDate();
    let M = date.getMonth() + 1;
    let Y = date.getFullYear();
    if (D < 10) {
      D = '0' + D;
    }
    if (M < 10) {
      M = '0' + M;
    }
    return `${D}.${M}.${Y}`;
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(text, textArea, valueData, valueInputFile);
          dispatch(setText(''));
          dispatch(setTextArea(''));
          dispatch(setValueData(''));
          dispatch(setValueInputFile('Файл не выбран'));
        }}
      >
        <input
          className={styles.input}
          onChange={(e) => {
            dispatch(setText(e.target.value));
          }}
          placeholder="Введите заголовок задачи"
          value={text}
          required
        />
        <textarea
          className={styles.textarea}
          placeholder="Введите описание задачи"
          onChange={(e) => {
            dispatch(setTextArea(e.target.value));
          }}
          value={textArea}
          required
        ></textarea>
        <InputFile />
        <div className={styles.Data}>
          <input
            onChange={() => {}}
            className={styles.inputData}
            onClick={() => setOpenCalendar(true)}
            placeholder="Введите дату окончания задачи"
            value={valueData}
            required
          />
          <button className={styles.button} type="submit">
            Add todo
          </button>
          {openCalendar && (
            <Calendar
              className={styles.calendar}
              onChange={(value) => {
                dispatch(setValueData(timeTodo(value)));
                setOpenCalendar(false);
              }}
              value={data}
            />
          )}
        </div>
      </form>
    </div>
  );
}
export default TodoForm;
