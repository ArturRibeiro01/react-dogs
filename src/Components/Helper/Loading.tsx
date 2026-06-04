import { LoadingMessage } from './Loading.styles';

const Loading = () => {
    return (
        <LoadingMessage role="status" aria-live="polite">
            Carregando...
        </LoadingMessage>
    )
}
export default Loading
