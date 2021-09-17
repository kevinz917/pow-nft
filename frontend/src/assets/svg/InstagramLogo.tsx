interface ownProps {
  fill?: string;
}

const InstagramLogo = (props: ownProps): JSX.Element => {
  const { fill } = props;

  const fillColor = fill || 'white';

  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 1H6C3.23858 1 1 3.23858 1 6V16C1 18.7614 3.23858 21 6 21H16C18.7614 21 21 18.7614 21 16V6C21 3.23858 18.7614 1 16 1Z"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10.37C15.1234 11.2022 14.9813 12.0522 14.5938 12.799C14.2063 13.5458 13.5931 14.1514 12.8416 14.5297C12.0901 14.9079 11.2384 15.0396 10.4078 14.9059C9.57713 14.7723 8.80976 14.3801 8.21484 13.7852C7.61992 13.1902 7.22773 12.4229 7.09407 11.5922C6.9604 10.7616 7.09207 9.90989 7.47033 9.15837C7.84859 8.40685 8.45419 7.79374 9.20098 7.40624C9.94778 7.01874 10.7978 6.87659 11.63 7C12.4789 7.12588 13.2649 7.52146 13.8717 8.12831C14.4785 8.73515 14.8741 9.52108 15 10.37Z"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.5 5.5H16.51" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default InstagramLogo;
