interface ownProps {
  fill?: string;
}

const InwardSignal = (props: ownProps): JSX.Element => {
  const { fill } = props;

  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.79949 7.79914L0.012803 6.54042L6.54077 0.0124495L7.79949 7.79914Z" fill={fill || 'black'} />
      <path d="M8.20051 8.59136L15.9872 9.85008L9.45923 16.3781L8.20051 8.59136Z" fill={fill || 'black'} />
    </svg>
  );
};

export default InwardSignal;
