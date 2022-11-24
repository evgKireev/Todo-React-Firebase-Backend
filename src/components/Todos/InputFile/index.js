import styles from './InputFile.module.scss';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setValueInputFile } from '../../../redux/todoSlice';

const InputFile = () => {
  const valueInputFile = useSelector((state) => state.todoSlice.valueInputFile);
  const dispatch = useDispatch();
  return (
    <div>
      <div className={classNames(styles.inputInner)}>
        <div className={classNames(styles.title)}>
          {valueInputFile}
          <span
            onClick={() => dispatch(setValueInputFile('Файл не выбран'))}
            className={classNames(styles.closes, {
              [styles.closesActive]: valueInputFile !== 'Файл не выбран',
            })}
          >
            x
          </span>
        </div>
        <label className={styles.label} htmlFor="file">
          <input
            onChange={(e) => {
              if (e.target.files) {
                dispatch(setValueInputFile(e.target.files[0].name));
              }
            }}
            className={styles.input}
            type="file"
            name="file"
            id="file"
          />
          <div className={styles.btn}>Upload now</div>
        </label>
      </div>
    </div>
  );
};

export default InputFile;
