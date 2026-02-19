// Neon card hover
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseover", () => card.style.transform="scale(1.1)");
  card.addEventListener("mouseout", () => card.style.transform="scale(1)");
});

// Contact form backend request
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let data = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  let res = await fetch("http://localhost:5000/send", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });

  let result = await res.text();
  document.getElementById("status").innerText = result;
});
