export function isEqualUrl(target: string, currentTarget: string): boolean {
  const targetSlices = target.split("/");

  const currentTargetSlices = currentTarget.split("/");

  if (targetSlices.length !== currentTargetSlices.length) return false;

  for (let i = 1; i < targetSlices.length; i++) {
    const targetSlice = targetSlices[i];

    const currentTargetSlice = currentTargetSlices[i];

    if (typeof currentTargetSlice !== "string") return false;

    if (!targetSlice.includes(":")) {
      if (targetSlice !== currentTargetSlice) return false;
    }
  }

  return true;
}
