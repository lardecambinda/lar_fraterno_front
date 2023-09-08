export default function formatCreatedAt(createdAt: string) {
  if (!createdAt) {
    return;
  }

  const localeDate = new Date(createdAt).toLocaleString("pt-BR");

  const [date, time] = localeDate.split(", ");

  const [day, month, year] = date.split("/");
  const [hours, minutes, seconds] = time.split(":");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
