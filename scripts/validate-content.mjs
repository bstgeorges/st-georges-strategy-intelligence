import { loadSnapshots, validateMachineContent, validateSnapshots } from "./content-validation.mjs";

const snapshots = await loadSnapshots();
const pages = validateSnapshots(snapshots);
const machine = await validateMachineContent();
console.log(JSON.stringify({ ok: true, ...pages, ...machine }, null, 2));

