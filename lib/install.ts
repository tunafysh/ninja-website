import installData from "./install.json"

export type InstallPlatform = "windows" | "linux" | "macos" | "unknown";

export type InstallFormatLink = {
  label: string;
  href: string;
};

export type InstallPackageGroup = {
  label: string;
  formats: InstallFormatLink[];
};

export type InstallCommand = {
  label: string;
  command: string;
};

export type InstallTarget = {
  fileName: "install.ps1" | "install.sh";
  downloadName: string;
  contentType: string;
};

export type InstallRecommendation = {
  platform: InstallPlatform;
  label: string;
  summary: string;
  packages: InstallPackageGroup[];
  commands: InstallCommand[];
  formatLinks: Array<{
    label: string;
    href: string;
  }>;
};

export type InstallCatalogEntry = InstallRecommendation;

type InstallData = Record<
  Exclude<InstallPlatform, "unknown">,
  {
    label: string;
    summary: string;
    packages: InstallPackageGroup[];
    commands: InstallCommand[];
  }
>

const installConfig = installData as InstallData;

const installPlatforms: Exclude<InstallPlatform, "unknown">[] = ["windows", "linux", "macos"];

function createRecommendation(platform: Exclude<InstallPlatform, "unknown">): InstallCatalogEntry {
  const platformConfig = installConfig[platform]

  return {
    platform,
    label: platformConfig.label,
    summary: platformConfig.summary,
    packages: platformConfig.packages,
    commands: platformConfig.commands,
    formatLinks: platformConfig.packages.flatMap((group) => group.formats),
  }
}

export function getInstallCatalog(): InstallCatalogEntry[] {
  return installPlatforms.map((platform) => createRecommendation(platform));
}

export function getInstallPrimaryFormat(platform: InstallPlatform): InstallFormatLink | null {
  const selectedPlatform: Exclude<InstallPlatform, "unknown"> =
    platform === "windows" || platform === "linux" || platform === "macos"
      ? platform
      : "linux"

  return installConfig[selectedPlatform].packages[0]?.formats[0] ?? null
}

export function parseInstallPlatform(value?: string | null): InstallPlatform | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();

  if (normalized === "windows") {
    return "windows";
  }

  if (normalized === "macos" || normalized === "mac" || normalized === "darwin") {
    return "macos";
  }

  if (normalized === "linux" || normalized === "unix") {
    return "linux";
  }

  return null;
}

export function detectInstallPlatform(userAgent: string): InstallPlatform {
  if (/Windows|PowerShell/i.test(userAgent)) {
    return "windows";
  }

  if (/Macintosh|Mac OS X|Darwin/i.test(userAgent)) {
    return "macos";
  }

  if (/Linux|curl|wget/i.test(userAgent)) {
    return "linux";
  }

  return "unknown";
}

export function getInstallTarget(platform: InstallPlatform): InstallTarget {
  if (platform === "windows") {
    return {
      fileName: "install.ps1",
      downloadName: "ninja-install-windows.ps1",
      contentType: "text/plain",
    };
  }

  if (platform === "macos") {
    return {
      fileName: "install.sh",
      downloadName: "ninja-install-macos.sh",
      contentType: "text/x-shellscript",
    };
  }

  return {
    fileName: "install.sh",
    downloadName: "ninja-install-linux.sh",
    contentType: "text/x-shellscript",
  };
}

export function getInstallRecommendation(platform: InstallPlatform): InstallRecommendation {
  const selectedPlatform: Exclude<InstallPlatform, "unknown"> =
    platform === "windows" || platform === "linux" || platform === "macos"
      ? platform
      : "linux"

  const selectedRecommendation = createRecommendation(selectedPlatform)

  if (platform === "unknown") {
    return {
      platform,
      label: "Detected platform",
      summary:
        "Use the package that best fits your system, or pick the command-line option if you prefer a direct install.",
      packages: getInstallCatalog().flatMap((entry) => entry.packages),
      commands: [
        {
          label: "PowerShell",
          command: 'powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr https://ninja.sh/download?os=windows -UseBasicParsing | iex"',
        },
        {
          label: "Shell",
          command: "curl -fsSL https://ninja.sh/download?os=linux | sh",
        },
      ],
      formatLinks: getInstallCatalog().flatMap((entry) => entry.formatLinks),
    }
  }

  return {
    platform,
    label: selectedRecommendation.label,
    summary: selectedRecommendation.summary,
    packages: selectedRecommendation.packages,
    commands: selectedRecommendation.commands,
    formatLinks: selectedRecommendation.formatLinks,
  };
}