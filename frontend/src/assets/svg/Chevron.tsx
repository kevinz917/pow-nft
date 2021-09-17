interface chevronOwnTypes {
  fill?: string;
}

const Chevron = (props: chevronOwnTypes): JSX.Element => {
  const { fill } = props;

  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.116211 1.88398L1.88398 0.116211L6.00009 4.23233L10.1162 0.116211L11.884 1.88398L6.00009 7.76786L0.116211 1.88398Z"
        fill={fill || 'black'}
      />
    </svg>
  );
};

export default Chevron;
