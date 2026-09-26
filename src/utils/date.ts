export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = {}) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function ageFromBirthday(iso: string) {
  const birth = new Date(iso);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years <= 0) return `${months} month${months === 1 ? "" : "s"}`;
  return `${years} year${years === 1 ? "" : "s"}, ${months} month${months === 1 ? "" : "s"}`;
}
