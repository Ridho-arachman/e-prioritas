export function isActiveRoute(currentPath: string, targetPath: string) {
  const cleanCurrent = currentPath.replace(/\/$/, "");
  const cleanTarget = targetPath.replace(/\/$/, "");

  if (
    cleanTarget === "/admin" ||
    cleanTarget === "/perangkat" ||
    cleanTarget === "/lurah"
  ) {
    return cleanCurrent === cleanTarget;
  }

  return (
    cleanCurrent === cleanTarget || cleanCurrent.startsWith(cleanTarget + "/")
  );
}
