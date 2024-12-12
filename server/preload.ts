import { TElectronAPI } from "../shared/interfaces/electronAPI";
import { contextBridge, ipcRenderer } from "electron";

// We are using the context bridge to securely expose NodeAPIs.
// Please note that many Node APIs grant access to local system resources.
// Be very cautious about which globals and APIs you expose to untrusted remote content.

let electronAPI: TElectronAPI = {
  getStaticData: async () => {
    return await ipcRenderer.invoke("getStaticResources");
  },
  getUsageData: async () => {
    return await ipcRenderer.invoke("getUsageData");
  },
  sayHello: () => ipcRenderer.send("message", "hi from next"),
  receiveHello: (handler) => ipcRenderer.on("message", handler),
  stopReceivingHello: (handler) =>
    ipcRenderer.removeListener("message", handler),
};
contextBridge.exposeInMainWorld("electron", electronAPI);
