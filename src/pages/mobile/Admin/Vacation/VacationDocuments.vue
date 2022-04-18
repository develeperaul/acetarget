<template lang="pug">
  q-page.flex.column
    q-item
      q-item-section
        q-item-label
          .text-h4.text-weight-bolder.q-mb-md
            | Фото документов на отпуск
    q-select.wh.q-ml-lg.q-mr-sm(
              :options="employees"
              v-model="employe"
              outlined
              color="red"
              label="Выбрать сотрудника"
              behavior="menu"
              menu-anchor="bottom left"
              style="min-height: 60px;"
            )
    .cards.mt-md(v-if="employe")
      q-card.card.left-card
        q-inner-loading(
        :showing="loading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
        )
        q-card-section.flex.column.employe-left
          .employe-top
            .employe-name
              | {{employe.last_name}} {{ employe.first_name}} {{ employe.patronymic}}
            .employe-data.flex
              .employe-date.q-mr-md
                | Дата рождения:
                span  {{employe.birthday_at}}
              .employe-project
                | Проект:
                span  {{employe.project_name}}
          span.employe-label Комментарий
          q-input(
            v-model="message"
            type="textarea"
            outlined
            label="Комментарий"
            bg-color="grey-2"
            color="red"
            class="employe-left-input"
          )
      .card.right-card
        q-carousel.bg-white.rounded-borders(
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="black"
            navigation-icon="mdi-circle-medium"
            navigation-active-icon="mdi-circle"
            navigation
            padding
            height="107.5%"
            :fullscreen="fullscreen"
          )
            q-carousel-slide.column.no-wrap.flex-center.q-px-none.q-pt-none(
              :name="key"
              v-for="(image, key) in images"
              :key="key"
            )
              q-img.rounded-borders(
                :src="image"
                @click="modal.open=true; modal.photo = photo"
              )
            template(v-slot:control)
              q-carousel-control(
                position="bottom-right"
                :offset="[18, 18]"
              )
                q-btn(
                  push
                  round
                  dense
                  color="white"
                  text-color="black"
                  :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
                  @click="fullscreen = !fullscreen"
                )
    //- q-item
    //-   q-item-section
    //-     q-item-label
    //-       .text-grey.q-pb-xs.font-size-13
    //-         | Сотрудников: {{ employees.length }}
    //-       //- q-infinite-scroll(@load="onLoad" :offset="100")
    //-       q-card.q-mb-sm(
    //-         v-for="(employee, index) in employees"
    //-         :key="index"
    //-         flat
    //-         bordered
    //-         style="font-size: 17px"
    //-       )
    //-         q-card-section.row
    //-           router-link.col(
    //-             tag="span"
    //-             :to="{ name: 'vacation', params: { uuid: employee.uuid } }"
    //-           )
    //-             .q-pt-xs.text-weight-550.q-pb-md
    //-               | {{ employee.last_name }} {{ employee.first_name }} {{ employee.patronymic }}
    //-             .q-py-sm.row
    //-               .q-pr-xs Дата рождения:
    //-               .text-grey {{ employee.birthday_at }}
    //-             .q-py-sm.row
    //-               .q-pr-xs Проект:
    //-               .text-grey {{ employee.project_name }}
    //-           .col-auto.items-center.row
    //-             q-icon(name="mdi-chevron-right" size="20px")
    //-       template(v-slot:loading)
    //-         .row.justify-center.q-my-md
    //-           q-spinner(size="3em" color="red-2")
    q-footer.bg-white.footer-header.row.items-center(
      bordered
    )
      q-toolbar.max-width.q-px-xl
        .col-6.q-pr-md
          .row.justify-between
            q-item.text-black
              q-item-section
                q-item-label
                  q-option-group.row(
                    :options="conclusions"
                    v-model="conclusion"
                  )
        .col-6.q-pl-md
          .row.items-center.justify-end.text-no-wrap
            OriginalButton.q-mr-lg.text-black.q-px-lg(
              @click="$router.go(-1)"
            ) Назад
            OriginalButton.q-px-lg(
              color="red-2"
              v-if="conclusion!==null"
              @click="approve"
            ) Отправить
            InactiveButton.q-px-lg(
              v-if="conclusion==null"
            ) Отправить
    q-dialog(
      content-class="q-dialog-padding-fixed"
      v-model="dialog.open"
      persistant
    )
      q-card.full-width
        q-card-section
          q-item.q-px-xs
            q-item-section
              q-item-label
                .text-h6.text-center.text-weight-bold.q-mt-md Выход
                .text-grey.q-my-md.text-center.text-body1 Вы действительно хотите выйти из учетной записи?
                OriginalButton.q-mt-sm.full-width(
                  @click="logOut()"
                ) Да, хочу выйти
                OriginalButton.q-mt-sm.full-width.text-red-2(
                  @click="dialog.open = false"
                ) Отмена
</template>
<script>
import OriginalButton from "components/OriginalButton.vue";
import InactiveButton from "components/InactiveButton.vue";
import HeaderSettings from "components/HeaderSettings";
import _ from "lodash";
import Api from "modules/api";
const api = new Api("Admin");

