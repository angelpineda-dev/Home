const d = document,
  $btnContact = d.getElementById("btnContact"),
  $formSection = d.getElementById("contact"),
  $form = d.querySelector(".contact-form"),
  $send = d.querySelector('input[type="submit"]'),
  $contactsInfo = d.querySelectorAll(".contact-info"),
  $labels = d.querySelectorAll(".contact-info label"),
  $inputs = d.querySelectorAll(".contact-form [required]"),
  $loader = d.querySelector(".contact-form-loader"),
  $response = d.querySelector(".contact-form-response");

/* Text of Labels to Spans */
$labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 60}ms">${letter}</span>`
    )
    .join("");
});

/* Scroll to Contact Form */
d.addEventListener("click", (e) => {
  if (!e.target.matches(`#btnContact`)) return;
  $formSection.scrollIntoView();
});

/* Form validation */
d.addEventListener("keyup", (e) => {
  if (e.target.matches(".contact-form [required]")) {
    let $required = e.target,
      pattern = $required.pattern || $required.dataset.pattern;

    //console.log($input,pattern);

    if (pattern && $required.value !== "") {
      //Si tiene patron...
      let regex = new RegExp(pattern);
      return !regex.exec($required.value)
        ? d.getElementById($required.name).classList.add("is-active")
        : d.getElementById($required.name).classList.remove("is-active");
    }

    if (!pattern) {
      //si NO tiene patron...
      return $required.value === ""
        ? d.getElementById($required.name).classList.add("is-active")
        : d.getElementById($required.name).classList.remove("is-active");
    }
  }
});

/* Loader and msg  */
d.addEventListener("submit", (e) => {
  e.preventDefault();
  //alert("Enviando Formulario");

  const $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $loader.classList.remove("none");
  $send.style.disabled = true;
  $send.style.border = "solid thick gray";

  fetch("https://formsubmit.co/ajax/angeljpa95@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
    mode: "no-cors",
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      $response.innerHTML = `<p>${json.message}</p>`;
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "An error has ocurried";
      $response.innerHTML = `< p >Error ${err.status}: ${message}.</p >`;
    })
    .finally(() =>
      setTimeout(() => {
        $loader.classList.add("none");
        $response.classList.remove("none");
        $form.reset();
        $send.style.disabled = false;
        $send.style.border = "solid thick var(--second-main-color)";

        setTimeout(() => $response.classList.add("none"), 2500);
      }, 2000)
    );

  setTimeout(() => {
    $loader.classList.add("none");
    $response.classList.remove("none");
    $form.reset();
    $send.style.disabled = false;
    $send.style.border = "solid thick var(--second-main-color)";

    setTimeout(() => $response.classList.add("none"), 2500);
  }, 2000);
});
