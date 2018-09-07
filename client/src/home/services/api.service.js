import ApiTool from "../tools/api.tool";
import Axios from 'axios';

export default class ApiService {
  handleError(e) {
    let errorMessage = e + '';

    if (e.response && e.response.data) {
      errorMessage += '\n message: ' + e.response.data.message;
    }

    alert(errorMessage);
  }

  createRecord(record) {
    const url = ApiTool().createRecordUrl();

    return Axios.post(url, record).then(response => response.data)
      .catch(this.handleError);
  }

  patchRecord(id, partial) {
    const url = ApiTool().patchRecordUrl(id);

    return Axios.patch(url, partial).catch(this.handleError);
  }
}