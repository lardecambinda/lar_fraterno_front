export function formatParam(term: string) {
  const termArr = term.split(" ");
  const pathname = termArr.join("_");

  return pathname;
}

export function formatTerm(param: string) {
  const termArr = param.split("_");
  const term = termArr.join(" ");

  return term;
}
