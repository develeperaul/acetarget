<template lang="pug">
  q-card-section
    q-item.no-padding
      q-item-section
        q-item-label.q-py-md.row.justify-between.no-wrap.items-center
          .row.no-wrap.text-no-wrap
            input(
              ref="planogram"
              type="file"
              accept="image/*,.doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              @change="uploadPlanogram($event)"
              hidden
            )
            //- createPlanogram
            //- OriginalButton.q-px-lg.q-mr-lg(
            //-   :showLoad="false"
              
            //- ) Выгрузить текущий
            OriginalButton.q-px-lg(
              :showLoad="false"
              @click="checkPlanogram"
            ) Загрузить новый
</template>
<script>
import OriginalButton from "components/OriginalButton.vue";
import InactiveButton from "components/InactiveButton.vue";
import _ from "lodash";

import Api from "modules/api";
// import { forEach } from 'app/src-cordova/platforms/android/platform_www/cordova_plugins'
const api = new Api("Admin");
export default {
  name: "admin-tutorial-3",
  components: { OriginalButton, InactiveButton },
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  methods: {
    async checkPlanogram() {
      if (this.project && this.project.value !== "all") {
        this.$refs.planogram.click();
      } else this.$q.notify("Выберите проект");
    },
    uploadPlanogram(e) {
      console.log(e);
      const fd = new FormData();
      fd.append("file", e.target.files[0]);
      for (var pair of fd.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      console.log(fd);
      api
        .call("createPlanogram", {
          project: this.project.value,
          data: fd
        })
        .then(() => {
          this.$q.notify("Файл загружен");
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
          //- btn.offLoad();
        });
    }
  }
};
// {"open":false,"title":"","index":1,"questions":[{"title":"Quest 1","answers":["Ans 1","Ans 2"]},{"title":"Quest 2","answers":["Ans 3","Ans 4"]}],"answers":[]}
</script>
<style scoped lang="scss">
.popup__test-content {
  height: 405px;
  overflow-y: scroll;
}
</style>
