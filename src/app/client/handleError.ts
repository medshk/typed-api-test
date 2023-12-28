export const handleError = (error: any) => {
  // this si the only "any" we can't get rid of, due to how errors handling works in TS.

  // note : this error handling is kinda fragile and annoying... definitely something that would be standardized and handled by the "mini-framework". But for simplicity sake here is the very simple version.

  // there might be errors from our handlers, and other errors from the server, network...
  // Here we try to differentiate them. We don't know what to do with other errors.
  const errorFromEndpointHandler = error.response?.data?.error;
  const isErrorFromEndpointHandler = errorFromEndpointHandler != null;

  if (isErrorFromEndpointHandler)
    console.log('Error from endpoint handler:', errorFromEndpointHandler);
  else console.log('Unknown error', error);
};
