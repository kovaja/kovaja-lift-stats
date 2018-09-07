export default function ApiTool() {
  const apiprefix = '/api';

  return {
    record: () => {

      const subUrl = 'record';

      return {
        create: () => `${apiprefix}/${subUrl}`,
        patch: (id) => `${apiprefix}/${subUrl}/${id}`,
        readAll: () => `${apiprefix}/${subUrl}`
      };
    }
  }
}