export function isActiveRoute(currentPath: string, targetPath: string) {
  const cleanCurrent = currentPath.replace(/\/$/, "");
  const cleanTarget = targetPath.replace(/\/$/, "");

  if (cleanTarget === "/admin") {
    return cleanCurrent === cleanTarget;
  }

  return (
    cleanCurrent === cleanTarget || cleanCurrent.startsWith(cleanTarget + "/")
  );
}
