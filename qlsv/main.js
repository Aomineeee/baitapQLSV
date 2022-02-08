const baseURL = "https://61ef5dbfd593d20017dbb47b.mockapi.io/sinhvien/";


const xoaSv = (id) => {
  axios({
    method: "DELETE",
    url: baseURL + id,
  })
    .then((res) => {
      console.log({ res });
      layDanhSachSinhVienService(res);
    })
    .catch((err) => {
      err;
    });
};

var sv = {
  name: "Si",
};
// var { name } = sv;

const showThongTinhSinhVien = ({ name, id, toan, ly, hoa, email }) => {
  document.getElementById("txtMaSV").value = id;
  document.getElementById("txtTenSV").value = name;
  document.getElementById("txtEmail").value = email;
  document.getElementById("txtDiemToan").value = toan;
  document.getElementById("txtDiemLy").value = ly;
  document.getElementById("txtDiemHoa").value = hoa;
};

const suaSv = (id) => {
  axios({
    method: "GET",
    url: baseURL + id,
  })
    .then((res) => {
      console.log({ res });
      showThongTinhSinhVien(res.data);
      // layDanhSachSinhVienService();
    })
    .catch((err) => {
      err;
    });
};

const capNhatSV = () => {
  var sv = {};
  sv.id = document.getElementById("txtMaSV").value;
  sv.name = document.getElementById("txtTenSV").value;
  sv.email = document.getElementById("txtEmail").value;
  sv.toan = document.getElementById("txtDiemToan").value;
  sv.ly = document.getElementById("txtDiemLy").value;
  sv.hoa = document.getElementById("txtDiemHoa").value;
  axios({
    url: baseURL + sv.id,
    method: "PUT",
    data: sv,
  }).then((res) => {
    console.log(res);
    layDanhSachSinhVienService();
    document.getElementById("formQLSV").reset();
  }).catch()
};
const renderTable = (array) => {
  let contentHTML = "";
  array.forEach((item) => {
    contentHTML += `<tr> <td>${item.id}</td> <td>${item.name}</td><td>${item.email
      }</td><td>${item.dtb()}
      <td>
          <button onclick="suaSv(${item.id
      })" class="btn btn-success">Sửa</button>
          <button onclick="xoaSv(${item.id
      })" class="btn btn-danger">Xoá</button>
    </td>`;
  });
  console.log(contentHTML);
  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
};

const themSV = () => {
  var sv = {};
  sv.id = document.getElementById("txtMaSV").value;
  sv.name = document.getElementById("txtTenSV").value;
  sv.email = document.getElementById("txtEmail").value;
  sv.toan = document.getElementById("txtDiemToan").value;
  sv.ly = document.getElementById("txtDiemLy").value;
  sv.hoa = document.getElementById("txtDiemHoa").value;

  var isValid = validator.isEmail(sv.email) & validator.isInt(sv.id) & validator.isAlpha(sv.name);
  console.log(isValid);
  isValid &&
    axios({
      url: baseURL,
      method: "POST",
      data: sv,
    }).then((res) => {
      console.log(res);
      layDanhSachSinhVienService();
      document.getElementById("formQLSV").reset();
    }).catch((err) => {
      console.log(err);
    })
}

const convertObjectSv = (arr) => {
  var newArraySv = arr.map((item) => {
    return {
      ...item,
      dtb: () => {
        return (item.toan * 1 + item.ly * 1 + item.hoa * 1) / 3;
      },
    };
  });
  console.log("newArraySv", newArraySv);
  return newArraySv;
};
let demoData = [];
const layDanhSachSinhVienService = () => {
  axios({
    url: baseURL,
    method: "GET",
  })
    .then((res) => {
      console.log(res.data);

      demoData = convertObjectSv(res.data);
      // axios({}).then().catch()
      renderTable(demoData);
    })
    .catch((err) => {
      console.log(err);
    });
};
layDanhSachSinhVienService();

axios({
  url: "",
  method: "",
  // data:""
})
  .then((res) => {
    res;
  })
  .catch((err) => {
    err;
  });
