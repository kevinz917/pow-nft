const pxForSpacerSize: Record<string, number> = {
  xxxsmall: 4,
  xxsmall: 6,
  xsmall: 8,
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 28,
  xxlarge: 34,
};

interface spacerOwnProps {
  size: string;
}

const Spacer = (props: spacerOwnProps) => {
  const { size } = props;

  return <div style={{ height: `${pxForSpacerSize[size]}px` }} />;
};

export default Spacer;
