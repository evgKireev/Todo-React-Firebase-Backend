import classNames from 'classnames';
import styles from './ModalShow.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenModalShow } from '../../redux/todoSlice';

const ModalShow = ({ text, desc, data, file, id }) => {
  const isOpenModalShow = useSelector(
    (state) => state.todoSlice.isOpenModalShow
  );
  const dispatch = useDispatch();
  const timeTodo = () => {
    const date = new Date();
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

  const stateDate = timeTodo();
  return (
    <>
      <div
        className={classNames(styles.wrapper, {
          [styles.showModal]: isOpenModalShow,
        })}
      >
        <div className={styles.container}>
          <div>
            <div className={styles.title}>
              <div>{text}</div>
            </div>
            <div className={styles.desc}>
              <div>{desc}</div>
            </div>
            <div className={styles.innerDataFile}>
              <p>{`Файл: ${file}`}</p>
              <div className={styles.dataShow}>
                {`Дедлайн задачи: ${data}`}
                {data === stateDate ? <span>Дедлайн истек!</span> : ''}
              </div>
            </div>
          </div>
          <AiOutlineClose
            className={styles.closes}
            onClick={() => {
              dispatch(setIsOpenModalShow(false));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ModalShow;
