import { App } from 'vue';
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
export const setupVXETable = (app:App) => {
    app.use(VXETable);
}
