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
            title: "??????????????????????"
          },
          children: [
            {
              path: "create",
              component: () => import("pages/Company/Create/CreateCompany"),
              meta: {
                title: "???????????????? ??????????????????????"
              },
            },
            {
              path: "single=:id",
              component: () =>
                import("pages/Company/Partner(ClientService)/CompanyLayout"),
              meta: {
                title: "??????????????????????"
              },
              children: [
                {
                  path: "bank",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Bank/BankCompany"),
                  meta: {
                    title: "???????????????????? ??????????????????"
                  },
                },
                {
                  path: "date",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Date/DateCompany"),
                  meta: {
                    title: "?????????????? ????????????"
                  },
                },
                {
                  path: "staff",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Staff/index"),
                  meta: {
                    title: "????????????????????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Staff/Create/CreateStaff"),
                      meta: {
                        title: "???????????????? ????????????????????"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Staff/Edit/EditStaff"),
                      meta: {
                        title: "???????????????????????????? ????????????????????"
                      },
                    },
                  ]
                },
                {
                  path: "documents",
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Document/DocumentCompany"),
                  meta: {
                    title: "??????????????????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Document/Create/CreateDocumentCompany"),
                      meta: {
                        title: "???????????????? ??????????????????"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Company/Partner(ClientService)/Document/Edit/EditDocumentCompany"),
                      meta: {
                        title: "???????????????????????????? ??????????????????"
                      },
                    },
                  ]
                },
                {
                  path: `tariffs`,
                  component: () =>
                    import("pages/Company/Partner(ClientService)/Tariffs/TariffsCompany"),
                  meta: {
                    title: "????????????"
                  },
                },]
            },
            {
              path: "client/single=:id",
              component: () =>
                import("pages/Company/Client(CounterAgent)/CompanyLayout"),
              meta: {
                title: "??????????????????????"
              },
              children: [
                {
                  path: "bank",
                  component: () =>
                    import("pages/Company/Client(CounterAgent)/Bank/BankCompany"),
                  meta: {
                    title: "???????????????????? ??????????????????"
                  },
                },
                {
                  path: "documents",
                  component: () =>
                    import("pages/Company/Client(CounterAgent)/Document/DocumentsCompany"),
                  meta: {
                    title: "??????????????????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Company/Client(CounterAgent)/Document/Create/CreateDocumentCompany"),
                      meta: {
                        title: "???????????????? ??????????????????"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Company/Client(CounterAgent)/Document/Edit/EditDocumentCompany"),
                      meta: {
                        title: "???????????????????????????? ??????????????????"
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
            title: "??????????????",
          },
          children: [
            {
              path: "create",
              component: () => import("pages/Object/Create/CreateDataObject.vue"),
              meta: {
                title: "???????????????? ????????????"
              },
            },
            {
              path: "single=:id",
              component: () => import("pages/Object/ObjectLayout"),
              meta: {
                title: "????????????",
              },
              children: [
                {
                  path: "documents",
                  component: () => import("pages/Object/Documents/index.vue"),
                  meta: {
                    title: "??????????????????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Object/Documents/Create/CreateDocumentsObject.vue"),
                      meta: {
                        title: "???????????????? ??????????????????"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Object/Documents/Edit/EditDocumentsObject.vue"),
                      meta: {
                        title: "???????????????????????????? ??????????????????"
                      },
                    },
                  ]
                },
                {
                  path: "flats",
                  component: () => import("pages/Object/Flats/index.vue"),
                  meta: {
                    title: "???????????? ??????????????????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () =>
                        import("pages/Object/Flats/Create/CreateFlatsObject.vue"),
                      meta: {
                        title: "???????????????? ??????????????????"
                      },
                    },
                    {
                      path: "single=:item",
                      component: () =>
                        import("pages/Object/Flats/Edit/EditFlatsObject.vue"),
                      meta: {
                        title: "???????????????????????????? ??????????????????"
                      },
                    },
                  ]
                },

                // ????????????????
                {
                  path: "ipu",
                  component: () => import("pages/Object/Ipu/index.vue"),
                  meta: {
                    title: "???????????? ??????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () => import("pages/Object/Ipu/Create/CreateIpuObject"),
                      meta: {
                        title: "???????????????? ??????"
                      }
                    },
                    {
                      path: "single=:item",
                      component: () => import("pages/Object/Ipu/Edit/EditIpuObject.vue"),
                      meta: {
                        title: "???????????????????????????? ??????"
                      },
                    },
                  ]
                },
                {
                  path: "opu",
                  component: () => import("pages/Object/Opu/index.vue"),
                  meta: {
                    title: "???????????? ??????"
                  },
                  children: [
                    {
                      path: "create",
                      component: () => import("pages/Object/Opu/Create/CreateOpuObject"),
                      meta: {
                        title: "???????????????? ??????"
                      }
                    },
                    {
                      path: "single=:item",
                      component: () => import("pages/Object/Opu/Edit/EditOpuObject.vue"),
                      meta: {
                        title: "???????????????????????????? ??????"
                      }
                    },
                  ]
                },
                // ?????????????? ??????????
                {
                  path: "accounts",
                  component: () => import("pages/Object/Accounts/index.vue"),
                  meta: {
                    title: "???????????? ?????????????? ????????????"
                  },
                },
                {
                  path: "services",
                  component: () => import("pages/Object/Services/index.vue"),
                  meta: {
                    title: "???????????? ??????????"
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
            title: "????????????",
          },
          children: [
            {
              path: "single=:id",
              component: () => import("pages/Services/Edit/EditService"),
              meta: {
                title: "???????????????????????????? ????????????",
              },
            },
            {
              path: "create",
              component: () => import("pages/Services/Create/CreateService"),
              meta: {
                title: "???????????????? ????????????",
              },
            },
          ],
        },
        {
          path: "receipt",
          component: () => import("pages/PaymentDocs/index"),
          meta: {
            title: "?????????????? ????",
          },
          children: [
            {
              path: "single=:id",
              component: () => import("pages/PaymentDocs/Edit/EditPaymentDoc"),
              meta: {
                title: "???????????????????????? ???????????? ????",
              },
            },
            {
              path: "create",
              component: () => import("pages/PaymentDocs/Create/CreatePaymentDoc"),
              meta: {
                title: "???????????????????????? ???????????? ????",
              },
            },
          ],
        },
        {
          path: "account",
          component: () => import("pages/Accounts/index"),
          meta: {
            title: "?????????????? ??????????",
          },
          children: [
            {
              path: "single=:id",
              component: () => import("pages/Accounts/View/ViewAccount"),
              meta: {
                title: "???????????????? ?? ?????????????? ??????????",
              },
            },
            {
              path: "single=:id/edit",
              component: () => import("pages/Accounts/Edit/EditAccount"),
              meta: {
                title: "???????????????????????????? ???????????????? ??????????",
              },
            },
            {
              path: "create",
              component: () => import("pages/Accounts/Create/CreateAccount"),
              meta: {
                title: "???????????????? ?????????????? ????????",
              },
            },
          ],
        },
        {
          path: "charge",
          component: () => import("pages/Payment/index"),
          meta: {
            title: "???????????????????? ?? ????????????"
          },
          children: [
            {
              path: "accounts",
              component: () => import("pages/Payment/Accounts/ListAccounts"),
              meta: {
                title: "?????????????? ??????????"
              },
            },
            {
              path: "clients",
              component: () => import("pages/Payment/Clients/ListClients"),
              meta: {
                title: "??????????????????????"
              },
            },
            {
              path: "fine",
              component: () => import("pages/Payment/Fine/ListFine"),
              meta: {
                title: "????????"
              },
              children: [
                {
                  path: "create",
                  component: () => import("pages/Payment/Fine/Create/CreateFine"),
                  meta: {
                    title: "???????????????? ????????"
                  },
                },
                {
                  path: "edit",
                  component: () => import("pages/Payment/Fine/Edit/EditFine"),
                  meta: {
                    title: "????????"
                  },
                },
              ]
            },
            {
              path: "recalculations",
              component: () => import("pages/Payment/Recalculations/ListRecalculation"),
              meta: {
                title: "??????????????????????"
              },
              children: [
                {
                  path: "create",
                  component: () => import("pages/Payment/Recalculations/Create/CreateRecalculation"),
                  meta: {
                    title: "???????????????? ????????????????????"
                  },
                },
                {
                  path: "edit",
                  component: () => import("pages/Payment/Recalculations/Edit/EditRecalculation"),
                  meta: {
                    title: "????????????????????"
                  },
                },
              ]
            },
            {
              path: "formula",
              component: () => import("pages/Payment/Formula/ListFormula"),
              meta: {
                title: "?????????????? ??????????????"
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
