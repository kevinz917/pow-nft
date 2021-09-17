interface ownProps {
  fill?: string;
}

const MediumLogo = (props: ownProps): JSX.Element => {
  const { fill } = props;

  const fillColor = fill || 'white';

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0V18H18V0H0ZM14.956 4.264L13.992 5.188C13.908 5.252 13.868 5.356 13.884 5.456V12.26C13.868 12.364 13.908 12.468 13.992 12.528L14.936 13.452V13.656H10.192V13.46L11.168 12.512C11.264 12.416 11.264 12.388 11.264 12.244V6.74L8.548 13.636H8.184L5.02 6.74V11.36C4.992 11.552 5.06 11.748 5.196 11.892L6.464 13.432V13.636H2.856V13.432L4.124 11.892C4.26 11.752 4.32 11.556 4.288 11.36V6.02C4.304 5.872 4.248 5.728 4.136 5.628L3.008 4.264V4.06H6.52L9.228 10.008L11.612 4.064H14.956V4.264Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default MediumLogo;
