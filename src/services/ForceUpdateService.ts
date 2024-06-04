import * as LiveUpdates from '@capacitor/live-updates';
import { App } from '@capacitor/app';
export async function initializeLiveUpdates() {
  // Register event to fire each time user resumes the app
  App.addListener('resume', async () => {
    if (localStorage.shouldReloadApp === 'true') {
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