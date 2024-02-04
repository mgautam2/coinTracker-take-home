export function shortenAddress(address) {
  let len = address.length;
  return address.substring(0, 3) + "..." + address.substring(len - 4);
}

export function satoshiToBTC(satoshis) {
  return satoshis / 1000000000;
}

export function getFormattedDateTime(ts) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDateTime = new Date(ts * 1000).toLocaleDateString(
    "en-US",
    options
  );

  return formattedDateTime;
}
