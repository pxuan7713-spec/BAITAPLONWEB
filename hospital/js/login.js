document.addEventListener("DOMContentLoaded", function () {
  const settingsMenuLinks = document.querySelectorAll(".settings-menu a");
  const settingSections = document.querySelectorAll(".setting-section");
  const currentSettingTitle = document.getElementById("currentSettingTitle");

  settingsMenuLinks.forEach((link) => {
    if (link.getAttribute("href") === "index.html") {
      return;
    }

    link.addEventListener("click", function (e) {
      e.preventDefault();

      settingsMenuLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("href").substring(1) + "-section";

      settingSections.forEach((section) => section.classList.add("hidden"));

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      currentSettingTitle.textContent = this.textContent;

      window.history.replaceState(null, null, this.getAttribute("href"));
    });
  });

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      if (!username || !password) {
        showCustomAlert("Vui lòng nhập cả tên đăng nhập và mật khẩu!");
        return;
      }
      showCustomAlert("Đăng nhập thành công (demo)!");
    });
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      const username = document.getElementById("reg-username").value;
      const email = document.getElementById("reg-email").value;
      const newPassword = document.getElementById("reg-password").value;
      const confirmPassword = document.getElementById(
        "reg-confirm-password"
      ).value;

      if (!username || !email || !newPassword) {
        showCustomAlert("Vui lòng điền đầy đủ các trường bắt buộc!");
        return;
      }

      if (newPassword !== confirmPassword) {
        showCustomAlert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }

      showCustomAlert("Đăng ký tài khoản thành công (demo)!");
      document.querySelector('.settings-menu a[href="#login"]').click();
    });
  }

  const currentHash = window.location.hash;

  if (currentHash === "#register") {
    document.querySelector('.settings-menu a[href="#register"]').click();
  } else {
    document.querySelector('.settings-menu a[href="#login"]').click();
  }

  function showCustomAlert(message) {
    console.log("Thông báo: ", message);
    alert(message);
  }
});
