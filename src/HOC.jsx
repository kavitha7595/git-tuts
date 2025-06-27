function Hoc(CbComponent) {
  const NewComponent = (props) => {
    let message;
    if (props.age >= 18) {
      message = "Eligible to vote";
    } else {
      message = "Not eligible to vote";
    }

    return (
      <>
        <CbComponent {...props} message={message} />
      </>
    );
  };

  return NewComponent;
}

export default Hoc;