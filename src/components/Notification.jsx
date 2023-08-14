const Info = ({ message }) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  );
};

const Success = ({ message }) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

const Warning = ({ message }) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-warning">
        <span>{message}</span>
      </div>
    </div>
  );
};

const Error = ({ message }) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
};

export { Info, Success, Error, Warning };
