import Todo from './Todo';
import styles from './TodoList.module.scss';

function TodoList({ todos }) {
  return (
    <div className={styles.todoListContainer}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
export default TodoList;
