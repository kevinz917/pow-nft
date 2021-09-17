interface ownProps {
  fill?: string;
}

const OutwardSignal = (props: ownProps): JSX.Element => {
  const { fill } = props;

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.76887 3.76898L11.5556 5.0277L5.02759 11.5557L3.76887 3.76898Z" fill={fill || 'black'} />
      <path d="M16.2311 16.6214L8.44444 15.3627L14.9724 8.83472L16.2311 16.6214Z" fill={fill || 'black'} />
    </svg>
  );
};

export default OutwardSignal;
