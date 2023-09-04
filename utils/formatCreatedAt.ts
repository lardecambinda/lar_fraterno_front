export default function formatCreatedAt(createdAt: string) {
  if (!createdAt) {
    return;
  }

  const [date, time] = createdAt.split("T");

  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(".")[0].split(":");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
