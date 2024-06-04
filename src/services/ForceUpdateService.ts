import * as LiveUpdates from "@capacitor/live-updates";
import { App } from "@capacitor/app";
import AlertModal from "@/views/AlertModal.vue";
import { modalController } from "@ionic/vue";

let modal: HTMLIonModalElement | null = null;

export async function initializeLiveUpdates() {
  // Register event to fire each time user resumes the app
  App.addListener("resume", async () => {
    if (localStorage.shouldReloadApp === "true") {
      modal = await modalController.create({
        component: AlertModal,
        backdropDismiss: false,
        componentProps: {
          header: "Update Required",
          message: "Click Update to update newest version",
          onConfirm: async () => {
            await LiveUpdates.reload();
            modal?.dismiss();
            modal = null;
          },
        },
      });
      modal.present();
    } else {
      const result = await LiveUpdates.sync();
      localStorage.shouldReloadApp = result.activeApplicationPathChanged;
    }
  });

  const result = await LiveUpdates.sync();
  localStorage.shouldReloadApp = result.activeApplicationPathChanged;
}
