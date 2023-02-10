<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="background :none " class="modalbackgroud">
        <div class="modal">
          <div class="modal__header">
            <h6 class="text-h6">Ваша почта успешна подтверждена</h6>
            <p class="text-grey">Добро пожаловать сервис метры</p>
          </div>
          <div class="modal__body">
             <q-btn :href="process.env.APP_URL_SUCCESS"  class="btn btn__add">Войти</q-btn>
          </div>
          <div name="footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexSuccess"
};
</script>

