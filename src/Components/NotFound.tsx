import { NotFoundLink, NotFoundSection, NotFoundText } from './NotFound.styles';

const NotFound = () => {
  return (
    <NotFoundSection className="container">
      <h1 className="title">Página não encontrada</h1>
      <NotFoundText>O endereço acessado não existe ou foi movido.</NotFoundText>
      <NotFoundLink to="/">Voltar para o feed</NotFoundLink>
    </NotFoundSection>
  );
};

export default NotFound;
