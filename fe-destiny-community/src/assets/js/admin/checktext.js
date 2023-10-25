var maxLength = 50; // Adjust this to your desired maximum length
var elements = document.querySelectorAll(".text-substring");

elements.forEach(function (element) {
  var originalText = element.textContent;

  if (originalText.length > maxLength) {
    element.textContent = originalText.substring(0, maxLength - 3) + "...";
  }
});
