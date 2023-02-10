<template>
  <q-page class="row justify-center items-center link">
    <BaseForm style="background: none" size="s">
      <template v-slot:header>
        <div class="row q-mb-lg">
          <div class="col-4">
            <router-link to="" @click="this.$router.back()">
              <q-icon class="micon blue" size="sm" name="arrow_back"/>
            </router-link>
          </div>
          <div class="col-8">
            <h5 class="title">Регистрация</h5>
          </div>

        </div>
        <div class="row justify-center q-mb-lg">
          <p class="text-grey">Внимательно заполняете форму</p>
        </div>
        <div class="row justify-between">
          <q-tabs
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            dense
            inline-label
            v-model="type"
          >
            <q-tab no-caps name="1" label="Юридическое лицо"/>
            <q-tab no-caps name="2" label="ИП"/>
            <q-tab no-caps name="3" label="Физическое лицо"/>
          </q-tabs>
        </div>

      </template>
      <template v-slot:body>
        <RegistrationCompany :type="type" v-if="type === '1'"/>
        <RegistrationIP :type="type" v-if="type === '2'"/>
      </template>
    </BaseForm>
  </q-page>
</template>

<script>
import {defineComponent, ref} from "vue";
import BaseForm from "components/ui/Form";
import RegistrationCompany from "components/login/RegistrationCompany";
import RegistrationIP from "components/login/RegistrationIP";

export default defineComponent({
  name: "RegistrationUser",
  components: {RegistrationIP, RegistrationCompany, BaseForm},
  setup() {
    let type = ref("1");
    return {
      type,
    };
  },
});
</script>
