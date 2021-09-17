interface RenderIfProps {
  value: boolean;
  children: any;
  fade?: boolean;
  fadeLength?: string;
}

const RenderIf = (props: RenderIfProps): JSX.Element | null => {
  const { fade, value, children, fadeLength } = props;

  const fade_length_class: string = fadeLength ? `fade-in-${fadeLength}` : 'fade-in';

  return value ? <div className={`${fade && fade_length_class}`}>{children}</div> : null;
};

export default RenderIf;
