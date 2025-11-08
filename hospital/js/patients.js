document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const searchInput = document.getElementById("search");
  const sortBy = document.getElementById("sortBy");
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importFile");
  const clearAllBtn = document.getElementById("clearAll");
  const tableBody = document.querySelector(".table tbody");
  const emptyMessage = document.getElementById("empty");
  const modalRoot = document.getElementById("modalRoot");

  const loginLink = document.querySelector('a[data-page="login"] span');
  if (loginLink) {
    loginLink.textContent = "Đăng xuất";
    loginLink.parentElement.href = "#";
  }

  const getPatients = () => {
    const patients = localStorage.getItem("patients");
    if (patients) {
      return JSON.parse(patients);
    } else {
      const dummyData = [
        {
          id: "B1234",
          name: "Lê Văn Mạnh",
          age: 28,
          gender: "Nam",
          phone: "023623483",
          createdAt: "22/12/2025",
        },
        {
          id: "B1235",
          name: "Trần Thị An",
          age: 35,
          gender: "Nữ",
          phone: "0905123456",
          createdAt: "21/12/2025",
        },
        {
          id: "B1236",
          name: "Nguyễn Văn B",
          age: 42,
          gender: "Nam",
          phone: "0987654321",
          createdAt: "20/12/2025",
        },
      ];
      savePatients(dummyData);
      return dummyData;
    }
  };

  const savePatients = (patients) => {
    localStorage.setItem("patients", JSON.stringify(patients));
  };

  let allPatients = getPatients();

  const renderTable = (patients) => {
    tableBody.innerHTML = "";

    if (patients.length === 0) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
      patients.forEach((patient) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td>${patient.phone}</td>
          <td>${patient.createdAt}</td>
          <td class="actions">
            <button class="btn-action btn-edit" data-id="${patient.id}">Sửa</button>
            <button class="btn-action btn-delete" data-id="${patient.id}">Xóa</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }
  };

  const showModal = (patientToEdit = null) => {
    const isEditMode = !!patientToEdit;
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>${
            isEditMode ? "Sửa thông tin bệnh nhân" : "Thêm bệnh nhân mới"
          }</h2>
          <form id="patientForm">
            <input type="hidden" id="patientId" value="${
              isEditMode ? patientToEdit.id : ""
            }">
            
            <div class="form-group">
              <label for="name">Họ và tên:</label>
              <input type="text" id="name" required value="${
                isEditMode ? patientToEdit.name : ""
              }">
            </div>
            
            <div class="form-group-row">
              <div class="form-group">
                <label for="age">Tuổi:</label>
                <input type="number" id="age" required value="${
                  isEditMode ? patientToEdit.age : ""
                }">
              </div>
              <div class="form-group">
                <label for="gender">Giới tính:</label>
                <select id="gender" required>
                  <option value="Nam" ${
                    isEditMode && patientToEdit.gender === "Nam"
                      ? "selected"
                      : ""
                  }>Nam</option>
                  <option value="Nữ" ${
                    isEditMode && patientToEdit.gender === "Nữ"
                      ? "selected"
                      : ""
                  }>Nữ</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="phone">Số điện thoại:</label>
              <input type="tel" id="phone" required value="${
                isEditMode ? patientToEdit.phone : ""
              }">
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn-cancel">Hủy</button>
              <button type="submit" class="btn-save">${
                isEditMode ? "Lưu thay đổi" : "Thêm"
              }</button>
            </div>
          </form>
        </div>
      </div>
    `;

    modalRoot.innerHTML = modalHTML;
    modalRoot.style.display = "block";

    document
      .getElementById("patientForm")
      .addEventListener("submit", handleFormSubmit);
    document.querySelector(".btn-cancel").addEventListener("click", hideModal);
    document.querySelector(".modal-overlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) hideModal();
    });
  };

  const hideModal = () => {
    modalRoot.style.display = "none";
    modalRoot.innerHTML = "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const id = document.getElementById("patientId").value;
    const patientData = {
      id: id || `BN${Date.now()}`,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value,
      createdAt: id
        ? allPatients.find((p) => p.id === id).createdAt
        : new Date().toLocaleDateString("vi-VN"),
    };

    if (id) {
      allPatients = allPatients.map((p) => (p.id === id ? patientData : p));
    } else {
      allPatients.push(patientData);
    }

    savePatients(allPatients);
    renderTable(allPatients);
    hideModal();
  };

  const handleDelete = (id) => {
    if (confirm(`Bạn có chắc muốn xóa bệnh nhân (Mã: ${id}) không?`)) {
      allPatients = allPatients.filter((p) => p.id !== id);
      savePatients(allPatients);
      renderTable(allPatients);
    }
  };

  const handleEdit = (id) => {
    const patient = allPatients.find((p) => p.id === id);
    showModal(patient);
  };

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPatients = allPatients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.id.toLowerCase().includes(searchTerm) ||
        p.phone.includes(searchTerm)
    );
    renderTable(filteredPatients);
  });

  sortBy.addEventListener("change", (e) => {
    const sortValue = e.target.value;
    const currentPatientIds = Array.from(
      tableBody.querySelectorAll("td:first-child")
    ).map((td) => td.textContent);
    let currentList = allPatients.filter((p) =>
      currentPatientIds.includes(p.id)
    );

    switch (sortValue) {
      case "createdDesc":
        currentList.sort(
          (a, b) =>
            new Date(b.createdAt.split("/").reverse().join("-")) -
            new Date(a.createdAt.split("/").reverse().join("-"))
        );
        break;
      case "createdAsc":
        currentList.sort(
          (a, b) =>
            new Date(a.createdAt.split("/").reverse().join("-")) -
            new Date(b.createdAt.split("/").reverse().join("-"))
        );
        break;
      case "nameAsc":
        currentList.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      case "nameDesc":
        currentList.sort((a, b) => b.name.localeCompare(a.name, "vi"));
        break;
    }
    renderTable(currentList);
  });

  clearAllBtn.addEventListener("click", () => {
    if (
      confirm(
        "Bạn có chắc chắn muốn xóa TẤT CẢ bệnh nhân không? Hành động này không thể hoàn tác."
      )
    ) {
      allPatients = [];
      savePatients(allPatients);
      renderTable(allPatients);
    }
  });

  exportBtn.addEventListener("click", () => {
    if (allPatients.length === 0) {
      alert("Không có dữ liệu để xuất.");
      return;
    }
    const headers = "Mã,Tên,Tuổi,Giới tính,Điện thoại,Ngày tạo\n";
    const rows = allPatients
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.age}","${p.gender}","${p.phone}","${p.createdAt}"`
      )
      .join("\n");

    const csvContent = "\uFEFF" + headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "danh_sach_benh_nhan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  importBtn.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.click();

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(
          `Đã chọn tệp: ${file.name}. (Chức năng đọc và xử lý tệp CSV cần được cài đặt thêm thư viện hoặc code phức tạp hơn.)`
        );
      }
    };
  });

  tableBody.addEventListener("click", (e) => {
    const target = e.target;
    const id = target.dataset.id;

    if (id && target.classList.contains("btn-delete")) {
      handleDelete(id);
    }

    if (id && target.classList.contains("btn-edit")) {
      handleEdit(id);
    }
  });
  addBtn.addEventListener("click", () => {
    showModal();
  });

  renderTable(allPatients);
});
