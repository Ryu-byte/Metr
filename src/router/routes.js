const routes = [
    {
      meta: {requiresAuth: true, keepalive: true},
      path: "/",
      component: () => import("layouts/MainLayout.vue"),
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("pages/Dashboard/index.vue"),
          children: [
            {
              path: "about",
              component: () => import("pages/Dashboard/Edit/AboutDashboard.vue"),
              meta: {keepalive: true},
            },
            {
              path: "credential",
              component: () =>
                import("pages/Dashboard/Edit/CredentialsDashboard.vue"),
              meta: {keepalive: true},
            },
            {
              path: "bank",
              component: () => import("pages/Dashboard/Edit/BankDashboard.vue"),
              meta: {keepalive: true},
            },
            {
              path: "document",
              component: () => import("pages/Dashboard/DocumentDashboard.vue"),
              meta: {keepalive: true},
            },
            {
              path: "document/create",
              component: () =>
                import("pages/Dashboard/Create/CreateDocument.vue"),
              meta: {keepalive: true},
            },
            {
              path: "document/single=:id",
              meta: {keepalive: true},
              component: () => import("pages/Dashboard/Edit/EditDocument.vue"),
            },
            {
              path: "user",
              component: () => import("pages/Dashboard/UserDashboard.vue"),
              meta: {keepalive: true},
            },
            {
              path: "user/single=:id",
              meta: {keepalive: true},
              component: () =>
                import("pages/Dashboard/Edit/EditUserDashboard.vue"),
            },
            {
              path: "user/create",
              component: () =>
                import("pages/Dashboard/Create/CreateUserDashboard.vue"),
            },
            {
              path: "tariffs",
              component: () => import("pages/Dashboard/TariffDashboard.vue"),
              meta: {keepalive: true},
            },
          ],
        },

        {
          path: "/company",
          component: () => import("pages/Company/index.vue"),
          meta: {
            title: "Организации"
          },
          children: [
            {
              path: "create",
              component: () => import("pages/Company/Create/CreateCompany"),
              meta: {
                title: "Добавить организацию"
              },
            },
            {
              path: "single=:id",
              component: () =>
                import("pages/Company/Partner(ClientService)/CompanyLayout"),
              meta: {
                title: "Организация"
              },
              children: [
                {
                  path: "bank",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Bank/BankCompany"),
                  meta: {
                    title: "Банковские реквизиты"
                  },
                },
                {
                  path: "date",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Date/DateCompany"),
                  meta: {
                    title: "Учётные данные"
                  },
                },
                {
                  path: "staff",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Staff/index"),
                  meta: {
                    title: "Сотрудники"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Staff/Create/CreateStaff"),
                      meta: {
                        title: "Добавить сотрудника"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Staff/Edit/EditStaff"),
                      meta: {
                        title: "Редактирование сотрудника"
                      },
                    },
                  ]
                },
                {
                  path: "documents",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Document/DocumentCompany"),
                  meta: {
                    title: "Документы"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Document/Create/CreateDocumentCompany"),
                      meta: {
                        title: "Создание документа"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Document/Edit/EditDocumentCompany"),
                      meta: {
                        title: "Редактирование документа"
                      },
                    },
                  ]
                },
                {
                  path: `tariffs`,
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Tariffs/TariffsCompany"),
                  meta: {
                    title: "Тарифы"
                  },
                },]
            },
            {
              path: "client/single=:id",
              component: () =>
                import("pages/Company/Client(CounterAgent)/CompanyLayout"),
              meta: {
                title: "Организация"
              },
              children: [
                {
                  path: "bank",
                  component: () =>
                    import("pages/Company/Client(CounterAgent)/Bank/BankCompany"),
                  meta: {
                    title: "Банковские реквизиты"
                  },
                },
                {
                  path: "documents",
                  component: () =>
                    import("pages/Company/Client(CounterAgent)/Document/DocumentsCompany"),
                  meta: {
                    title: "Документы"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Company/Client(CounterAgent)/Document/Create/CreateDocumentCompany"),
                      meta: {
                        title: "Создание документа"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Company/Client(CounterAgent)/Document/Edit/EditDocumentCompany"),
                      meta: {
                        title: "Редактирование документа"
                      },
                    },
                  ]
                },
                ]
            },
          ]
        },
        {
          path: "objects",
          component: () => import("pages/Object/index"),
          meta: {
            title: "Объекты",
          },
          children: [
            {
              path: "create",
              component: () => import("pages/Object/Create/CreateDataObject.vue"),
              meta: {
                title: "Добавить объект"
              },
            },
            {
              path: "single=:id",
              component: () => import("pages/Object/ObjectLayout"),
              meta: {
                title: "Объект",
              },
              children: [
                {
                  path: "documents",
                  component: () => import("pages/Object/Documents/index.vue"),
                  meta: {
                    title: "Документы"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Object/Documents/Create/CreateDocumentsObject.vue"),
                      meta: {
                        title: "Создание документа"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Object/Documents/Edit/EditDocumentsObject.vue"),
                      meta: {
                        title: "Редактирование документа"
                      },
                    },
                  ]
                },
                {
                  path: "flats",
                  component: () => import("pages/Object/Flats/index.vue"),
                  meta: {
                    title: "Список помещений"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Object/Flats/Create/CreateFlatsObject.vue"),
                      meta: {
                        title: "Создание помещения"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Object/Flats/Edit/EditFlatsObject.vue"),
                      meta: {
                        title: "Редактирование помещения"
                      },
                    },
                  ]
                },

                // счетчики
                {
                  path: "ipu",
                  component: () => import("pages/Object/Ipu/index.vue"),
                  meta: {
                    title: "Список ИПУ"
                  },
                  children: [
                    {
                      path: "create",
                      component: () => import("pages/Object/Ipu/Create/CreateIpuObject"),
                      meta: {
                        title: "Создание ИПУ"
                      }
                    },
                    {
                      path: "single=:item",
                      component: () => import("pages/Object/Ipu/Edit/EditIpuObject.vue"),
                      meta: {
                        title: "Редактирование ИПУ"
                      },
                    },
                  ]
                },
                {
                  path: "opu",
                  component: () => import("pages/Object/Opu/index.vue"),
                  meta: {
                    title: "Список ОПУ"
                  },
                  children: [
                    {
                      path: "create",
                      component: () => import("pages/Object/Opu/Create/CreateOpuObject"),
                      meta: {
                        title: "Создание ОПУ"
                      }
                    },
                    {
                      path: "single=:item",
                      component: () => import("pages/Object/Opu/Edit/EditOpuObject.vue"),
                      meta: {
                        title: "Редактирование ОПУ"
                      }
                    },
                  ]
                },
                // лицевые счета
                {
                  path: "accounts",
                  component: () => import("pages/Object/Accounts/index.vue"),
                  meta: {
                    title: "Список лицевых счетов"
                  },
                },
                {
                  path: "services",
                  component: () => import("pages/Object/Services/index.vue"),
                  meta: {
                    title: "Список услуг"
                  },
                },
              ]
            },
          ]
        },
        {
          path: "services",
          component: () => import("pages/Services/index"),
          meta: {
            title: "Услуги",
          },
          children: [
            {
              path: "single=:id",
              component: () => import("pages/Services/Edit/EditService"),
              meta: {
                title: "Редактирование услуги",
              },
            },
            {
              path: "create",
              component: () => import("pages/Services/Create/CreateService"),
              meta: {
                title: "Добавить услугу",
              },
            },
          ],
        },
        {
          path: "receipt",
          component: () => import("pages/PaymentDocs/index"),
          meta: {
            title: "Шаблоны ПД",
          },
          children: [
            {
              path: "single=:id",
              component: () => import("pages/PaymentDocs/Edit/EditPaymentDoc"),
              meta: {
                title: "Сформировать Шаблон ПД",
              },
            },
            {
              path: "create",
              component: () => import("pages/PaymentDocs/Create/CreatePaymentDoc"),
              meta: {
                title: "Сформировать Шаблон ПД",
              },
            },
          ],
        },
        {
          path: "account",
          component: () => import("pages/Accounts/index"),
          meta: {
            title: "Лицевые счета",
          },
          children: [
            {
              path: "single=:id",
              component: () => import("pages/Accounts/View/ViewAccount"),
              meta: {
                title: "Сведения о лицевом счёте",
              },
            },
            {
              path: "single=:id/edit",
              component: () => import("pages/Accounts/Edit/EditAccount"),
              meta: {
                title: "Редактирование лицевого счета",
              },
            },
            {
              path: "create",
              component: () => import("pages/Accounts/Create/CreateAccount"),
              meta: {
                title: "Добавить лицевой счет",
              },
            },
          ],
        },
        {
          path: "charge",
          component: () => import("pages/Payment/index"),
          meta: {
            title: "Начисления и оплата"
          },
          children: [
            {
              path: "accounts",
              component: () => import("pages/Payment/Accounts/ListAccounts"),
              meta: {
                title: "Лицевые счета"
              },
            },
            {
              path: "clients",
              component: () => import("pages/Payment/Clients/ListClients"),
              meta: {
                title: "Контрагенты"
              },
            },
            {
              path: "fine",
              component: () => import("pages/Payment/Fine/ListFine"),
              meta: {
                title: "Пени"
              },
              children: [
                {
                  path: "create",
                  component: () => import("pages/Payment/Fine/Create/CreateFine"),
                  meta: {
                    title: "Добавить пени"
                  },
                },
                {
                  path: "edit",
                  component: () => import("pages/Payment/Fine/Edit/EditFine"),
                  meta: {
                    title: "Пеня"
                  },
                },
              ]
            },
            {
              path: "recalculations",
              component: () => import("pages/Payment/Recalculations/ListRecalculation"),
              meta: {
                title: "Перерасчёты"
              },
              children: [
                {
                  path: "create",
                  component: () => import("pages/Payment/Recalculations/Create/CreateRecalculation"),
                  meta: {
                    title: "Добавить перерасчёт"
                  },
                },
                {
                  path: "edit",
                  component: () => import("pages/Payment/Recalculations/Edit/EditRecalculation"),
                  meta: {
                    title: "Перерасчёт"
                  },
                },
              ]
            },
            {
              path: "formula",
              component: () => import("pages/Payment/Formula/ListFormula"),
              meta: {
                title: "Формула расчёта"
              },
            },
          ]
        },
      ],
    },
    {
      path: "/auth",
      meta: {keepalive: true, requiresAuth: false},
      component:
        () => import("layouts/LoginLayout.vue"),
      children: [
        {
          path: "login",
          name: "Login",
          component: () => import("pages/login/AuthUser.vue"),
        },
        {
          path: "register",
          component: () => import("pages/login/RegistrationUser.vue"),
        },
        {
          path: "reset",
          component: () => import("pages/login/ResetUser.vue"),
        },
      ],
    },
    {
      path: "/police",
      name:
        "Police",
      component:
        () => import("pages/police/index.vue"),
    }
    ,
    {
      path: "/success",
      name:
        "Success",
      component:
        () => import("pages/Success/index.vue"),
    }
    ,
// Always leave this as last one,
// but you can also remove it
    {
      path: "/:catchAll(.*)*",
      component:
        () => import("pages/ErrorNotFound.vue"),
    }
    ,
  ]
;

export default routes;
