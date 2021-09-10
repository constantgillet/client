/**
 * @param text Text which will be copied to clipboard.
 */
export default function copyToClipboard(text) {
  const tempInput = document.createElement("input");

  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}
