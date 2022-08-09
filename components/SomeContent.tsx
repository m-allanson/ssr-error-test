interface Props {
  children: React.ReactNode;
  throw: boolean;
}

function SomeContent(props: Props) {
  if (props.throw === true)
    throw new Error("Oops, Error thrown from SomeContent");
  return (
    <div
      style={{ padding: "1em", border: "1px solid hotpink", marginTop: "1em" }}
    >
      {props.children}
    </div>
  );
}

export default SomeContent;
