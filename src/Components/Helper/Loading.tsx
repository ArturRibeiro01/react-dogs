import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loading} role="status" aria-live="polite">
            Carregando...
        </div>
    )
}
export default Loading
