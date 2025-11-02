document.addEventListener("DOMContentLoaded", () => {
  const appointmentForm = document.querySelector(".container form");
  const mainTableBody = document.querySelector(".table1 .table tbody");
  const pTongBenhNhan = document.querySelector(
    ".dashboard .card:nth-child(1) p"
  );
  const pCaKhamHomNay = document.querySelector(
    ".dashboard .card:nth-child(2) p"
  );
  const pDaKham = document.querySelector(".dashboard .card:nth-child(3) p");
  const pChoKham = document.querySelector(".dashboard .card:nth-child(4) p");

  function updateDashboard() {
    if (!mainTableBody) return;
    const allRows = mainTableBody.querySelectorAll("tr");
    let daKhamCount = 0;
    let choKhamCount = 0;
    allRows.forEach((row) => {
      const statusCell = row.querySelector("td:nth-child(6)");
      if (statusCell) {
        const status = statusCell.textContent.trim();
        if (status === "Đã Khám") {
          daKhamCount++;
        } else if (status == "Chờ Khám") {
          choKhamCount++;
        }
      }
    });
    const totalAppointments = allRows.length;
    if (pTongBenhNhan) pTongBenhNhan.textContent = totalAppointments;
    if (pCaKhamHomNay) pCaKhamHomNay.textContent = totalAppointments;
    if (pDaKham) pDaKham.textContent = daKhamCount;
    if (pChoKham) pChoKham.textContent = choKhamCount;
  }
  //-Ham xu ly khi gui form (submit)-----
  function handleFormSubmit(event) {
    event.preventDefault();
    if (!appointmentForm || !mainTableBody) return;
    const tenBN = document.getElementById("ten_bn").value;
    const ngayKhamInput = document.getElementById("ngay_kham").value;
    const gioKham = document.getElementById("gio_kham").value;
    const chuyenKhoaSelect = document.getElementById("chuyen_khoa");
    if (!tenBN || !ngayKhamInput || !gioKham || !chuyenKhoaSelect) {
      alert("vui long dien day du thong tin lich hen.");
      return;
    }

    const chuyenKhoaText =
      chuyenKhoaSelect.options[chuyenKhoaSelect.selectedIndex].text;

    let ngayKhamFormatted = ngayKhamInput;
    if (ngayKhamInput) {
      const parts = ngayKhamInput.split("-");
      ngayKhamFormatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const newRow = document.createElement("tr");
    const newSTT = mainTableBody.rows.length + 1;
    newRow.innerHTML = `
        <td>${newSTT}</td>
        <td>${tenBN}</td>
        <td>${ngayKhamFormatted}</td>
        <td>${gioKham}</td>
        <td>${chuyenKhoaText}</td> 
        <td>Chờ Khám</td>
    `;
    mainTableBody.appendChild(newRow);
    appointmentForm.reset();
    updateDashboard();
  }
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", handleFormSubmit);
  }
  updateDashboard();
});
