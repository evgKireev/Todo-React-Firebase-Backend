import { RiDeleteBin2Line, RiTodoFill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import styles from './Todo.module.scss';
import { useDispatch } from 'react-redux';
import {
  setIsOpenModal,
  setModalCard,
  setIsOpenModalShow,
} from '../../redux/todoSlice';
import { db } from '../../firebase';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';

function Todo({ todo }) {
  const dispatch = useDispatch();

  //Обновление данных ту-ду и отправка на Firebase
  const toggleTodoHandler = async (id) => {
    await updateDoc(doc(db, 'todos', id), {
      isCompleted: !todo.isCompleted,
    });
  };

  //Удаление элемента ту-ду и отправка на Firebase
  const deleteTodoHandler = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div
      title="Нажми два раза для просмотра задачи!"
      onDoubleClick={() => {
        dispatch(setIsOpenModalShow(true));
        dispatch(setModalCard(todo));
      }}
      className={`${styles.todo} ${
        todo.isCompleted === true ? styles.completedTodo : styles.todo
      } `}
    >
      <RiTodoFill className={styles.todoIcons} />
      <div className={styles.todoText}>{todo.text}</div>
      <RiDeleteBin2Line
        onClick={() => deleteTodoHandler(todo.id)}
        className={styles.todoDeleteIcons}
      />
      <FaCheck
        onClick={() => {
          toggleTodoHandler(todo.id);
        }}
        className={styles.todoCheckIcons}
      />
      <BsPencilFill
        className={styles.todoRedIcons}
        onClick={() => {
          dispatch(setIsOpenModal(true));
          dispatch(setModalCard(todo));
        }}
      />
    </div>
  );
}
export default Todo;
