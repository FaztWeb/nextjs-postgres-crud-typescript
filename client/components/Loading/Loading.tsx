import ReactLoading from 'react-loading';
import loadingStyles from './loading.module.css';
const Loading = () => {
  return (
    <div className={loadingStyles.container}>
      <ReactLoading
        type="spin"
        color="cyan"
        height={100}
        width={100}
      ></ReactLoading>
    </div>
  );
};

export default Loading;
