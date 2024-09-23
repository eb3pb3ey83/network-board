import { apiSlice } from './apiSlice';

const downloadFile = (response: Response, title: string) => {
  const isCsv = response.headers.get('Content-Type') === 'text/csv; charset=BIG5';
  const result = isCsv ? response.blob() : response.json();
  result.then((response) => {
    if (!(response instanceof Blob)) return;
    const downloadElement = document.createElement('a');
    const link = window.URL.createObjectURL(response as Blob);

    downloadElement.href = link;
    downloadElement.download = title;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
  });

  return result;
};

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fileDownload: builder.query({
      query: ({ url, title }) => ({
        url: url.replace('api/', ''),
        method: 'GET',
        responseHandler: (response) => downloadFile(response, title),
        cache: 'no-cache',
      }),
    }),
    allFileDownload: builder.query({
      query: ({ url, title }) => ({
        url,
        method: 'GET',
        responseHandler: (response) => downloadFile(response, title),
        cache: 'no-cache',
      }),
    }),
  }),
});

export const { useFileDownloadQuery, useAllFileDownloadQuery } = extendedApiSlice;
