<template lang="pug">
  q-page
    .q-pb-lg.text-h4.text-weight-bolder
      | Главный экран
    .row.justify-center
      .col-6.q-pr-md
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/documents/employment"
          )
            q-card-section.col
              div Проверить фото документов на трудоустройство
              .row.font-size-15
                .q-pr-xs.text-grey Текущее кол-во сотрудников на проверку:
                .text-red-2 {{employeesLength}}
            .col-auto.items-center
              q-icon(name="mdi-chevron-right" size="24px")
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/documents/vacation"
          )
            q-card-section.col
              div Проверить фото заявлений на отпуск
              .row.font-size-15
                .q-pr-xs.text-grey Текущее кол-во сотрудников на проверку:
                .text-red-2 {{employeesVactionLength}}
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/send-message"
          )
            q-card-section.col
              div Сообщение мерчендайзерам
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
      .col-6.q-pl-md
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/upload"
          )
            q-card-section.col
              div Шаблоны заявлений на отпуск
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
        q-card.q-mb-md.shadow-7(
          style="font-size: 20px"
        )
          router-link.cursor-pointer.row.q-py-lg.q-px-lg.height-section.items-center(
            tag="span"
            to="/home/admin/tutorial"
          )
            q-card-section.col
              div Обучающие материалы для мерчендайзеров. Тесты
            .col-auto.items-center.row
              q-icon(name="mdi-chevron-right" size="24px")
</template>
<script>
import OriginalButton from "components/OriginalButton.vue";
import Api from "modules/api";
const api = new Api("Admin");
export default {
  components: { OriginalButton },
  data: () => ({
    project: null,
    employeesLength: 0,
    employeesVactionLength: 0,
    projects: [
      {
        label: "Все",
        value: "Все"
      },
      {
        label: "Project 1",
        value: "proj-1"
      },
      {
        label: "Project 2",
        value: "proj-2"
      },
      {
        label: "Project 3",
        value: "proj-3"
      },
      {
        label: "Project 4",
        value: "proj-4"
      },
      {
        label: "Project 5",
        value: "proj-5"
      }
    ],
    listOfProjectsVisibility: false
  }),
  methods: {
    showListOfProjects() {
      this.listOfProjectsVisibility = !this.listOfProjectsVisibility;
    }
  },

  mounted() {
    api
      .call("showNotVerifiedRegistrations")
      .then(({ data }) => {
        this.employeesLength = data.data.length;
      })
      .catch(data => {
        console.log(data);
      })
      .finally(() => {
        console.log("final");
      });

    api
      .call("showVacationRequests")
      .then(({ data }) => {
        this.employeesVactionLength = data.data.length;
      })
      .catch(data => {
        console.log(data);
      })
      .finally(() => {
        // console.log(this.employees)
      });
  }
};
</script>
<style lang="scss" scoped>
.height-section {
  height: 150px;
}
</style>
