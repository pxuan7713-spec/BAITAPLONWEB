
document.addEventListener("DOMContentLoaded", () => {
 
  try {
    const ctx = document.getElementById("khoaChart").getContext("2d");

 
    const data = {
      labels: [
        "Tim mạch",
        "Chấn thương chỉnh hình",
        "Thần kinh",
        "Tiêu hóa",
        "Ung bướu",
      ],
      datasets: [
        {
          label: "Số lượng bệnh nhân",
          data: [12, 19, 3, 5, 2], 
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

   
    new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Biểu đồ bệnh nhân theo khoa",
            font: {
              size: 16,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Không thể vẽ biểu đồ:", error);
  }

  const searchButton = document.querySelector(".custom-button");
  const tableRows = document.querySelectorAll(".table-section table tbody tr");


  const tenInput = document.querySelector(
    '.search-input[placeholder="Nhập tên bệnh nhân..."]'
  );
  const tuoiInput = document.querySelector(
    '.search-input[placeholder="Nhập tuổi bệnh nhân"]'
  );
  const gioiTinhSelect = document.querySelectorAll(".search-select")[0];
  const khoaSelect = document.querySelectorAll(".search-select")[1];
  const tinhTrangSelect = document.querySelectorAll(".search-select")[2];
  const ngayNhapInput = document.getElementById("Ngay-nhap");
  searchButton.addEventListener("click", () => {
   
    const tenFilter = tenInput.value.toLowerCase();
    const tuoiFilter = tuoiInput.value;
    const gioiTinhFilter = gioiTinhSelect.value;
    const khoaFilter = khoaSelect.value.toLowerCase();
    const tinhTrangFilter = tinhTrangSelect.value;
    const ngayNhapFilter = ngayNhapInput.value;
    tableRows.forEach((row) => {
     
      const maBN = row.cells[0].textContent.toLowerCase();
      const ten = row.cells[1].textContent.toLowerCase();
      const tuoi = row.cells[2].textContent;
      const gioiTinh = row.cells[3].textContent;
      const khoa = row.cells[4].textContent.toLowerCase();
      const tinhTrang = row.cells[5].textContent;
      const ngayNhap = row.cells[6].textContent;

      const tenMatch = tenFilter === "" || ten.includes(tenFilter);
      const tuoiMatch = tuoiFilter === "" || tuoi === tuoiFilter;
      const gioiTinhMatch =
        gioiTinhFilter === "" || gioiTinh === gioiTinhFilter;
      const khoaMatch = khoaFilter === "" || khoa.includes(khoaFilter);
      const tinhTrangMatch =
        tinhTrangFilter === "" || tinhTrang === tinhTrangFilter;
      const ngayNhapMatch =
        ngayNhapFilter === "" || ngayNhap === ngayNhapFilter;
      if (
        tenMatch &&
        tuoiMatch &&
        gioiTinhMatch &&
        khoaMatch &&
        tinhTrangMatch &&
        ngayNhapMatch
      ) {
        row.style.display = ""; 
      } else {
        row.style.display = "none"; 
      }
    });
  });
});
