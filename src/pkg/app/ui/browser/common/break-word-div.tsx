type Props = {
  children?: React.ReactNode;
};

export const BreakWordDiv = (props: Props) => {
  return (
    <div
      style={{
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-all",
      }}
    >
      {props.children}
    </div>
  );
};
