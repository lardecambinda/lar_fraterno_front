export default function checkTokenExpired(exp: number) {
  if (Date.now() >= exp * 1000) {
    return true;
  } else {
    return false;
  }
}
