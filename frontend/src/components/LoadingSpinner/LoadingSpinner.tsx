import './loadingSpinner.scss';

const LoadingSpinner = (): JSX.Element => {
  const color = '#f3f3f3';

  return (
    <div className="loading-container spin-fast">
      <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.5 71C55.1061 71 71 55.1061 71 35.5C71 15.8939 55.1061 0 35.5 0C15.8939 0 0 15.8939 0 
          35.5C0 55.1061 15.8939 71 35.5 71ZM35.5 64.2913C51.401 64.2913 64.2913 51.401 
          64.2913 35.5C64.2913 19.599 51.401 6.70866 35.5 6.70866C19.599 6.70866 6.70866 19.599 6.70866 35.5C6.70866 51.401 19.599 64.2913 35.5 64.2913Z"
          fill={color}
        />
        <circle cx="35.5" cy="53.3898" r="6.42913" fill={color} />
        <circle cx="35.5" cy="17.6102" r="6.42913" fill={color} />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
