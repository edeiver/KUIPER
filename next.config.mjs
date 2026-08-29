import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: resolve(projectRoot),
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

export default withNextIntl(nextConfig);
