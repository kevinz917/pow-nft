interface crossOwnTypes {
  fill?: string;
}

const Cross = (props: crossOwnTypes): JSX.Element => {
  const { fill } = props;

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.7189 11.668L9.0517 6.9999L13.7189 2.33214L11.6702 0.283203L7.00258 4.95078L2.335 0.283203L0.286056 2.33214L4.95382 6.9999L0.285156 11.668L2.33392 13.7168L7.00258 9.04848L11.6702 13.7168L13.7189 11.668Z"
        fill={fill || 'white'}
      />
    </svg>
  );
};

export default Cross;
