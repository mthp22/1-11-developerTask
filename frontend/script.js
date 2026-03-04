const form = document.getElementById("testForm");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const statusBadge = document.getElementById("statusBadge");

const setStatus = (text, color = "#0f172a", bg = "#f8fafc", border = "#cbd5e1") => {
  statusBadge.textContent = text;
  statusBadge.style.color = color;
  statusBadge.style.background = bg;
  statusBadge.style.borderColor = border;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const url = document.getElementById("url").value.trim();

  const validationUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Validating...";
    setStatus("Running", "#92400e", "#fef3c7", "#f59e0b");

    const response = await fetch(validationUrl);
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
    if (data?.expectedResponse && !data?.yourResponse?.word) {
      setStatus("Needs Fix", "#991b1b", "#fee2e2", "#f87171");
      return;
    }
    setStatus("Pass/Check", "#166534", "#dcfce7", "#86efac");
  } catch (error) {
    result.textContent = JSON.stringify({ error: "Error validating endpoint." }, null, 2);
    setStatus("Error", "#991b1b", "#fee2e2", "#f87171");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Validate Endpoint";
  }
});
