const fs = require("fs");
const path = require("path");

function createBackup() {
  const source = path.join(__dirname, "clinic.db");
  const backupDir = path.join(__dirname, "Backups");

  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

  if (fs.existsSync(source)) {
    const backupFile = path.join(
      backupDir,
      `clinic-backup-${Date.now()}.db`
    );
    fs.copyFileSync(source, backupFile);
  }
}

module.exports = createBackup;