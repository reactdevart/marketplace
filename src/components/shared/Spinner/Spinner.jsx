import '@/components/shared/Spinner/Spinner.scss';

const Spinner = ({ size = 48 }) => {
  return <span style={{ width: size, height: size }} className="spinner" />;
};

export default Spinner;
