<template lang="pug">
  q-page
    .q-pb-lg.text-h4.text-weight-bolder
      | Загрузка
    q-card(flat bordered).full-width
      q-card-section.q-px-xl
        q-item.no-padding
          q-item-section
            q-item-label.q-py-md.row.justify-between.no-wrap.items-center
              div Шаблон заявления на ежегодный отпуск
              .row.no-wrap.text-no-wrap
                input(
                  ref="uploadAnnualVacation"
                  type="file"
                  accept=".doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  @change="() => upload('annual', 'uploadAnnualVacation')"
                  hidden
                )
                a(
                    href="https://atconnect.ru/storage/document_templates/annual_vacation.docx"
                    download
                    ref="uploadAnn"
                    style="display:none"
                  )
                OriginalButton.q-px-lg.q-mr-lg(
                  :showLoad="false"
                  @click="$refs.uploadAnn.click()"
                ) Выгрузить текущий
                OriginalButton.q-px-lg(
                  :showLoad="false"
                  @click="open('popupannual')"
                ) Загрузить новый
      q-separator
      q-card-section.q-px-xl
        q-item.no-padding
          q-item-section
            q-item-label.q-py-md.row.justify-between.no-wrap.items-center
              div Шаблон заявления на административный отпуск
              .row.no-wrap.text-no-wrap
                input(
                  ref="uploadAdministrativeVacalation"
                  type="file"
                  accept=".doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  @change="() => upload('administrative','uploadAdministrativeVacalation')"
                  hidden
                )
                a(
                    href="https://atconnect.ru/storage/document_templates/administrative_vacation.docx"
                    download
                    ref="uploadAdm"
                    style="display:none"
                  )
                OriginalButton.q-px-lg.q-mr-lg(
                  :showLoad="false"
                  @click="$refs.uploadAdm.click()"
                ) Выгрузить текущий
                OriginalButton.q-px-lg(
                  :showLoad="false"
                  @click="open('popupadministrative')"
                ) Загрузить новый
      q-separator
      q-card-section.q-px-xl
        q-item.no-padding
          q-item-section
            q-item-label.q-py-md.row.justify-between.no-wrap.items-center
              div Памятка по начислениям
              .row.no-wrap.text-no-wrap
                input(
                  ref="uploadPeriodChange"
                  type="file"
                  accept=".doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  @change="() => upload('period','uploadPeriodChange')"
                  hidden
                )
                a(
                    href="https://atconnect.ru/storage/document_templates/vacation_period_change.doc"
                    download
                    ref="uploadPriod"
                    style="display:none"
                  )
                OriginalButton.q-px-lg.q-mr-lg(
                  :showLoad="false"
                  @click="$refs.uploadPriod.click()"
                ) Выгрузить текущий
                OriginalButton.q-px-lg(
                  :showLoad="false"
                  @click="open('popupperiod')"
                ) Загрузить новый
      q-separator
      q-card-section.q-px-xl
        q-item.no-padding(v-for="test in tests")
          q-item-section
            q-item-label.q-py-md.row.justify-between.no-wrap.items-center
              div {{test.title}}
              .row.no-wrap.text-no-wrap
                OriginalButton.q-px-lg(
                  @click="(btn)=>deleteTest(test.id, btn)"
                  color="red"
                )
                  q-icon(name="mdi-trash-can-outline")
      q-separator

    q-footer.bg-white.footer-header.row.items-center(
      bordered
     )
      q-toolbar.max-width.q-px-xl
        q-toolbar-title
        .col-6
          .row.items-center.no-wrap.justify-end.text-no-wrap
            OriginalButton.q-mr-lg.text-black.q-px-lg(
              @click="$router.go(-1)"
            ) Назад
    q-dialog(
        v-model="popupannual"
      )
      q-card(style="width:50%;max-height:589px;height:100%").flex.column
        q-card-section.q-py-sm.q-px-none.bg-grey-3
          q-item
            q-item-section
              q-item-label.text-h6.text-weight-bolder
                | На ежегодный отпуск
            q-item-section(side)
              q-btn(
                size="sm"
                flat
                color="grey-5"
                icon="mdi-window-close"
                @click="popupannual = false")
        div.flex.column
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Имя"
                  v-model="firstName"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Фамилия"
                  v-model="lastName"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Отчество"
                  v-model="patronymic"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
                OriginalButton.q-px-lg.q-mb-md(
                  :showLoad="false"
                  @click="$refs.uploadAnnualVacation.click()"
                ) Добавить файл
                OriginalButton.q-px-lg(
                  color="red"
                  @click="(btn) => download('annual', btn)"
                ) Загрузить
    q-dialog(
        v-model="popupadministrative"
      )
      q-card(style="width:50%;max-height:589px;height:100%").flex.column
        q-card-section.q-py-sm.q-px-none.bg-grey-3
          q-item
            q-item-section
              q-item-label.text-h6.text-weight-bolder
                | На административный отпуск
            q-item-section(side)
              q-btn(
                size="sm"
                flat
                color="grey-5"
                icon="mdi-window-close"
                @click="popupadministrative = false")
        div.flex.column
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Имя"
                  v-model="firstName"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Фамилия"
                  v-model="lastName"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Отчество"
                  v-model="patronymic"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
                OriginalButton.q-px-lg.q-mb-md(
                  :showLoad="false"
                  @click="$refs.uploadAdministrativeVacalation.click()"
                ) Добавить файл
                OriginalButton.q-px-lg(
                  color="red"
                  @click="(btn) => download('administrative', btn)"
                ) Загрузить
    q-dialog(
        v-model="popupperiod"
      )
      q-card(style="width:50%;max-height:589px;height:100%").flex.column
        q-card-section.q-py-sm.q-px-none.bg-grey-3
          q-item
            q-item-section
              q-item-label.text-h6.text-weight-bolder
                | Памятка по начислениям
            q-item-section(side)
              q-btn(
                size="sm"
                flat
                color="grey-5"
                icon="mdi-window-close"
                @click="popupperiod = false")
        div.flex.column
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Имя"
                  v-model="firstName"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Фамилия"
                  v-model="lastName"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
              q-item-label
                q-input(
                  label="Отчество"
                  v-model="patronymic"
                  outlined
                  bg-color="grey-2"
                  color="red"
                )
          q-item
            q-item-section
                OriginalButton.q-px-lg.q-mb-md(
                  :showLoad="false"
                  @click="$refs.uploadPeriodChange.click()"
                ) Добавить файл
                OriginalButton.q-px-lg(
                  color="red"
                  @click="(btn) => download('period', btn)"
                ) Загрузить

