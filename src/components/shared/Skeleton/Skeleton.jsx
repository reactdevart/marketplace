import '@/components/shared/Skeleton/Skeleton.scss';

const Skeleton = ({ count = 1, direction = 'row', space = 10, radius = '4px', height = '20px', width }) => {
  const skeletons = Array.from({ length: count });

  const skeletonStyle = {
    borderRadius: radius,
    width: width ? width : 'auto',
    height,
    flexGrow: direction === 'row' ? (width ? 0 : 1) : 0,
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: direction === 'row' ? 'row' : 'column',
    gap: count > 1 ? `${space}px` : '0px',
  };

  return (
    <div className="skeleton" style={containerStyle}>
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton__item" style={skeletonStyle}></div>
      ))}
    </div>
  );
};

export default Skeleton;
