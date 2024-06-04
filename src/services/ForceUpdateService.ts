import * as LiveUpdates from '@capacitor/live-updates';
import { App } from '@capacitor/app';
import AlertModal from '@/views/AlertModal.vue';
import { modalController } from '@ionic/vue';

export async function initializeLiveUpdates() {
  // Register event to fire each time user resumes the app
  App.addListener('resume', async () => {
    if (localStorage.shouldReloadApp === 'true') {
      const modal = await modalController.create({
        component: AlertModal,
        backdropDismiss: false,
        componentProps: {
          header: 'Update Required',
          message: 'Click Update to update newest version',
        }
      });
      modal.present();
      await LiveUpdates.reload();
    } else {
      const result = await LiveUpdates.sync();
      localStorage.shouldReloadApp = result.activeApplicationPathChanged;
    }
  });

  // First sync on app load
  const result = await LiveUpdates.sync();
  localStorage.shouldReloadApp = result.activeApplicationPathChanged;
}