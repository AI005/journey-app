<template>
  <ion-content class="alert-modal-content" :scroll-y="false">
    <ion-row class="alert-modal-body">
      <ion-row class="alert-modal-header">
        <h3>{{ props.header }}</h3>
      </ion-row>
      <ion-row class="alert-modal-message">
        <p>{{ props.message }}</p>
      </ion-row>
      <ion-row class="alert-modal-buttons">
        <ion-col class="block-accept-button">
          <ion-button expand="block" class="default-button accept-button" @click="handleAcceptButtonClick">
            Updated
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-row>
  </ion-content>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  modalController,
} from "@ionic/vue";

interface ModalProps {
  header: string;
  message: string;
  onConfirm: () => void;
}

const props = defineProps<ModalProps>();

const handleAcceptButtonClick = () => {
  props.onConfirm();
  modalController.dismiss();
};

</script>

<style scoped>
.alert-modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --ion-background-color: var(--color-primary1) !important;
  border-radius: 20px;
  max-width: 350px;
  max-height: 350px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-modal-body {
  flex-direction: column;
  align-items: center;
  margin: 50px;
}

.alert-modal-image-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
  .alert-modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

.alert-modal-header {
  color: var(--color-primary8);
}

.alert-modal-message {
  text-align: left;
  color: var(--color-neutral4);
  font-size: 12px;
}

.alert-modal-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.block-cancel-button {
  flex-basis: 45%;
}

.block-accept-button {
  flex-basis: 55%;
}

.cancel-button {
  --color: var(--color-primary8);
  font-size: 14px;
}

.accept-button {
  font-size: 14px;
}
</style>