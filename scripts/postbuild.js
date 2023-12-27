import { glob } from "glob";
import * as path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function mvTypesFiles(bundlDir) {
  const paths = await glob(`${bundlDir}/**`);
  paths.forEach((item) => {
    if (item.includes(".d.ts")) {
      const pathObj = path.parse(item);
      const typesDir = path.join(__dirname, `../${bundlDir}/types`);
      const shouldPath = path.join(typesDir, pathObj.base);
      // 如果，目录不存在 就创建目录
      if (!fs.existsSync(typesDir)) fs.mkdirSync(typesDir);
      if (!fs.existsSync(shouldPath)) {
        fs.writeFileSync(shouldPath, fs.readFileSync(item, "utf-8"), "utf-8");
      }
      fs.unlinkSync(item);
    }
  });
}

mvTypesFiles("dist");
