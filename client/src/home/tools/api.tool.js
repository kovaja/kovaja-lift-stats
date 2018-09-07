export default function ApiTool() {
  const apiprefix = '/api';

  return {
    createRecordUrl: () => `${apiprefix}/record`,
    patchRecordUrl: (id) => `${apiprefix}/record/${id}`
  }
}