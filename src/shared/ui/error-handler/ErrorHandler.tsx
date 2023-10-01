/* eslint-disable no-case-declarations */

type ErrorHandlerProps = {
  error: any;
};

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error } = props;

  if (!error?.error) throw error as unknown;

  let errorList: string[] = [];

  switch (true) {
    case Object.hasOwn(error.error, 'message'):
      const genericError = error.error;
      errorList = [genericError.message];
      break;

    default:
      throw new Error('Unexpected error type');
  }

  return (
    <ul className="error-messages">
      {errorList.map((errorItem) => (
        <li key={errorItem}>{errorItem}</li>
      ))}
    </ul>
  );
}
