import axios from 'axios'

class User {
  constructor (hasFake) {
    this.fake = hasFake
  }

  async info () {
    if (this.fake) {
      return axios.get(
        axios.token === '13'
          ? 'https://my-json-server.typicode.com/RomanGaniev/fake-target/user/2'
          : 'https://my-json-server.typicode.com/RomanGaniev/fake-target/user/1'
      )
    }
  }

  /*
    отправляет сообщение пользователю
    user_ids[]: 1
    label: default
    title: тест
    message: тест контент
    photos[]: (binary)
    docs[]: (binary)
  */
  getAnnualVacation = () => axios.get('api/v1/admin/document_templates/annual_vacation')
  sendAnnualVacalation = (data) => axios.post('api/v1/admin/documents/annual_vacation', data, { headers: { 'Content-Type': 'multipart/form-data' } })

  getAdministrativeVacalation = () => axios.get('api/v1/admin/document_templates/administrative_vacation')
  sendAministrativeVacalation = (data) => axios.post('api/v1/admin/documents/administrative_vacation', data, { headers: { 'Content-Type': 'multipart/form-data' } })

  getPeiodChange = () => axios.get('api/v1/admin/document_templates/vacation_period_change')
  sendPeriodChange = (data) => axios.post('api/v1/admin/documents/vacation_period_change', data, { headers: { 'Content-Type': 'multipart/form-data' } })

  sendMessage = (data) => axios.post('api/v1/admin/messages/send', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  verifyDoc = (data) => axios.post('api/v1/admin/employment/verify/doc', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  verifyRegistration = (data) => axios.post('api/v1/admin/employment/verify/registration', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  // фото документов на трудоустройство
  showNotVerifiedRegistrations = (data) => axios.post('api/v1/admin/employment/applications', data)
  showNotVerifiedRegistrationsByFio = (data) => axios.post('api/v1/admin/employment/filter-by-fio', data)
  showNotVerifiedRegistrationsByProject = (data) => axios.post('api/v1/admin/employment/filter-by-project', data)
  showNotVerifiedRegistrationsByFioAndProject = (data) => axios.post('api/v1/admin/employment/filter-by-fio-and-project', data)

  showOneApplication = (data) => axios.get(`api/v1/admin/employment/application/${data.params.uuid}`, data)

  send1C = (data) => axios.get(`api/v1/admin/employment/application/${data.uuid}/1c`, data)

  projectList = (data) => axios.get('api/v1/admin/employees/project_list', data)

  // показать сотрудников супервайзеров возможно передается страница номер
  showEmployees = (data) => axios.post('api/v1/admin/employees', data)
  showSelectedEmployees = (data) => axios.post('api/v1/admin/employees/selected', data)
  showEmployeesByProject = (data) => axios.post('api/v1/admin/employees/filter-by-project', data)
  showEmployeesByFio = (data) => axios.post('api/v1/admin/employees/filter-by-fio', data)
  showEmployeesByFioAndProject = (data) => axios.post('api/v1/admin/employees/filter-by-fio-and-project', data)

  categoryList = (data) => axios.get('api/v1/admin/tutorial/category_list', data)

  postTutorials = (data) => axios.post('api/v1/admin/tutorials/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  saveTutorial = (data) => {
    axios.post(`api/v1/admin/tutorial/${data.get('tutorial_id')}/save`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  showTutorials = (data) => axios.get(`api/v1/admin/tutorials/${data.project_id}/${data.category_id}`, data)

  showProjects = (data) => axios.get('api/v1/admin/tests/projects')
  showProjectsTest = (data) => axios.get(`api/v1/admin/tests/project/${data.project_id}/show`)
  testAdd = (data) => axios.post(`api/v1/admin/tests/project/${data.project_id}/save`, data)
  testSave = (data) => axios.post(`api/v1/admin/tests/test/${data.test_id}/save`, data)
  testDelete = (data) => axios.post(`api/v1/admin/tests/test/${data.test_id}/delete`, data)

  downloadDoc = (data) => axios.get(`api/v1/admin/tutorials/${data.tutorialId}/download/${data.docId}`)
  // сообщения за месяц
  showMonthMessage = (data) => axios.get('api/v1/admin/month-messages')
  // удалить сообщения this.mailings[i].id
  removeMonthMessage = (data) => axios.post(`api/v1/admin/month-messages/${data.id}/remove`)

  // отправляет сообщение с рассылкой на месяц
  /*
    параметры
    user_ids[]: 1
    days[]: 21
    label: default
    title: тест
    message: контетн тест
    photos[]: (binary)
    photos[]: (binary)
    docs[]: (binary)
  */
  addMonthMessage = (data) => axios.post('api/v1/admin/month-messages/store', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  importBonusList = (data) => axios.post('api/v1/admin/employees/bonuslist', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  // фото документов на отпуск
  showVacationRequests = () => axios.post('api/v1/admin/vacation/requests')

  showVacationRequestsByFio = (data) => axios.post('api/v1/admin/vacation/filter-by-fio', data)
  showVacationRequestsByProject = (data) => axios.post('api/v1/admin/vacation/filter-by-project', data)
  showVacationRequestsByFioAndProject = (data) => axios.post('api/v1/admin/vacation/filter-by-fio-and-project', data)

  showVacationBlank = (data) => axios.get(`api/v1/admin/vacation/requests/${data.params.uuid}`, data)

  approveVacationBlank = (data) => axios.post('api/v1/admin/vacation/approve', data)

  downloadVacationScan = (data) => axios.get(`api/v1/admin/vacation/${data.blank_id}/download/${data.scan_id}`)
}
export default User
