<template lang="pug">
div
  //- q-btn(
  //-   @click="test"
  //- ) test
  //- q-infinite-scroll(@load="onLoad" :offset="100")
  //- .row.justify-end
  //-   q-checkbox.checkbox-border.q-pr-lg(
  //-     v-model="selectAll"
  //-     label="Выбрать все"
  //-     left-label
  //-   )
  q-card.q-mb-sm(
    v-for="(employee, index) in employees",
    :key="index",
    flat,
    bordered
  )
    q-card-section.row.q-pa-sm.items-center(
      @click="employee.selected = !employee.selected",
      style="height: 100px"
    )
      .col-10.row
        .col.q-pl-lg
          .text-grey Проект
          .q-pt-xs {{ employee.project_name }}
        .col.q-pl-lg
          .text-grey Территория
          .q-pt-xs {{ employee.territory }}
        .col.q-pl-lg
          .text-grey Фамилия
          .q-pt-xs {{ employee.last_name }}
        .col.q-pl-lg
          .text-grey Имя
          .q-pt-xs {{ employee.first_name }}
        .col.q-pl-lg
          .text-grey Отчество
          .q-pt-xs {{ employee.patronymic }}
      .col-2.row
        .col.q-pl-lg.row.justify-end
          q-checkbox.q-pr-md(v-model="employee.selected")
  .bg-white.footer-header.row
    .col-9.q-pr-md
      //- input(
      //-   v-if="mode == 'spa'"
      //-   ref="uploadFile"
      //-   type="file"
      //-   accept=".doc,.docx,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      //-   @change="fileSelect"
      //-   hidden
      //- )
      q-input.relative(
        v-model="label",
        type="textarea",
        outlined,
        label="Текст сообщения",
        bg-color="grey-2",
        color="red",
        input-style="height: 110px; max-height: 110px; padding-right: 40px"
      )
        q-item.item-file
          q-item-section
            q-item-label
              input(
                ref="uploadFile",
                type="file",
                accept=".doc, .docx, application/msword, application/vnd.ms-excel, .xls, .xlsx, application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                @change="() => fileSelect('doc')",
                hidden
              )
              input(
                v-if="mode == 'spa'",
                ref="uploadPhoto",
                type="file",
                accept="image/*",
                @change="() => fileSelect('photo')",
                hidden
              )
              .q-pt-sm.row.q-col-gutter-sm.justify-between
                .col-6
                  div(@click="downloadDialog.open = true")
                    svg(width="22", height="22")
                      use(xlink:href="clip.svg#clip")
      div(v-if="docs.length != 0")
        .q-py-md.row.q-col-gutter-sm.justify-between
          .col-6(v-for="(doc, index) in docs", :key="index")
            q-btn.q-pl-md.q-pr-sm.shadow-5.full-width(no-caps, padding="none")
              .row.justify-between.full-width.items-center.no-wrap
                .q-pr-sm.font-size-13.text-grey-5.ellipsis {{ doc.name }}
                div(@click="onRemoveDoc(index)", style="width: 29px")
                  q-icon(name="mdi-window-close", color="red-2", size="15px")
      div(v-if="images.length != 0")
        .q-py-md.row.q-col-gutter-sm.justify-start
          .item-card(v-for="(image, index) in images", :key="index")
            .relative-position
              .click-photo(v-gallery, :data-large="image")
                q-img.img-blank(:src="image")
              q-btn.bg-grey-4.button-remove(
                size="xs",
                flat,
                round,
                color="grey-5",
                icon="mdi-window-close",
                @click="onRemoveImg(index)"
              )
      q-dialog(
        content-class="q-dialog-padding-fixed",
        v-model="downloadDialog.open"
      )
        q-card.full-width
          q-card-section
            q-item.q-px-xs
              q-item-section
                q-item-label
                  .text-h6.text-center.text-weight-bold.q-pt-md Вложение
                  .text-grey.q-my-md.text-center.text-body1 Выберите способ вложения
                  q-btn.q-my-sm.full-width(
                    @click="$refs.uploadFile.click()",
                    no-caps,
                    outline
                  ) Вложить документ
                  q-btn.q-my-sm.full-width(
                    @click="mode == 'spa' ? $refs.uploadPhoto.click() : photoSelect()",
                    no-caps,
                    outline
                  ) Вложить изображение
                  q-btn.q-my-sm.full-width(
                    @click="downloadDialog.open = false; youtubeDialog.open = true",
                    no-caps,
                    outline
                  ) Добавить ссылку на YouTube
                  OriginalButton.q-mt-sm.full-width(
                    color="red-2",
                    @click="downloadDialog.open = false"
                  ) Закрыть

    .col-3.q-pl-md
      OriginalButton.full-width.text-black.q-mb-md(
        @click="openSelectionDaysDialog"
      ) Настроить ежемесячную отправку
      OriginalButton.full-width(
        color="red-2",
        v-if="true",
        @click="sendMessage"
      ) Отправить сообщение
      InactiveButton(v-else) Отправить сообщение
      q-dialog(position="bottom", v-model="selectionDaysDialog.open")
        q-swipe-to-close(v-model="selectionDaysDialog.open")
          q-card.no-border-radius
            q-card-section.q-py-sm.q-px-none.bg-grey-3
              q-item
                q-item-section
                  q-item-label
                    | Выбор дня рассылки
                q-item-section(side)
                  q-btn.bg-grey-4(
                    size="sm",
                    flat,
                    round,
                    color="grey-5",
                    icon="mdi-window-close",
                    @click="selectionDaysDialog.open = false"
                  )
            q-card-section.q-px-none.q-pt-md
              q-item
                q-item-section
                  q-item-label
                    | Выберите числа, в эти дни каждый месяц сообщение будет отправляться сотрудникам автоматически
              q-item
                q-item-section
                  q-item-label.font-size-13.text-grey-5
                    | (Если месяц не содержит дат: 29,30,31, то сообщение отправится последним днем месяца)
              q-item
                q-item-section
                  q-item-label
                    .q-pt-xs.row.q-col-gutter-sm.justify-between
                      .col-2(
                        v-for="(day, index) in selectionDaysDialog.prepared_days",
                        :key="index"
                      )
                        q-btn.full-width.text-weight-regular(
                          :class="day.selected ? 'bg-grey-2' : 'shadow-2'",
                          @click="toSelectDay(index)"
                        ) {{ day.value }}
              q-item
                q-item-section
                  q-item-label
                    OriginalButton(
                      v-if="daysSelected()",
                      color="red-2",
                      @click="toAccept"
                    ) Принять
                    InactiveButton(v-else) Принять
    //- template(v-slot:loading)
    //-   .row.justify-center.q-my-md
    //-     q-spinner(size="3em" color="red-2")
