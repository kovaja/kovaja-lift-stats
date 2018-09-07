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

  extractData(response) {
    return response.data;
  }

  createRecord(record) {
    const url = ApiTool().record().create();

    return Axios.post(url, record)
      .then(this.extractData)
      .catch(this.handleError);
  }

  patchRecord(id, partial) {
    const url = ApiTool().record().patch(id);

    return Axios.patch(url, partial)
      .catch(this.handleError);
  }

  readRecords() {
    const url = ApiTool().record().readAll();

    return Axios.get(url)
      .then(this.extractData)
      .catch(this.handleError);
  }
}