</template>
<script>
import OriginalButton from "components/OriginalButton.vue";
import InactiveButton from "components/InactiveButton.vue";
import _ from "lodash";
import Api from "modules/api";
const api = new Api("Admin");
export default {
  components: { OriginalButton, InactiveButton },
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      patronymic: null,
      popupannual: false,
      popupadministrative: false,
      popupperiod: false,
      annualFile: null,
      administrativeFile: null,
      periodFile: null,
      tests: null,
      parameter: [],
      parameters: [
        {
          label: "Оклад по часам",
          value: false
        },
        {
          label: "Оклад по часам с НДФЛ",
          value: false
        },
        {
          label: "Бонус",
          value: false
        },
        {
          label: "Бонус с НДФЛ",
          value: false
        },
        {
          label: "Начисление отпуска",
          value: false
        },
        {
          label: "Начисление отпуска с НДФЛ",
          value: false
        },
        {
          label: "Больничный за счет работодателя",
          value: false
        },
        {
          label: "Больничный за счет работодателя с НДФЛ",
          value: false
        },
        {
          label: "Больничный за счет ФСС",
          value: false
        },
        {
          label: "Больничный за счет ФСС с НДФЛ",
          value: false
        },
        {
          label: "Мобильная связь",
          value: false
        },
        {
          label: "Мобильная связь с НДФЛ",
          value: false
        },
        {
          label: "ГСМ",
          value: false
        },
        {
          label: "ГСМ с НДФЛ",
          value: false
        },
        {
          label: "Прочие доплаты",
          value: false
        },
        {
          label: "Прочие доплаты с НДФЛ",
          value: false
        },
        {
          label: "Комментарий к доплате",
          value: false
        },
        {
          label: "Оплата проезда",
          value: false
        },
        {
          label: "Оплата проезда с НДФЛ",
          value: false
        },
        {
          label: "Районный коэффициент %",
          value: false
        },
        {
          label: "Районный коэффициент сумма",
          value: false
        },
        {
          label: "Районный коэффициент сумма с НДФЛ",
          value: false
        },
        {
          label: "Северная надбавка %",
          value: false
        },
        {
          label: "Северная надбавка сумма",
          value: false
        },
        {
          label: "Северная надбавка сумма с НДФЛ",
          value: false
        },
        {
          label: "НДФЛ удержанный",
          value: false
        },
        {
          label: "НДФЛ с вычета",
          value: false
        }
      ]
    };
  },
  methods: {
    deleteTest(id, btn) {
      api
        .call("testDelete", {
          test_id: id
        })
        .then(({ data }) => {
          this.showTests();
        })
        .finally(() => btn.offLoad());
    },
    showTests() {
      // console.log(this.project)
      this.$nextTick(() => {
        const project = this.project;
        api
          .call("showProjectsTest", {
            project_id: project.value
          })
          .then(({ data }) => {
            this.tests = data;
          });
      });
    },
    download(name, btn) {
      const fd = new FormData();
      fd.append(
        "fullName",
        `${this.firstName}${this.lastName}${this.patronymic}`
      );
      fd.append("projectId", this.project.value);
      fd.append("file", this.$axios.dataURLtoBlob(this[`${name}File`]));
      const nameFetch =
        name === "annual"
          ? "sendAnnualVacalation"
          : name === "administrative"
          ? "sendAministrativeVacalation"
          : "sendPeriodChange";
      api
        .call(nameFetch, fd)
        .then(({ data }) => {
          this.firstName = null;
          this.lastName = null;
          this.patronymic = null;
          this[`${name}File`] = null;
          this[`popup${name}`] = null;
          this.$q.notify("Файл загружен");
        })
        .catch(data => {
          this.$q.notify("Ошибка в загрузке файла");
          this.firstName = null;
          this.lastName = null;
          this.patronymic = null;
          this[`${name}File`] = null;
          this[`popup${name}`] = null;
          if (data.response) {
            const errors = data.response.data.errors;

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key]);
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0];
              }
            });
          }
        })
        .finally(() => btn.offLoad());
    },
    open(name) {
      if (this.project && this.project.value !== "all") this[name] = true;
      else this.$q.notify("Выберите проект");
    },
    fileDataURL(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = reject;
        fr.readAsDataURL(file);
      });
    },
    auth() {
      this.$appAlert();
    },
    async getAnnualVacation() {
      api
        .call("getAnnualVacation")
        .then(({ data }) => {
          this.$q.notify("Файл загужен");
        })
        .catch(data => {
          console.log(data);
          if (data.response) {
            const errors = data.response.data.errors;

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key]);
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0];
              }
            });
          }
        });
    },
    async upload(name, ref) {
      this[`${name}File`] = await this.fileDataURL(this.$refs[ref].files[0]);
    },
    getAdministrativeVacalation(btn) {
      const fd = new FormData();
      api
        .call("getAdministrativeVacalation", fd)
        .then(({ data }) => {
          this.$q.notify("Сообщение отправлено");
          this.$router.push("/home/admin");
        })
        .catch(data => {
          console.log(data);
          if (data.response) {
            const errors = data.response.data.errors;

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key]);
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0];
              }
            });
          }
        })
        .finally(() => {
          btn.offLoad();
        });
    },
    sendAministrativeVacalation(btn) {
      const fd = new FormData();
      api
        .call("sendAministrativeVacalation", fd)
        .then(({ data }) => {
          this.$q.notify("Сообщение отправлено");
          this.$router.push("/home/admin");
        })
        .catch(data => {
          console.log(data);
          if (data.response) {
            const errors = data.response.data.errors;

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key]);
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0];
              }
            });
          }
        })
        .finally(() => {
          btn.offLoad();
        });
    },
    getPeiodChange(btn) {
      const fd = new FormData();
      api
        .call("getPeiodChange", fd)
        .then(({ data }) => {
          this.$q.notify("Сообщение отправлено");
          this.$router.push("/home/admin");
        })
        .catch(data => {
          console.log(data);
          if (data.response) {
            const errors = data.response.data.errors;

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key]);
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0];
              }
            });
          }
        })
        .finally(() => {
          btn.offLoad();
        });
    },
    sendPeriodChange(btn) {
      const fd = new FormData();
      api
        .call("sendPeriodChange", fd)
        .then(({ data }) => {
          this.$q.notify("Сообщение отправлено");
          this.$router.push("/home/admin");
        })
        .catch(data => {
          console.log(data);
          if (data.response) {
            const errors = data.response.data.errors;

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key]);
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0];
              }
            });
          }
        })
        .finally(() => {
          btn.offLoad();
        });
    }
  },
  mounted() {
    if (this.project) this.showTests();
  },
  watch: {
    project() {
      this.showTests();
    }
  }
};
</script>
<style scoped lang="scss">
.border-radius-10 {
  border-radius: 10px;
}
.footer-header {
  height: 100px;
}
.max-width {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
