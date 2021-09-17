interface ownProps {
  fill?: string;
}

const TrashIcon = (props: ownProps): JSX.Element => {
  const { fill } = props;

  const fillColor = fill || 'white';

  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.37354 4.66577H3.04031H16.3745"
        stroke={fillColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.54045 4.66577V2.99899C5.54045 2.55694 5.71606 2.13298 6.02864 1.8204C6.34122 1.50782 6.76517 1.33221 7.20723 1.33221H10.5408C10.9828 1.33221 11.4068 1.50782 11.7194 1.8204C12.032 2.13298 12.2076 2.55694 12.2076 2.99899V4.66577M14.7077 4.66577V16.3332C14.7077 16.7753 14.5321 17.1992 14.2195 17.5118C13.907 17.8244 13.483 18 13.041 18H4.70706C4.265 18 3.84105 17.8244 3.52847 17.5118C3.21589 17.1992 3.04028 16.7753 3.04028 16.3332V4.66577H14.7077Z"
        stroke={fillColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.20728 8.83273V13.8331"
        stroke={fillColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5409 8.83273V13.8331"
        stroke={fillColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
