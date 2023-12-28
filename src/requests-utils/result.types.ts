export type Result<Out extends object> = Promise<DataOrError<Out>>;
type DataOrError<Out extends object> =
  | {
      error: Err;
    }
  | {
      data: Out;
    };
export type Err = { message: string; status: number };

// allows us to discriminate successful vs failed results with type safety. See typescript "type guards".
export const isError = <Out extends object>(
  dataOrError: DataOrError<Out>
): dataOrError is { error: Err } => {
  return dataOrError.hasOwnProperty('error');
};
