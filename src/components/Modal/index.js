import classNames from 'classnames';
import styles from './Modal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  setEditCardTitle,
  setIsOpenModal,
  setEditCardText,
  setEditCardData,
} from '../../redux/todoSlice';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Modal = ({ text, desc, data, file, id }) => {
  const isOpenModal = useSelector((state) => state.todoSlice.isOpenModal);
  const editCardTitle = useSelector((state) => state.todoSlice.editCardTitle);
  const editCardText = useSelector((state) => state.todoSlice.editCardText);
  const editCardData = useSelector((state) => state.todoSlice.editCardData);

  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const [editData, setEditData] = useState('');

  const dispatch = useDispatch();

  //Изменение данных ту-ду и отправка на Firebase
  const editTodoHandler = async (id) => {
    await updateDoc(doc(db, 'todos', id), {
      text: editTitle === '' ? text : editTitle,
      desc: editText === '' ? desc : editText,
      data: editData === '' ? data : editData,
    });
  };

  return (
    <>
      <div
        className={classNames(styles.wrapper, {
          [styles.showModal]: isOpenModal,
        })}
      >
        <div className={styles.container}>
          <div>
            <div className={styles.title}>
              {!editCardTitle ? (
                <div
                  onClick={() => {
                    dispatch(setEditCardTitle(true));
                    setEditTitle(text);
                  }}
                >
                  {!editTitle ? text : editTitle}
                </div>
              ) : (
                <div className={styles.innerInput}>
                  <input
                    className={styles.input}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                    value={editTitle}
                  />
                  <FaCheck
                    className={styles.icons}
                    onClick={() => {
                      dispatch(setEditCardTitle(false));
                    }}
                  />
                </div>
              )}
            </div>
            <div className={styles.desc}>
              {!editCardText ? (
                <div
                  onClick={() => {
                    dispatch(setEditCardText(true));
                    setEditText(desc);
                  }}
                >
                  {!editText ? desc : editText}
                </div>
              ) : (
                <div className={styles.innerInput}>
                  <input
                    className={styles.input}
                    onChange={(e) => {
                      setEditText(e.target.value);
                    }}
                    value={editText}
                  />
                  <FaCheck
                    className={styles.icons}
                    onClick={() => {
                      dispatch(setEditCardText(false));
                    }}
                  />
                </div>
              )}
            </div>
            <div className={styles.innerDataFile}>
              <p>Дата выполнения задания:</p>
              {!editCardData ? (
                <div
                  className={styles.data}
                  onClick={() => {
                    dispatch(setEditCardData(true));
                    setEditData(data);
                  }}
                >
                  {!editData ? data : editData}
                </div>
              ) : (
                <div className={styles.innerInput}>
                  <input
                    className={styles.inputData}
                    onChange={(e) => {
                      setEditData(e.target.value);
                    }}
                    value={editData}
                  />
                  <FaCheck
                    className={styles.iconsData}
                    onClick={() => {
                      dispatch(setEditCardData(false));
                    }}
                  />
                </div>
              )}
            </div>
            <button
              className={styles.btn}
              onClick={() => {
                editTodoHandler(id);
                dispatch(setIsOpenModal(false));
              }}
            >
              Edit
            </button>
          </div>

          <AiOutlineClose
            className={styles.closes}
            onClick={() => {
              dispatch(setIsOpenModal(false));
              dispatch(setEditCardTitle(false));
              dispatch(setEditCardText(false));
              dispatch(setEditCardData(false));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Modal;