</template>
<script>
import OriginalButton from 'components/OriginalButton.vue'
import InactiveButton from 'components/InactiveButton.vue'
import _ from 'lodash'
import Api from 'modules/api'
const api = new Api('Admin')
// eslint-disable-next-line no-unused-vars
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
// eslint-disable-next-line no-unused-vars
const { Camera } = Plugins

// eslint-disable-next-line no-unused-vars
const { Filesystem } = Plugins

// eslint-disable-next-line no-unused-vars
import getVideoId from 'get-video-id'
export default {
  name: 'admin-messages-1',
  components: { OriginalButton, InactiveButton },
  data: () => ({
    label: null,
    errors: {
      label: null
    },
    docs: [],
    images: [],
    downloadDialog: {
      open: false
    },
    selectionDaysDialog: {
      open: false,
      days: [],
      prepared_days: []
    },
    employees: [],
    user_ids: [],
    message: null,
    holdActive: false,
    selectAll: false,
    search: null
  }),
  beforeDestroy () {
    this.$root.$off('header-search')
    this.$root.$off('select-all')
  },
  mounted () {
    this.$root.$on('header-search', (val) => { this.search = val })
    this.$root.$on('select-all', (val) => { this.selectAll = val })
    api.call('showEmployees')
      .then(({ data }) => {
        data = data.data
        for (let i = 0; i < data.length; i++) {
          console.log(data[i])
          this.employees.push({
            id: i,
            last_name: data[i].passport.last_name,
            first_name: data[i].passport.first_name,
            patronymic: data[i].passport.patronymic,
            project_name: data[i].project_name,
            territory: data[i].project_name,
            selected: false
          })
        }
      })
      .catch((data) => {
        console.log(data)
        if (data.response) {
          const errors = data.response.data.errors

          _.each(errors, (messages, key) => {
            console.log(key, this.errors[key])
            if (this.errors[key] !== undefined) {
              this.errors[key] = messages[0]
            }
          })
        }
      })
      .finally(() => {
        console.log('final')
      })

    for (let i = 1; i <= 31; i++) {
      this.selectionDaysDialog.days.push({
        value: i,
        selected: false
      })
    }
    this.selectionDaysDialog.prepared_days = this.selectionDaysDialog.days.map(a => ({ ...a }))
  },
  computed: {
    mode () {
      return process.env.MODE
    }
  },
  watch: {
    selectAll () {
      if (this.selectAll) {
        this.employees.forEach(elem => {
          elem.selected = true
        })
      } else {
        this.employees.forEach(elem => {
          elem.selected = false
        })
      }

      // if (!this.holdActive) {
      //   this.holdActive = true
      // }
    }
  },
  // computed: {
  //   user_ids () {
  //     for (let i = 0; i < this.employees.length; i++) {
  //       if (this.employees[i].selected) {
  //         this.user_ids.push(this.employees[i].id)
  //       }
  //     }
  //     return this.user_ids
  //   }
  // },
  methods: {
    toSelectDay (index) {
      this.selectionDaysDialog.prepared_days[index].selected = !this.selectionDaysDialog.prepared_days[index].selected
    },
    daysSelected () {
      for (const day in this.selectionDaysDialog.prepared_days) {
        if (this.selectionDaysDialog.prepared_days[day].selected) {
          return true
        }
      }
    },
    toAccept () {
      this.selectionDaysDialog.days = this.selectionDaysDialog.prepared_days.map(a => ({ ...a }))
      this.selectionDaysDialog.open = false
    },
    openSelectionDaysDialog (btn) {
      this.selectionDaysDialog.prepared_days = this.selectionDaysDialog.days.map(a => ({ ...a }))

      this.selectionDaysDialog.open = true
      btn.offLoad()
    },

    sendMessage (btn) {
      // console.log(btn)
      _.each(this.errors, (val, key) => {
        this.errors[key] = null
      })

      const fd = new FormData()

      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].selected) {
          fd.append('user_ids[]', this.employees[i].id)
        }
      }

      fd.append('label', this.label)

      _.each(this.images, (val) => {
        if (val.startsWith('data:')) {
          fd.append('photos[]', this.$axios.dataURLtoBlob(val))
        } else {
          fd.append('photos[]', val)
        }
      })

      _.each(this.docs, (val) => {
        fd.append('docs[]', val)
      })

      _.each(this.videos, (val) => {
        fd.append('videos[]', val)
      })

      api.call('sendMessage', fd)
        .then(({ data }) => {
          console.log(fd)
        })
        .catch((data) => {
          console.log(data)
          if (data.response) {
            const errors = data.response.data.errors

            _.each(errors, (messages, key) => {
              console.log(key, this.errors[key])
              if (this.errors[key] !== undefined) {
                this.errors[key] = messages[0]
              }
            })
          }
        })
        .finally(() => {
          btn.offLoad()
        })
    },
    async fileSelect (type, files, file) {
      if (type === 'photo') {
        console.log(files, file)
        const image = await this.fileDataURL(this.$refs.uploadPhoto.files[0])

        this.images.push(image)
      } else if (type === 'doc') {
        console.log(this.$refs.uploadFile.files[0])
        const docName = this.$refs.uploadFile.files[0].name
        const docData = await this.fileDataURL(this.$refs.uploadFile.files[0])

        this.docs.push({
          name: docName,
          data: docData
        })
      }
    },
    // async fileSelect (files, file) {
    //   console.log(files, file)
    //   const image = await this.fileDataURL(this.$refs.uploadFile.files[0])

    //   this.images.push(image)
    // },
    async photoSelect () {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        quality: 90,
        resultType: CameraResultType.DataUrl
      })

      // console.log(image)
      this.images.push(image.dataUrl)
    },
    // async docSelect () {
    //   const doc = await Filesystem.readFile({
    //     directory: FilesystemDirectory.Documents,
    //     encoding: FilesystemEncoding.UTF8
    //   })

    //   // console.log(image)
    //   // this.images.push(image.dataUrl)
    //   // console.log(doc)
    //   this.docs.push(doc)
    // },
    test () {
      console.log(this.$parent.user_ids)
    },
    onLoad (index, done) {
      // setTimeout(() => {
      //   if (this.employees) {
      //     this.employees.push({
      //       fullName: 'Самсонов Гурий Андреевич',
      //       dateOfBirth: '20.12.1980',
      //       proj: 'Проект 4'
      //     },
      //     {
      //       fullName: 'Веселов Владимир Ефимович',
      //       dateOfBirth: '16.03.1995',
      //       proj: 'Проект 5'
      //     },
      //     {
      //       fullName: 'Герасимов Рудольф Лукьевич',
      //       dateOfBirth: '20.12.1997',
      //       proj: 'Проект 6'
      //     })
      //     done()
      //   }
      // }, 1000)
    },
    fileDataURL (file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(fr.result)
        fr.onerror = reject
        fr.readAsDataURL(file)
      })
    }
    // handleHold (evt, indexEmployer) {
    //   this.holdActive = true
    //   this.employees[indexEmployer].selected = true
    // },
  }

}
</script>
<style scoped>
.footer-header {
  height: 177px;
}
.checkbox-border {
  border: 1px !important;
  border-radius: 5px !important;
}
.item-file {
  position: absolute;
  bottom: 0;
  right: -12px;
}

.img-blank {
  height: 90px;
  width: 90px;
  border-radius: 5px;
}
.click-photo {
  width: 100%;
  height: 100%;
}
.button-remove {
  position: absolute;
  transform: translate(-25%, -50%);
  top: 0%;
  right: -25%;
  z-index: 1;
}
.item-card {
  width: 90px;
  height: 90px;
}
.item-card:not(:last-child) {
  margin-right: 13px;
}
</style>