export default {
  components: { HeaderSettings, OriginalButton, InactiveButton },
  data() {
    return {
      dialog: {
        open: false
      },
      slide: 0,
      fullscreen: false,
      loading: false,
      employe: null,
      search: null,
      project: null,
      blank_id: null,
      message: null,
      images: [],
      projects: [
        {
          label: "Все",
          value: "all"
        }
      ],
      conclusion: null,
      conclusions: [
        {
          label: "Запросить повторную отправку",
          value: false
        },
        {
          label: "Согласовано",
          value: true
        }
      ],
      listOfProjectsVisibility: false,
      employees: []
    };
  },
  mounted() {
    this.showVacationRequests();

    api.call("projectList").then(({ data }) => {
      _.each(data, proj => {
        this.projects.push({
          label: proj.name,
          value: proj.id
        });
      });
    });
  },
  methods: {
    onLoad(index, done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    approve(btn) {
      _.each(this.errors, (val, key) => {
        this.errors[key] = null;
      });
      const fd = new FormData();
      fd.append("id", this.blank_id);
      fd.append("conclusion", this.conclusion);
      fd.append("message", this.message);

      api
        .call("approveVacationBlank", fd)
        .then(({ data }) => {
          this.$q.notify(data);
          this.$router.push("/home/admin/documents/vacation");
          this.employe = null;
          this.showVacationRequests();
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
    filter() {
      if (this.search && this.project && this.project?.value !== "all") {
        this.showByFioAndProject();
      } else if (
        this.search &&
        (!this.project || this.project?.value === "all")
      ) {
        this.filterByFio();
      } else if (
        this.project &&
        this.project?.value !== "all" &&
        !this.search
      ) {
        this.filterByProject();
      } else {
        this.showVacationRequests();
      }
    },
    filterByFio() {
      this.showByFio();
    },
    filterByProject() {
      if (this.project.value === "all") {
        this.showVacationRequests();
      } else {
        this.showByProject();
      }
    },
    // toBlanks (blankId) {
    //   api.call('readMessage', { id: notifyId })
    //   this.$router.push({ name: 'message', params: { id: notifyId } })
    // },
    showVacationRequests() {
      api
        .call("showVacationRequests")
        .then(({ data }) => {
          this.employees = [];
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              uuid: data.data[i].uuid,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              selected: false,
              value: data.data[i].uuid,
              label: `${data.data[i].passport.last_name} ${data.data[i].passport.first_name} ${data.data[i].passport.patronymic}`
            });
          }
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
          // console.log(this.employees)
        });
    },
    showByFio() {
      const fd = new FormData();
      fd.append("fio", this.search);

      if (this.search) {
        api
          .call("showVacationRequestsByFio", fd)
          .then(({ data }) => {
            this.employees = [];
            for (let i = 0; i < data.data.length; i++) {
              this.employees.push({
                id: data.data[i].id,
                uuid: data.data[i].uuid,
                last_name: data.data[i].passport.last_name,
                first_name: data.data[i].passport.first_name,
                patronymic: data.data[i].passport.patronymic,
                birthday_at: data.data[i].passport.birthday_at,
                project_id: data.data[i].project_id,
                project_name: data.data[i].project_name,
                selected: false
              });
            }
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
            console.log(this.employees);
          });
      } else {
        this.showVacationRequests();
      }
    },
    showByProject() {
      const fd = new FormData();
      fd.append("project_id", this.project.value);

      api
        .call("showVacationRequestsByProject", fd)
        .then(({ data }) => {
          this.employees = [];
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              uuid: data.data[i].uuid,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              selected: false
            });
          }
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
          console.log(this.employees);
        });
    },
    showByFioAndProject() {
      const fd = new FormData();
      fd.append("fio", this.search);
      fd.append("project_id", this.project.value);

      api
        .call("showVacationRequestsByFioAndProject", fd)
        .then(({ data }) => {
          this.employees = [];
          for (let i = 0; i < data.data.length; i++) {
            this.employees.push({
              id: data.data[i].id,
              uuid: data.data[i].uuid,
              last_name: data.data[i].passport.last_name,
              first_name: data.data[i].passport.first_name,
              patronymic: data.data[i].passport.patronymic,
              birthday_at: data.data[i].passport.birthday_at,
              project_id: data.data[i].project_id,
              project_name: data.data[i].project_name,
              selected: false
            });
          }
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
          console.log(this.employees);
        });
    },
    showListOfProjects() {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility;
    },
    logOut() {
      this.$q.localStorage.remove("token");
      this.$router.push("/auth");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  },
  watch: {
    employe(val) {
      if (val?.uuid) {
        this.loading = true;
        api
          .call("showVacationBlank", {
            params: {
              uuid: val.uuid
            }
          })
          .then(({ data }) => {
            this.blank_id = data.id;
            this.images = [...data.data.photos, ...data.data.scans];
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.footer-header {
  height: 100px;
}
.cards {
  display: flex;
  flex-grow: 1;
  margin-top: 40px;
  margin-bottom: 80px;
}
.card {
  width: 50%;
  border-radius: 16px;
  // border: 1px solid red;
  &:first-child {
    margin-right: 40px;
  }
}
.left-card {
  padding: 30px;
}
.employe-left {
  height: 100%;
}
.employe-name {
  font-size: 22px;
  line-height: 22px;
  font-weight: 600;
  margin-bottom: 40px;
}
.employe-label,
.employe-data {
  font-size: 14px;
  line-height: 14px;
}
.employe-data {
  margin-bottom: 50px;
}
.employe-date,
.employe-project {
  & > span {
    color: gray;
  }
}
.employe-label {
  color: gray;
  margin-bottom: 8px;
}
.employe-left-input {
  flex-grow: 1;
}
</style>
<style>
.q-textarea .q-field__control {
  min-height: 56px;
  height: 100% !important;
}
</style>
