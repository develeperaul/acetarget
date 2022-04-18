export const routes = [
  {
    path: "/",
    component: () => import("layouts/WebLayout.vue"),
    children: [
      { path: "", component: () => import("pages/web/Admin/Home.vue") },

      // Авторизация и регистрация
      {
        name: "auth",
        path: "auth",
        component: () => import("pages/web/Auth/Auth.vue")
      },

      {
        path: "home/admin",
        name: "home-admin",
        component: () => import("pages/web/Admin/Home.vue")
      },
      {
        path: "home/admin/edit-paysheet",
        component: () => import("pages/web/Admin/EditPaysheet.vue")
      },
      {
        path: "home/admin/upload",
        component: () => import("pages/web/Admin/Upload.vue")
      },
      {
        path: "home/admin/send-message",
        components: {
          default: () =>
            import("src/pages/web/Admin/SendMessage/SendMessage.vue")
          // leading: () => import('components/HeaderSearch.vue')
        }
      },
      {
        path: "home/admin/tutorial",
        components: {
          default: () => import("src/pages/web/Admin/Tutorial/Tutorial.vue")
          // leading: () => import('components/HeaderSearch.vue'),
          // leadingMaterials: () => import('src/components/HeaderMaterials.vue'),
          // leadingStatements: () => import('components/HeaderStatements.vue')
        }
      },
      {
        path: "home/admin/documents/vacation",
        component: () =>
          import("pages/mobile/Admin/Vacation/VacationDocuments.vue")
      },
      {
        path: "home/admin/documents/vacation/:id",
        name: "vacation",
        component: () =>
          import("pages/mobile/Admin/Vacation/EmployeeDocumentsForVacation.vue")
      },
      {
        path: "home/admin/documents/employment",
        component: () =>
          import("pages/web/Admin/Employment/EmploymentDocuments.vue")
      },
      {
        path: "home/admin/documents/employment/:uuid",
        name: "employment",
        component: () =>
          import(
            "pages/web/Admin/Employment/EmployeeDocumentsForEmployment.vue"
          )
      },

      {
        path: "home/admin/edit",
        component: () => import("pages/web/MerSupProfileEdit.vue")
      }
    ]
  }
];
